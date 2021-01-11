const inquirer = require('inquirer');


function managerQuestions () {

    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the Mananger's full name."
        },
        {
            type: "input",
            name: "email",
            message: "Enter the Mananger's email."
        },
        {
            type: "input",
            name: "office",
            message: "Enter the Mananger's office number.",
        },
        {
            type: "input",
            name: "name",
            message: "Enter the Mananger's full name.",
        },
        {
        type: "list",
        name: "hasTeam",
        message: "Do you have any employees to add?",
        choices: ["Yes", "No"]
        }
    ]).then(function (userInput) {
        const affirmEmployees = userInput.hasTeam;
        console.log(typeof affirmEmployees);
    
        if(affirmEmployees === "Yes"){
            promptEmployeeQuestions()
        }
        else{
            //only add the manager.
        }
    })
}

function promptEmployeeQuestions () {
    inquirer.prompt([
        {
            type: "input",
            name: "employeeName",
            message: "Enter employee's full name."
        },
        {
            type: "input",
            name: "employeeEmail",
            message: "Enter their email."
        },
        {
            type: "list",
            name: "role",
            message: "What is their role?",
            choices: ["engineer", "intern"]
        },
        {
            when: input => {
                return input.role == "engineer"
            },
            type: "input",
            name: "github",
            message: "Engineer, enter your github username:",
            validate: async (input) => {
                if (input == "" || /\s/.test(input)) {
                    return "Please enter a valid GitHub username";
                }
                return true;
            }
        },
        {
            when: input => {
                return input.role == "intern"
            },
            type: "input",
            name: "school",
            message: "Intern, enter your school name:",
            validate: async (input) => {
                if (input == "") {
                    return "Please enter a name.";
                }
                return true;
            }
        },
        {
            type: "list",
            name: "addAnother",
            message: "Do you want to add another team member?",
            choices: ["Yes", "No"]
        }
    ])
}

managerQuestions();
