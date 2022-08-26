const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findAllDepartments() {
    return this.connection.query("SELECT * FROM departments");
  }

  createDepartment(departments) {
    this.connection.query(
      "INSERT INTO departments SET ?",
      {
        name: departments.name,
      },
      function (err, res) {
        if (err) throw err;
      }
    );
    return;
  }

  findAllRoles() {
    return this.connection.query("SELECT * FROM roles");
  }

  createRole(roles) {
    {
      this.connection.query(
        "INSERT INTO roles SET ?",
        {
          title: roles.title,
          salary: roles.salary,
          department_id: roles.department_id,
        },
        function (err, res) {
          if (err) throw err;
        }
      );
      return;
    }
  }

  findAllEmployees() {
    return this.connection.query("SELECT * FROM employees");
  }

  findManagerRole() {
    return this.connection.query(
      "SELECT employees.manager_id, roles.title FROM employee INNER JOIN role ON employees.role_id = roles.id"
    );
  }

  createEmployee(employees) {
    this.connection.query(
      "INSERT INTO employees SET ?",
      {
        first_name: employees.first_name,
        last_name: employees.last_name,
        role_id: employees.role_id,
        manager_id: employees.manager_id,
      },
      function (err, res) {
        if (err) throw err;
      }
    );
    return;
  }

  updateEmployeeRoleDB(employeeId, roleId) {
    this.connection.query(
      "UPDATE employees SET role_id='?' WHERE id='?'",
      [roleId, employeeId],
      function (err, res) {
        if (err) throw err;
      }
    );
    return;
  }
}

module.exports = new DB(connection);