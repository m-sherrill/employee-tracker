// main file which will run the application in node. 

// linking to dotenv 
const dotenv = require('dotenv')
dotenv.config();

// linking to other files and modules
const inquirer = require('inquirer')
const db = require('./db/db')
const { addDepartment, exitInquirer } = require('./inquirer')
const { allDepartmentsQuery, allRolesQuery, allEmployeesQuery, insertDepartment, insertRole, insertEmployee } = require('./queries')
const consoleTable = require('console.table')
const showBanner = require('node-banner')


async function init() {
  await showBanner('Employee Tracker', '', 'blue')
  startPrompts()
  }

// Main Init
function startPrompts(){
  inquirer.prompt(
    [
      {
          name: "initialPrompt",
          type: "list",
          message: "What would you like to view first?",
          choices: ["View All Departments", "View All Roles", "View all Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", `Exit Program
      `],
      }
  ]
  )
    .then((answers) => {
      switch (answers.initialPrompt) {
        case "View All Departments":
          viewAllDepartments()
          break;
        case "View All Roles":
          viewAllRoles()
          break;
        case "View all Employees":
          viewAllEmployees()
          break
        case "Add a Department":
          addNewDepartment()
          break
        case "Add a Role":
          addNewRole()
          break
        case "Add an Employee":
          addNewEmployee()
          break
        case "Update an Employee Role":
          updateEmployee()
          break
        default:
          exitInquirerFunction()
          break
      }
    })
}

// View all Departments
function viewAllDepartments() {
  db.query(allDepartmentsQuery, function (err, results) {
    console.table(results);
    startPrompts()
})
}

// View all Roles
function viewAllRoles() {
  db.query(allRolesQuery, function (err, results) {
    console.table(results);
    startPrompts()
})
}

// View all Employees -- need to figure out how to make the manager's name appear
function viewAllEmployees() {
  db.query(allEmployeesQuery, function (err, results) {
    console.log(results)
    console.table(results);
    startPrompts()
})
}

// Add a new department
function addNewDepartment() {
  inquirer.prompt(addDepartment)
    .then((answers) => {
      db.query(insertDepartment, `${answers.departmentName}`, function (err, results) {
        console.log("New Department Added")
        startPrompts()
      })
    })
}

// Add a new role
function addNewRole() {
  db.query(allDepartmentsQuery, function (err, results) {
    var deptArray = []
    for (let i = 0; i < results.length; i++) {
      var obj = {
        name: results[i].name,
        value: results[i].id
      }
      deptArray.push(obj)
    }
    inquirer.prompt(
      [
        {
          name: "roleName",
          type: "input",
          message: "What is the name of this role?",
          validate: function (answer) {
            if (answer.length < 1) {
              return console.log("Please enter a team name");
            }
            return true;
          },
        },
        {
          name: "roleSalary",
          type: "input",
          message: "What is the salary for this role?",
          validate: function (answer) {
            if (answer.length < 1) {
              return console.log("Please enter a team name");
            }
            return true;
          },
        },
        {
          name: "roleDepartment",
          type: "list",
          message: "What department should this be assigned to?",
          choices: deptArray
        }
      ]
    )
      .then((answers) => {
        db.query(insertRole, [answers.roleName, answers.roleSalary, answers.roleDepartment], function (err, results) {
          console.log("Your new role has been added!")
          startPrompts()
        })
      })
  })
}

// Add a new employee
function addNewEmployee() {
  db.query(allRolesQuery, function (err, results) {
    var roleArray = []
    for (let i = 0; i < results.length; i++) {
      var obj = {
        name: results[i].title,
        value: results[i].id
      }
      roleArray.push(obj)
    }
    db.query(allEmployeesQuery, function (err, results) {
      var managersArray = []
      for (let i = 0; i < results.length; i++) {
        var obj2 = {
          name: results[i].first_name + " " + results[i].last_name,
          value: results[i].id
        }
        managersArray.push(obj2)
      }
      managersArray.push({ name: "No Manager", value: null })
      inquirer.prompt(
        [
          {
            name: "employeeFirstName",
            type: "input",
            message: "What is the employee's first name?",
            validate: function (answer) {
              if (answer.length < 1) {
                return console.log("Please enter a first name");
              }
              return true;
            },
          },
          {
            name: "employeeLastName",
            type: "input",
            message: "What is the employee's last name?",
            validate: function (answer) {
              if (answer.length < 1) {
                return console.log("Please a last name");
              }
              return true;
            },
          },
          {
            name: "employeeRole",
            type: "list",
            message: "What role is this employee in?",
            choices: roleArray
          },
          {
            name: "employeeManager",
            type: "list",
            message: "Who is this employee's manager?",
            choices: managersArray
          }
        ]
      )
        .then((answers) => {
          db.query(insertEmployee, [answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, answers.employeeManager], function (err, results) {
            console.log("Your new Employee has been added!")
            startPrompts()
          })
        })
    })
  })
}

function updateEmployee() {

}

// exit program
function exitInquirerFunction() {
  inquirer.prompt(exitInquirer)
    .then((answers) => {
      if (answers.exit === true) {
        console.log("Thank you for using the Employee Tracker. Have a nice day!")
        process.exit()
      } else {
        init()
      }
    })
}

// Starting the program
init()
