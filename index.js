// main file which will run the application in node. 
// linking to dotenv 

const dotenv = require('dotenv')
dotenv.config();

const inquirer = require('inquirer')
const mysql = require('mysql2')

console.log(process.env.DB_HOST, process.env.DB_ROOT, process.env.DB_PASS)

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

  
  db.query('SELECT * FROM department', function (err, results) {
    console.log(results);
  });

  db.query('SELECT * FROM role', function (err, results) {
    console.log(results);
  });

  db.query('SELECT * FROM employee', function (err, results) {
    console.log(results);
  });