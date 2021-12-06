// main file which will run the application in node. 
// linking to dotenv 

const dotenv = require('dotenv')
dotenv.config();

const inquirer = require('inquirer')
const { initialPrompt, addDepartment, addRole, addEmployee, exitInquirer } = require('./inquirer')
const { db, allDepartmentsQuery, allRolesQuery, allEmployeesQuery } = require('./queries')
const tools = require("terminaltools")
var banner = tools.banner("Hello")

console.log(banner)

function startPrompts() {
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

function exitInquirerFunction (data) {
  inquirer.prompt(exitInquirer)
  .then((answers) => {
    if (true) {
      process.exit()
    } else {
      startPrompts(answers)
    }
  })
}

function viewAllDepartments(data) {
  db.query(allDepartmentsQuery, function (err, results) {
    console.log(results);
    exitInquirerFunction()
  });

}

function viewAllRoles(data) {
  db.query(allRolesQuery, function (err, results) {
    console.log(results);
    exitInquirerFunction()
  });
}

function viewAllEmployees(data) {
  db.query(allEmployeesQuery, function (err, results) {
    console.log(results);
    exitInquirerFunction()
  });
}

function addNewDepartment(data) {
  console.log("In addnewdepartment function!!!!!")
  inquirer.prompt(addDepartment)
    .then((answers) => {
      console.log(answers)
    })
    exitInquirerFunction()
}

function addNewRole(data) {
  console.log("In addNewRole FUNCTION!!!!!!!")
  inquirer.prompt(addRole)
    .then((answers) => {
      console.log(answers)
      exitInquirerFunction()
    })

}

function addNewEmployee(data) {
  console.log("In addNewEmployee function!!!!!!")
  inquirer.prompt(addEmployee)
    .then((answers) => {
      console.log(answers)
      exitInquirerFunction()
    })

}



startPrompts()
