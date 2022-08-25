CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  deptartment_name VARCHAR(30) NOT NULL
);

CREATE TABLE job (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT
);

CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  job_id INT,
  manager_id INT
);