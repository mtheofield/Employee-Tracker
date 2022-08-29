use company_db;

INSERT INTO department (name)
VALUES
    ('Human Resources'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
('Vice President', 170000, 1),
('Director', 120000, 1),
('Team Lead', 75000, 1),
('Senior Vice President', 250000, 2),
('Financial Analyst', 105000, 2),
('Accountant', 120000, 2),
('General Counsel', 185000, 3),
('Lawyer', 165000, 3),
('Legal Team Lead', 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Barbara', 'Smith', 1, NULL),
('Craig', 'Vickers', 2, 1),
('Ellen', 'Haspel', 3, 2),
('Jane', 'Pickett', 4, NULL),
('Patrick', 'Sanders', 5, 4),
('Rachel', 'Green', 6, NULL),
('Ryan', 'Doe', 7, NULL),
('Jason', 'Rose', 8, 3);