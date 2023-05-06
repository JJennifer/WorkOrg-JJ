INSERT INTO department (name)
VALUES ("Support"),
        ("Service"),
        ("Sales"),
        ("Buisness Office");

INSERT INTO roles (position, salary, department_id)
VALUES ("Support Specialist",40000,1),
        ("Technician",60000,2),
        ("Sales Associate",80000,3),
        ("Admin",45000,4);

-- INSERT INTO manager (first_name,last_name,roles_id)
-- VALUES ("Bill","Tan",3),
--         ("Tom","Blue",1),
--         ("Jen","Gill",4),
--         ("Paul","Brown",2);

INSERT INTO employee (first_name,last_name,roles_id,manager_id)
VALUES ("Sam","James",1,NULL),
        ("Vic","Williams",2,NULL),
        ("Erica","Lewis",3,NULL),
        ("Jeff","Jackson",4,NULL);

