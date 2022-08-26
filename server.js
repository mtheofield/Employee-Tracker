const mysql = require('mysql2');
require("console.table");
const inquirer = require('inquirer');
const db = require('./db/index');

connection.connect(function (err) {
    if (err) throw err;
    firstPrompt();
  });
  
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3000,
    password: "password",
    database: "company_db",
  });

  connection.connect(err => {
    if (err) throw err;
    console.log("Welcome to the employee table");
    startMenu();
  });
  
  const startMenu = () => {
    inquirer.prompt({
        message: 'What would you like to do today?',
        name: 'menu',
        type: 'list',
        choices: [ 
          'View all departments',
          'View all jobs',
          'View all employees',
          'Add a department',
          'Add a job',
          'Add an employee',
          'Update employee job',
          'Exit',
        ],
      })
      .then(response => {
          switch (response.menu) {
          case 'View all departments':
            viewDepartment();
            break;
          case 'View all roles':
            viewRoles();
            break;
          case 'View all employees':
            viewEmployees();
            break;
          case 'Add a department':
            addDepartment();
            break;
          case 'Add a role':
            addJob();
            break;
          case 'Add an employee':
            addEmployee();
            break;
          case 'Update employee role':
            updateEmployee();
            break;
          case "Exit":
            connection.end();
            break;
          default:
            connection.end();
        }
      });
  };
  const viewDepartment = () => {
    connection.query('SELECT * FROM departments', function (err, res) {
      if (err) throw err;
      console.table(res);
      startMenu();
    });
  };