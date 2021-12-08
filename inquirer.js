// inquirer question constants
// need to query the database to get options for department and managers
const inquirer = require('inquirer')
const { db } = require('./queries')

const initialPrompt = [
    {
        name: "initialPrompt",
        type: "list",
        message: "What would you like to view first?",
        choices: ["View All Departments", "View All Roles", "View all Employees", "Add a Department", "Add a Role", "Add an Employee", "Update a Role", "Exit Program"],
    }
]


const addDepartment = [
    {
        name: "departmentName",
        type: "input",
        message: "What is the department name?",
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Please enter a team name");
            }
            return true;
        },
    },
]

const addRole = [
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
    }
]

const addEmployee = [

]

const exitInquirer = [
    {
        type: 'confirm',
        name: 'exit',
        message: 'Would you like to exit?'
    },
]

module.exports = {
    initialPrompt,
    addDepartment,
    addRole,
    addEmployee,
    exitInquirer
}