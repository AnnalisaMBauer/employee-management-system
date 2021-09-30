const mysql = require('mysql2');


const connection = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'employees'
},
console.log(`Connected to the employees database.`)
);
connection.connect(function (err){
    if (err) throw err
})

class DB {
    constructor(connection){
        this.connection = connection
    }

    findAllEmployees(){
        return this.connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, concat(manager.first_name,  ' ',  manager.last_name) as Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;");
    }

    findAllRoles(){
        return this.connection.promise().query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;");
    }

    findAllDepartments(){
        return this.connection.promise().query("SELECT * FROM department;");
    }

    addNewEmployee(employee){
        return this.connection.promise().query("INSERT INTO employee SET ?;", employee);
    }

    addNewRole(role) {
        return this.connection.promise().query("INSERT INTO role SET ?;", role);
    }
    addNewDepartment(department) {
        return this.connection.promise().query("INSERT INTO department SET ?;", department);
    }
}

module.exports = new DB(connection);
