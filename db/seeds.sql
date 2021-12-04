INSERT INTO department (name)
VALUES ("Sales"),
       ("Human Resources"),
       ("IT");
       
INSERT INTO role (title, salary, department_ID)
VALUES ("Vice President", "200000", 1),
       ("Technician", "55000", 3),
       ("Associate", "42000", 1);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Johnny", "Cash", 1, null),
       ("Bob", "Dylan", 2, 1),
       ("Steven", "Tyler", 3, 1);
