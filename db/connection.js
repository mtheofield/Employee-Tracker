const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3000,
  password: "password",
  database: "company_db",
});

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;