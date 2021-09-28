const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'rootroot',
      database: 'employees'
    },
    console.log(`Connected to the employees database.`)
  );
  

  inquirer
  .prompt([
    {
        type: "list",
        name: "initialPrompt",
        message: "What would you like to do?",
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"],
    },
])
.then((data) => {
 console.log(data);
    switch(data){
        case "View All Employees":
            db.query('SELECT * FROM employee', function (err, results) {
                console.table(results);
            });
            break;
        case "Add Employee":
            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)')
            break;
        case "Update Employee Role":
            db.query('SELECT first_name, last_name, role_id, FROM employee, UPDATE employee, SET role_id (?) ')
            break;
        case "View All Roles":
            db.query('SELECT * FROM role', function (err, results) {
                console.table(results);
            });
        case "Add Role":
            db.query('INSERT INTO role (title, salary, department_id) VALUES (?)')
            break;
        case "View All Departments":
            db.query('SELECT id.name FROM department', function (err, results) {
                console.table(results);
            });
        case "Add Departments":
            db.query('INSERT INTO department (name) VALUES (?)')
            default:
        }
});
