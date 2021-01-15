const Employee = require('./Employee.js')

class Engineer extends Employee {
    constructor(name, id, email, gitUsername) {
        super(name, id, email);
        this.gitUsername = gitUsername;
    }

    getGitHub() {
        return this.gitUsername;
    }

    getRole() {
        return 'Engineer';
    }
}

module.exports = Engineer;