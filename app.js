const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

let mainArr = [];

const confirmManager = [
  {
    type: "confirm",
    name: "Manager",
    message: "Are you a manager?",
  },
];
const managersBio = [
  {
    type: "input",
    name: "managers_name",
    message: "What is your name?",
  },
  {
    type: "input",
    name: "managers_id",
    message: "What is your id?",
  },
  {
    type: "input",
    name: "managers_email",
    message: "What is your email?",
  },
  {
    type: "input",
    name: "managers_officeNumber",
    message: "What is your office phone number?",
  },
];
const myManagersBio = [
  {
    type: "input",
    name: "my_managers_name",
    message: "What is your manager's name?",
  },
  {
    type: "input",
    name: "my_managers_department",
    message: "What is your manager's department?",
  },
  {
    type: "input",
    name: "my_managers_id",
    message: "What is your manager's id?",
  },
  {
    type: "input",
    name: "my_managers_email",
    message: "What is your manager's email?",
  },
  {
    type: "input",
    name: "my_managers_officeNumber",
    message: "What is your manager's office phone number?",
  },
];
const engineerQuestions = [
  {
    type: "input",
    name: "engineers_name",
    message: "What is your engineer's name?",
  },
  {
    type: "input",
    name: "engineers_id",
    message: "What is your engineer's id?",
  },
  {
    type: "input",
    name: "engineers_email",
    message: "What is your engineer's email?",
  },
  {
    type: "input",
    name: "engineers_gitHub",
    message: "What is your engineer's GitHub username?",
  },
];
const internQuestions = [
  {
    type: "input",
    name: "interns_name",
    message: "What is your intern's name?",
  },
  {
    type: "input",
    name: "interns_id",
    message: "What is your intern's id?",
  },
  {
    type: "input",
    name: "interns_email",
    message: "What is your intern's email?",
  },
  {
    type: "input",
    name: "interns_school",
    message: "What is your intern's school?",
  },
];
const list = [
  {
    type: "list",
    name: "teamMember_type",
    choices: [
      "Engineer",
      "Intern",
      "I don't want to add any more team members",
    ],
    message: "Select the role to add in your team?",
  },
];

inquirer.prompt(confirmManager).then((ans) => {
  if (ans.Manager === true) {
    promptManager();
  } else {
    promptMyManager();
  }
});

const promptNext = () => {
  inquirer.prompt(list).then((data) => {
    switch (data.teamMember_type) {
      case "Engineer":
        promptEngineer();
        break;
      case "Intern":
        promptIntern();
        break;
      default:
        createHtml();
    }
  });
};

//prompt manager, get answers.
//push object of answers to array.
const promptManager = () => {
  inquirer.prompt(managersBio).then((ans) => {
    console.log(ans);
    mainArr.push(
      new Manager(
        ans.managers_name,
        ans.managers_id,
        ans.managers_email,
        ans.managers_officeNumber
      )
    );
    console.log(mainArr);
    promptNext();
  });
};

const promptMyManager = () => {
  inquirer.prompt(myManagersBio).then((ans) => {
    console.log(ans);
    mainArr.push(
      new Manager(
        ans.managers_name,
        ans.managers_id,
        ans.managers_email,
        ans.managers_officeNumber
      )
    );
    console.log(mainArr);
    promptNext();
  });
};

// If you are an Engineer
const promptEngineer = () => {
    inquirer.prompt(engineerQuestions).then(ans => {
        console.log(ans);
        mainArr.push(new Engineer(ans.engineers_name, ans.engineers_id, ans.engineers_email, ans.engineers_gitHub));
        promptNext();
    });
};

// If you are an Intern
const promptIntern = () => {
    inquirer.prompt(internQuestions).then(ans => {
        console.log(ans);
        mainArr.push(new Intern(ans.interns_name, ans.interns_id, ans.interns_email, ans.interns_school));
        promptNext();
    });
};

const createHtml = () => {
    console.log('this is new html');
    console.log(render(mainArr));
    render(mainArr);
    fs.writeFile('index.html', render(mainArr), function(err){
        if(err) throw err;
    })
};
