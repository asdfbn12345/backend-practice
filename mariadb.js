require("dotenv").config();
const mysql = require("mysql2");

// Create the connection to database
const connection = mysql.createConnection(process.env.MYSQL_CONNECTION_OPTIONS);

module.exports = connection;
