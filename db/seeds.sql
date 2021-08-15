

INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');


INSERT INTO role (title, salary, department_id)
VALUES
('Lead Engineer', 150000, 2),
('Lgal Team Lead', 250000, 4),
('Accountant', 125000, 3),
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Software Engineer', 120000, 2),
('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id, department_id)
VALUES
    ('John', 'Doe',null , 4, 1),
    ('Mike', 'Chan',null , 5, 1),
    ('Ashly', 'Rodriguez',1 , 1, 2),
    ('Kevin', 'Tupik',4 , 6, 2),
    ('Tofu', 'Lu',null , 2, 4),
    ('Malia', 'Brown',1 , 3, 3),
    ('Sarah', 'Lourd',1 , 2, 4),
    ('Tom', 'Allen',2 , 7, 4),
    ('Tammer', 'Galal',1 , 6, 2);
