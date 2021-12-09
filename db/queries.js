// Database and Queries
const mysql = require('mysql2')

// Queries

const allDepartmentsQuery = `SELECT * FROM department`

const allDepartmentsDisplay = `SELECT department.id AS 'ID', department.name AS 'Department Name' FROM department`

const allRolesQuery = `SELECT * FROM role`

const allRolesDisplay = `SELECT role.id AS 'ID', role.title AS 'Job Title', role.salary AS 'Salary', department.name AS 'Department' FROM role LEFT JOIN department on role.department_id = department.id`

const allEmployeesQuery = `SELECT * FROM employee`

const allEmployeesDisplay = `SELECT employee.id AS 'ID', employee.first_name AS 'First Name', employee.last_name AS 'Last Name', role.title AS 'Title', department.name AS 'Department', role.salary as Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager' from employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id`

const insertDepartment = 'INSERT INTO department (name) VALUES(?)'

const insertRole = 'INSERT INTO role (title, salary, department_ID) VALUES(?,?,?)'

const insertEmployee = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)'

module.exports = {
    allDepartmentsQuery,
    allEmployeesQuery,
    allRolesQuery,
    allRolesDisplay,
    allDepartmentsDisplay,
    allEmployeesDisplay,
    insertDepartment,
    insertRole,
    insertEmployee,
}