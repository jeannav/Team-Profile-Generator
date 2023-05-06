const fs = require('fs');
const inquirer = require('inquirer');
const generateHTML = require('./src/templates');


const Manager = require("./lib/Manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

const team = [];
const addManager = () => {
    return inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Manager name?'
    },
    {
        type: 'input',
        name: 'id',
        message: "What is this manager's ID number?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What is this manager's email address?"
    },
    {
        type: 'input',
        name: 'officeNum',
        message: "What is this manager's office number"
    }
    ])
        .then(managerInput => {
            const { name, id, email, officeNum } = managerInput;
            const manager = new Manager(name, id, email, officeNum);
            team.push(manager);
            console.log(manager);
        })
};
const addEmployee = () => {
    return inquirer.prompt([{
        type: 'list',
        name: 'role',
        message: "What is this employee's role?",
        choices: ['Engineer', 'Intern']
    },
    {
        type: 'input',
        name: 'name',
        message: "Employee name?"
    },
    {
        type: 'input',
        name: 'id',
        message: "What is this employee's ID number?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What is this employee's email address?"
    },
    {
        type: 'input',
        name: 'github',
        message: "What is this employee's github username?",
        when: (input) => input.role === "Engineer"
    },
    {
        type: 'input',
        name: 'school',
        message: "What school does this intern attend?",
        when: (input) => input.role === "Intern"
    },
    {
        type: 'confirm',
        name: 'confirmAddEmployee',
        message: "Are there any other employee's you would like to add?",
        default: false
    }
    ])
        .then(employeeData => {
            let { name, id, email, role, github, school, confirmAddEmployee } = employeeData;
            let employee;
            if (role === "Engineer") {
                employee = new Engineer(name, id, email, github);
                console.log(employee);

            } else if (role === "Intern") {
                employee = new Intern(name, id, email, school);
                console.log(employee);
            }
            team.push(employee);
            if (confirmAddEmployee) {
                return addEmployee(team);
            } else {
                return team;
            }
        })
}
const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
            err ? console.log(err) : console.log("HTML with team data successfully created.")
    })
}
addManager()
    .then(addEmployee).then(team => {
        return generateHTML(team);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .catch(err => {
        console.log(err);
    });