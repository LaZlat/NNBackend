const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "1b",
    multipleStatements: true, // must add
  });

con.connect();

module.exports = con;