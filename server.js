const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

init();

function init() {
  const logoText = logo({ name: "Employee Tracker" }).render();

  console.log(logoText);

  mainPrompts();
}

async function mainPrompts() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View all of the employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "View employees by their department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
        },
        {
          name: "View all Employees By Manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER"
        },
        {
          name: "Add employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Remove employee",
          value: "REMOVE_EMPLOYEE"
        },
        {
          name: "Update employee roles",
          value: "UPDATE_EMPLOYEE_ROLE"
        },
        {
          name: "Update employee manager",
          value: "UPDATE_EMPLOYEE_MANAGER"
        },
        {
          name: "View all roles",
          value: "VIEW_ROLES"
        },
        {
          name: "Add a role",
          value: "ADD_ROLE"
        },
        {
          name: "Remove a role",
          value: "REMOVE_ROLE"
        },
        {
          name: "View all departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "Add a department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Remove a department",
          value: "REMOVE_DEPARTMENT"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  ]);
  switch (choice) {
    case "VIEW_EMPLOYEES":
      return viewEmployees();
    case "VIEW_EMPLOYEES_BY_DEPARTMENT":
      return viewEmployeesByDepartment();
    case "VIEW_EMPLOYEES_BY_MANAGER":
      return viewEmployeesByManager();
    case "ADD_EMPLOYEE":
      return addEmployee();
    case "REMOVE_EMPLOYEE":
      return removeEmployee();
    case "UPDATE_EMPLOYEE_ROLE":
      return updateEmployeeRole();
    case "UPDATE_EMPLOYEE_MANAGER":
      return updateEmployeeManager();
    case "VIEW_DEPARTMENTS":
      return viewDepartments();
    case "ADD_DEPARTMENT":
      return addDepartment();
    case "REMOVE_DEPARTMENT":
      return removeDepartment();
    case "VIEW_ROLES":
      return viewRoles();
    case "ADD_ROLE":
      return addRole();
    case "REMOVE_ROLE":
      return removeRole();
    default:
      return quit();
  }
}

async function viewEmployees() {
  const employees = await db.findAllEmployees();
  console.table(employees);

  mainPrompts();
}

async function viewEmployeesByDepartment() {
  const departments = await db.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { departmentId } = await prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Please choose a department that you would like to see the employees of?",
      choices: departmentChoices
    }
  ]);

  const employees = await db.employeesByDepartment(departmentId);
  console.table(employees);

  mainPrompts();
}

async function viewEmployeesByManager() {
  const managers = await db.findAllEmployees();

  const managerChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { managerId } = await prompt([
    {
      type: "list",
      name: "managerId",
      message: "Whose direct reports do you want to see?",
      choices: managerChoices
    }
  ]);

  const employees = await db.employeesByManager(managerId);

  if (employees.length === 0) {
    console.log("This employee does not have any direct reports");
  } else {
    console.table(employees);
  }

  mainPrompts();
}

async function removeEmployee() {
  const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Please choose which employee you want to remove.",
      choices: employeeChoices
    }
  ]);

  await db.removeEmployee(employeeId);

  console.log("This employee has now been removed from the database");

  mainPrompts();
}

async function updateEmployeeRole() {
  const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee needs their role updated?",
      choices: employeeChoices
    }
  ]);

  const roles = await db.findAllRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "What is the employees role?",
      choices: roleChoices
    }
  ]);

  await db.updateEmployeeRole(employeeId, roleId);

  console.log("Employee's role has been updated");

  mainPrompts();
}

async function updateEmployeeManager() {
  const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "What employee needs their manager updated?",
      choices: employeeChoices
    }
  ]);

  const managers = await db.findAllManagers(employeeId);

  const managerChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { managerId } = await prompt([
    {
      type: "list",
      name: "managerId",
      message:
        "Who will be this employee's manager?",
      choices: managerChoices
    }
  ]);

  await db.updateEmployeeManager(employeeId, managerId);

  console.log("The employee's manager has been updated");

  mainPrompts();
}

async function viewRoles() {
  const roles = await db.findAllRoles();

  mainPrompts();
}

async function addRole() {
  const departments = await db.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const role = await prompt([
    {
      name: "title",
      message: "Please name the role."
    },
    {
      name: "salary",
      message: "Please enter a salary for the role."
    },
    {
      type: "list",
      name: "department_id",
      message: "Please choose a department role belong to.",
      choices: departmentChoices
    }
  ]);

  await db.createRole(role);

  console.log(`Added ${role.title} to the database`);

  mainPrompts();
}

async function removeRole() {
  const roles = await db.findAllRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message:
        "Which role would you like to remove? )",
      choices: roleChoices
    }
  ]);

  await db.removeRole(roleId);

  console.log("This role has been removed from the database");

  mainPrompts();
}

async function viewDepartments() {
  const departments = await db.findAllDepartments();

  console.table(departments);

  mainPrompts();
}

async function addDepartment() {
  const department = await prompt([
    {
      name: "name",
      message: "What's the name of the department?"
    }
  ]);

  await db.createDepartment(department);

  console.log(`Added ${department.name} to the database`);

  mainPrompts();
}

async function removeDepartment() {
  const departments = await db.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { departmentId } = await prompt({
    type: "list",
    name: "departmentId",
    message:
      "Which department are you removing? ",
    choices: departmentChoices
  });

  await db.removeDepartment(departmentId);

  console.log(`This department has been removed from the database`);

  mainPrompts();
}

async function addEmployee() {
  const roles = await db.findAllRoles();
  const employees = await db.findAllEmployees();

  const employee = await prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ]);

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt({
    type: "list",
    name: "roleId",
    message: "What is the employee's role?",
    choices: roleChoices
  });

  employee.role_id = roleId;

  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));
  managerChoices.unshift({ name: "None", value: null });

  const { managerId } = await prompt({
    type: "list",
    name: "managerId",
    message: "Who will be the employee's manager?",
    choices: managerChoices
  });

  employee.manager_id = managerId;

  await db.createEmployee(employee);

  console.log(
    `Added ${employee.first_name} ${employee.last_name} to the database`
  );

  mainPrompts();
}

function quit() {
  console.log("All done");
  process.exit();
}
