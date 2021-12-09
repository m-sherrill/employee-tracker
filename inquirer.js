// inquirer question constants

const initialPrompt = [
    {
        name: "initialPrompt",
        type: "list",
        message: "What would you like to view first?",
        choices: ["View All Departments", "View All Roles", "View all Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", `Exit Program
    `],
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
    exitInquirer
}