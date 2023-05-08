DROP DATABASE IF EXISTS cms;
CREATE DATABASE cms;

USE cms;

-- Add to erase previous tables from testing
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;

-- Department Table 
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Position table
CREATE TABLE roles (
   id INT AUTO_INCREMENT PRIMARY KEY,
   position VARCHAR(50) NOT NULL,
   salary INT NOT NULL,
   department_id INT NOT NULL,
   CONSTRAINT fk_department
   FOREIGN KEY (department_id)
   REFERENCES department(id)
   ON DELETE CASCADE
);

-- CREATE TABLE manager (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     first_name VARCHAR(50) NOT NULL,
--     last_name VARCHAR(50) NOT NULL,
--     roles_id INT,
--     CONSTRAINT fk_roles
--     FOREIGN KEY (roles_id)
--     REFERENCES roles(id)
--     ON DELETE SET NULL
-- );

-- Employee Table
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    roles_id INT NOT NULL,
    CONSTRAINT fk_roles
    FOREIGN KEY (roles_id)
    REFERENCES roles(id)
    ON DELETE CASCADE,
    manager_id INT,
    CONSTRAINT fk_manager
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL

);