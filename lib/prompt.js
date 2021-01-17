const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const writeFiles = util.promisify(fs.writeFile);
const { resolve } = require("path");

const Manager = require('../lib/Manager');
const Engineer = require('../lib/Engineer');
const Intern = require('../lib/Intern');
const Employee = require('../lib/Employee');

const storeToArray = [];
let teamHTML = '';
let img;

async function enterPrompt() {

    await addManager();
    await optionTeam();

};

async function addManager() {

    const qManager = await inquirer.prompt([
        {
            type: 'input',
            name: 'managerName',
            message: 'Enter the name of the Manager: ',
            validate: input => {
                const test = input.match(/^[a-zA-Z][a-zA-Z\s]*$/);
                if (test) return true;
                else new Error('Plese enter letters only!');
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the ID number: ',
            validate: input => {
                const test = input.match(/^[0-9a-zA-Z]+$/); //some ID# contains combination of letters and numbers. ie. LM619765
                if (test) return true;
                else new Error('Please enter letters and numbers only!');
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the email of the Manager: ',
            validate: input => {
                const test = input.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
                if (test) return true;
                else new Error('Please enter a valid email address!');
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Enter the office number: ',
            validate: input => {
                const test = input.match(/^[0-9]+$/);
                if (test) return true;
                else new Error('Please enter letters and numbers only!');
            }
        },
    ]);

    const managerArray = new Manager(qManager.managerName, qManager.id, qManager.email, qManager.officeNumber);
    storeToArray.push(managerArray);
};

async function addEngineer() {

    const qEngineer = await inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Enter the name of the Engineer: ',
        validate: input => {
            const test = input.match(/^[a-zA-Z][a-zA-Z\s]*$/);
            if (test) return true;
            else new Error('Plese enter letters only!');
        }
    },
    {
        type: 'input',
        name: 'id',
        message: 'Enter the ID number: ',
        validate: input => {
            const test = input.match(/^[0-9a-zA-Z]+$/); //some ID# contains combination of letters and numbers. ie. LM619765
            if (test) return true;
            else new Error('Please enter letters and numbers only!');
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter the email: ',
        validate: input => {
            const test = input.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
            if (test) return true;
            else new Error('Please enter a valid email address!');
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter the Github user name: ',
        validate: input => {
            const test = input.match(/^[0-9a-zA-Z]+$/); //github users name only contains letters and numbers.
            if (test) return true;
            else new Error('Please enter letters and numbers only!');
        }
    }]);
    const engineerArray = new Engineer(qEngineer.name, qEngineer.id, qEngineer.email, qEngineer.github);
    storeToArray.push(engineerArray);
    optionTeam();

};

async function addIntern() {

    const qIntern = await inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Enter the name of the Intern: ',
        validate: input => {
            const test = input.match(/^[a-zA-Z][a-zA-Z\s]*$/);
            if (test) return true;
            else new Error('Plese enter letters only!');
        }
    },
    {
        type: 'input',
        name: 'id',
        message: 'Enter the ID number: ',
        validate: input => {
            const test = input.match(/^[0-9a-zA-Z]+$/); //some ID# contains combination of letters and numbers. ie. LM619765
            if (test) return true;
            else new Error('Please enter letters and numbers only!');
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter the email: ',
        validate: input => {
            const test = input.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
            if (test) return true;
            else new Error('Please enter a valid email address!');
        }
    },
    {
        type: 'input',
        name: 'school',
        message: 'Enter the school: ',
        validate: input => {
            const test = input.match(/^[a-zA-Z][a-zA-Z\s]*$/);
            if (test) return true;
            else new Error('Plese enter letters only!');
        }
    }]);
    const internArray = new Intern(qIntern.name, qIntern.id, qIntern.email, qIntern.school);
    storeToArray.push(internArray);
    optionTeam();
};

async function optionTeam() {
    const qTeam = await inquirer.prompt([
        {
            type: 'list',
            name: 'optionEmp',
            message: 'Add a team members',
            choices: ['Engineer', 'Intern', 'Quit']
        },
    ]);
    switch (qTeam.optionEmp) {
        case 'Engineer': await addEngineer();
            break;
        case 'Intern': await addIntern();
            break;
        default:
            console.log('Terminating user prompt....');
            console.log('Generating HTML....');
            console.log(storeToArray);
            await generateHTML(storeToArray);
            break;
    }

}

