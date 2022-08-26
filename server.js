// const mysql = require('mysql2');
// const inquirer = require('inquirer');
const db = require('./db/index');
const consoleTable = require('console.table');
const { listenerCount } = require('./db/connection');
// 
async function viewDepartments(){
    let departments = await db.viewAllDepartments()
    console.table(departments)
}

addEmployees(){
    let managerChoices = await db.getManagers()
    inquierer.prompt([
            listenerCount
            what manager would you like
            choices: managerChoices
    ])
}

viewDepartments()