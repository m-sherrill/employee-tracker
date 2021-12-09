// Database and Queries
const mysql = require('mysql2')

// Queries

const allDepartmentsQuery = 'SELECT department.id AS ID, department.name AS Department Name FROM department'

const allRolesQuery = 'SELECT role.id AS ID, role.title AS Job Title, role.salary AS Salary, department.name AS Department FROM role LEFT JOIN department on role.department_id = department.id'

const allEmployeesQuery = 'SELECT employee.id AS ID, employee.first_name AS First Name, employee.last_name AS Last Name, role.title AS Title, department.name AS Department, role.salary as Salary, employee.manager_id AS Manager from employee LEFT JOIN employee on employee.manager_id = employee.id AS employee.first_name + employee.last_name LEFT JOHN role on role.department_id = department.id'

const insertDepartment = 'INSERT INTO department (name) VALUES(?)'

const insertRole = 'INSERT INTO role (title, salary, department_ID) VALUES(?,?,?)'

const insertEmployee = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)'

const employeeAlias = `SELECT id AS "Employee ID",
first_name AS "First Name",
last_name AS "Last Name",
role_id AS "Role ID",
COALESCE(manager_id, "No Manager") AS "Manager ID"
FROM employee`


module.exports = {
    allDepartmentsQuery,
    allEmployeesQuery,
    allRolesQuery,
    insertDepartment,
    insertRole,
    insertEmployee,
    roleAlias,
    deptAlias,
    employeeAlias
}