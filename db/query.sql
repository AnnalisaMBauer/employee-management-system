SELECT role.id AS employees
FROM department
JOIN role ON department.id = role.department_id
JOIN employee ON role.id = employee.role_id
ORDER BY id;

SELECT employee.id, employee.first_name, employee.last_name, title, salary, department.name AS departmnet, CONCAT(first_name, "", last_name) AS Manager
FROM employee
LEFT JOIN role on employee.role_id

SELECT * 
FROM department