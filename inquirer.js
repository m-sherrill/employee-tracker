// inquirer question constants


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