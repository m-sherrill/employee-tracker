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

  module.exports = db