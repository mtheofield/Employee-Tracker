INSERT INTO departments (deptartment_name)
VALUES 
('Human Resources'),
('Finance'),
('Legal');


INSERT INTO roles (title, salary, department_id)
VALUES 
('Vice President', 120000, 1),
('Director', 96000, 1),
('Team Lead', 75000, 1),
('Senior Vice President', 150000, 2),
('Financial Analyst', 120000, 2),
('Accountant', 120000, 2),
('General Counsel', 145000, 3),
('Lawyer', 135000, 3),
('Legal Team Lead', 70000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
('Barbara', 'Smith', 1, NULL),
('Craig', 'Vickers', 2, 1),
('Ellen', 'Haspel', 3, 2),
('Jane', 'Pickett', 4, NULL),
('Patrick', 'Sanders', 5, 4),
('Rachel', 'Green', 6, NULL),
('Ryan', 'Doe', 7, NULL);