async function generateHTML(storeToArray) {
    const createHTML =
        `<!DOCTYpE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <!-- Bootstrap -->
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
            <!-- Added link to the jQuery Library -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
            <link rel="stylesheet" href="https://fontawesome.com/v4.7.0/path/to/font-awesome/css/font-awesome.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        
            <title>Tempate Engine Generator</title>
            <style>
                body {
                    background-color: black;
        
                }
        
                #top-card {
                    padding-top: 70px;
                }
        
                #photo {
                    align-items: center;
                    width: 150px;
                    height: auto;
                    position: relative;
                    top: 50%;
                    left: 25%;
                }
        
                .card {
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                    /*max-width: 300px;*/
                    width: auto;
                    margin: auto;
                    text-align: center;
                    font-family: arial;
                    border: solid 5px grey;
                    border-radius: 15px;
        
                }
        
                #middle {
                    margin-top: 20px;
                    margin-bottom: 20px;
                }
        
                .title {
                    color: grey;
                    font-size: 18px;
                }
        
                button {
                    border: none;
                    outline: 0;
                    display: inline-block;
                    padding: 8px;
                    color: white;
                    background-color: #000;
                    text-align: center;
                    cursor: pointer;
                    width: 100%;
                    font-size: 18px;
                }
        
                a {
                    text-decoration: none;
                    font-size: 22px;
                    color: black;
                }
        
                button:hover,
                a:hover {
                    opacity: 0.7;
                }
            </style>
        
        </head>
        
        <body>
            <!--Nav bar on top as a header -->
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <a class="navbar-brand" href="main.html">
                        <img src="https://image.flaticon.com/icons/png/512/1791/1791208.png" alt="" height="40px" width="40px"
                            id="auth-image" />
                        Template Engine Generator
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="main.html">Home <span class="sr-only">(current)</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <!--Start of the Body-->
            
            <div class="container text-center" id="top-card">
                <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                            ${await managerDiv(storeToArray)}
                    </div>
                    <div class="col-md-4"></div>
                </div>
            </div>
            <div class="container text-center">
                <div class="row" id="middle-card">
                            ${await teamToHTML(storeToArray)}
                </div>
            </div>
            <!-- jQuery CDN -->
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
        
            <!-- Bootstrap JavaScript CDN -->
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>    
        
        </body>
        
        </html>`;

    writeFiles("output/main.html", createHTML, function (err) {
        if (err) {
            return console.error(err);
        }
    });
}

async function managerDiv(storeToArray) {

    let name = storeToArray[0].name;
    let id = storeToArray[0].id;
    let email = storeToArray[0].email;
    let officeNumber = storeToArray[0].officeNumber;

    let createManagerDiv =
        `<div class="card">
            <h1>${name}</h1>
            <p>ID: ${id}</p>
            <p class="title">${email}</p>
            <p>Room <i class="fa fa-briefcase" aria-hidden="true"></i>: ${officeNumber}</p>
            <div style="margin: 24px 0;">
                <a href="#"><i class="fa fa-dribbble"></i></a>
                <a href="#"><i class="fa fa-twitter"></i></a>
                <a href="#"><i class="fa fa-linkedin"></i></a>
                <a href="#"><i class="fa fa-facebook"></i></a>
            </div>
            <p><button>MANAGER</button></p>
        </div> `;

    return createManagerDiv;
}


async function engineerDiv(storeToArray) {
    let createEngineer =
        `<div class="col-md-4">
            <div class="card" id="middle">
                <h1>${storeToArray.name}</h1>
                <p>ID: ${storeToArray.id}</p>
                <p class="title">${storeToArray.email}</p>
                <p>Github <i class="fa fa-github"></i> : ${storeToArray.gitUsername}</p>
                <div style="margin: 24px 0;">
                    <a href="#"><i class="fa fa-dribbble"></i></a>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                    <a href="#"><i class="fa fa-linkedin"></i></a>
                    <a href="#"><i class="fa fa-facebook"></i></a>
                </div>
                <p><button>ENGINEER</button></p>
            </div>
        </div>`;

    teamHTML = teamHTML + createEngineer;

}

function internDiv(storeToArray) {
    const createIntern =
        `<div class="col-md-4">
            <div class="card" id="middle">
                <h1>${storeToArray.name}</h1>
                <p>ID: ${storeToArray.id}</p>
                <p class="title">${storeToArray.getEmail()}</p>
                <p>School <i class="fa fa-graduation-cap"></i> : ${storeToArray.school}</p>
                <div style="margin: 24px 0;">
                    <a href="#"><i class="fa fa-dribbble"></i></a>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                    <a href="#"><i class="fa fa-linkedin"></i></a>
                    <a href="#"><i class="fa fa-facebook"></i></a>
                </div>
                <p><button>INTERN</button></p>
            </div>
        </div>`;

    teamHTML = teamHTML + createIntern;
}

async function teamToHTML(storeToArray) {
    for (let i = 1; i < storeToArray.length; i++) {
        if (storeToArray[i] instanceof Engineer) {
            await engineerDiv(storeToArray[i]);
        } else {
            await internDiv(storeToArray[i]);
        }
    }
    return teamHTML;
}



module.exports = 
    enterPrompt