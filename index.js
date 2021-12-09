// main file which will run the application in node. 
// linking to dotenv 

const dotenv = require('dotenv')
dotenv.config();

const inquirer = require('inquirer')
const { initialPrompt, addDepartment, addRole, addEmployee, exitInquirer } = require('./inquirer')
const { db, allDepartmentsQuery, allRolesQuery, allEmployeesQuery, deptNameQuery, insertDepartment, insertRole } = require('./queries')
const tools = require("terminaltools")
var banner = tools.banner("Hello")

const pluck = (arr, key) => arr.map(i => i[key])

console.log(banner)

// Main Init
function init() {
  inquirer.prompt(initialPrompt)
    .then((answers) => {
      switch (answers.initialPrompt) {
        case "View All Departments":
          console.log("in switch 1")
          viewAllDepartments(answers)
          break;
        case "View All Roles":
          viewAllRoles(answers)
          console.log("In switch 2")
          break;
        case "View all Employees":
          viewAllEmployees(answers)
          console.log("In switch 3")
          break
        case "Add a Department":
          console.log("In switch 4")
          addNewDepartment(answers)
          break
        case "Add a Role":
          console.log("In switch 5")
          addNewRole(answers)
          break
        case "Add an Employee":
          addNewEmployee(answers)
          console.log("In switch 6")
          break
        case "Exit Program":
          console.log("In switch 7")
          exitInquirerFunction(answers)
          break
        default:
          break
      }

    })
}

// View all Departments
function viewAllDepartments(data) {
  db.query(allDepartmentsQuery, function (err, results) {
    console.log(results);
    exitInquirerFunction()
  });

}

// View all Roles
function viewAllRoles(data) {
  db.query(allRolesQuery, function (err, results) {
    console.log(results);
    exitInquirerFunction()
  });
}

// View all Employees
function viewAllEmployees(data) {
  db.query(allEmployeesQuery, function (err, results) {
    console.log(results);
    exitInquirerFunction()
  });
}

// Add a new department
function addNewDepartment(data) {
  inquirer.prompt(addDepartment)
    .then((answers) => {
      console.log(answers.departmentName)
      db.query(insertDepartment, `${answers.departmentName}`, function (err, results) {
        console.log("New Department Added")
        viewAllDepartments()
      })
    })
}

// Add a new role
function addNewRole() {
  db.query(allDepartmentsQuery, function (err, results) {
    console.log(results)
    var cleanArray = []
    for (let i = 0; i < results.length; i++) {
      var obj = {
        name: results[i].name,
        value: results[i].id
      }
      cleanArray.push(obj)
    }

    console.log(cleanArray)

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
          choices: cleanArray
        }
      ]
    )
      .then((answers) => {
        console.log(answers.roleName, answers.roleSalary, answers.roleDepartment)
        db.query(insertRole, [answers.roleName, answers.roleSalary, answers.roleDepartment], function (err, results) {
          console.log("Your new role has been added!")
        init()
        })
      })
  })
}


async function addNewEmployee(data) {
  const dbRoles = (results) => db.query(deptNameQuery, (err, results) => {
    return
  })

  const dbEmployees = db.query(deptNameQuery, (err, results) => {
    return results
  })

  console.log(dbEmployees.name)

  // inquirer.prompt(addEmployee)
  //   .then((answers) => {
  //     console.log(answers)
  //     exitInquirerFunction()
  //   })

}

// exit program
function exitInquirerFunction(data) {
  inquirer.prompt(exitInquirer)
    .then((answers) => {
      if (answers == true) {
        process.exit()
      } else {
        init()
      }
    })
}


init()
