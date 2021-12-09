// Database and Queries
const mysql = require('mysql2')

// database connection
const db = mysql.createConnection(
    {
      'host': process.env.DB_HOST,
      'user': process.env.DB_USER,
      'password': process.env.DB_PASS,
      'database': process.env.DB_NAME,
    },
    console.log(`Connected to the ${process.env.DB_NAME} database.`)
  );


// Queries

const allDepartmentsQuery = 'SELECT * FROM department'

const allRolesQuery = 'SELECT * FROM role'

const allEmployeesQuery = 'SELECT * FROM employee'

const insertDepartment = 'INSERT INTO department (name) VALUES(?)'

const insertRole = 'INSERT INTO role (title, salary, department_ID) VALUES(?,?,?)'

const insertEmployee = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)'


module.exports = {
    db,
    allDepartmentsQuery,
    allEmployeesQuery,
    allRolesQuery,
    insertDepartment,
    insertRole,
    insertEmployee
}