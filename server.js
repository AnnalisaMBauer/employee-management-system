const inquirer = require("inquirer");
const db = require("./db");
require("console.table");

function loadPrompts() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "initialPrompt",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Exit"
        ],
      },
    ])
    .then((data) => {
      let choice = data.initialPrompt;
      switch (choice) {
        case "View All Employees":
          showAllEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          console.log("cannot update at this time");
          break;
        case "View All Roles":
          allRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          allDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
          case "Exit":
        default:
      }
    });
}

// function to show all Employees
function showAllEmployees() {
  db.findAllEmployees()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => {
      init();
    });
}

// function to add an Employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
    ])
    .then((data) => {
      let firstName = data.firstName;
      let lastName = data.lastName;

      db.findAllRoles().then(([data]) => {
        const roleOptions = data.map(({ id, title }) => ({
          name: title,
          value: id,
        }));

        inquirer
          .prompt({
            type: "list",
            name: "roleID",
            message: "What is the employee's role?",
            choices: roleOptions,
          })
          .then((res) => {
            let roleId = res.roleID;

            db.findAllEmployees().then(([data]) => {
              const managerOptions = data.map(
                ({ id, first_name, last_name }) => ({
                  name: `${first_name} ${last_name}`,
                  value: id,
                })
              );

              inquirer
                .prompt({
                  type: "list",
                  name: "managerID",
                  message: "What is the employee's Manager",
                  choices: managerOptions,
                })
                .then((res) => {
                  let newEmployee = {
                    manager_id: res.managerID,
                    role_id: roleId,
                    first_name: firstName,
                    last_name: lastName,
                  };

                  db.addNewEmployee(newEmployee);
                })
                .then(() => {
                  loadPrompts();
                });
            });
          });
      });
    });
}

// function to add a Role
// function addRole() {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "role",
//         message: "What is the name of the role you would like to add?",
//       },
//       {
//         type: "input",
//         name: "salary",
//         message: "What is the salary of the role?",
//       },
//       {
//         type: "input",
//         name: "department",
//         message: "What department does the role belong to?",
//       }
//     ])
//     .then((data) => {
//       db.addNewRole(data).then(() => {
//           let role = data.role;
//           let salary = data.salary;
//           let department = data.department;
//           db.findAllRoles().then(([data]) => {
//             const roleOptions = data.map(({ id, title }) => ({
//                 name: title,
//                 value: id,
                
//               }));
//       });
//     });
// }

// function to show all Roles
function allRoles() {
    db.findAllRoles()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => {
      init();
    });
}

// function to add a Department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department you would like to add?",
      },
    ])
    .then((data) => {
      db.addNewDepartment(data).then(() => {
        loadPrompts();
      });
    });
}

// function to view all Departments
function allDepartments() {
  db.findAllDepartments()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => {
      init();
    });
}

function init() {
  loadPrompts();
}

init();
