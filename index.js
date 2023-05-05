const Manager = require("./lib/Manager")

const team = []
// inquirer stuff blah blah
.then((res) => {
    let manager = new Manager(res.name, res.id, res.email, res.officeNumber)    
    team.push(manager)
})