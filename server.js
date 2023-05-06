const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const chart = require("console.table")

const PORT = process.env.PORT || 4003;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const database = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: "10171017",
    database: 'cms'
  },
  console.log(`Connected to cms database.`)
);

const chartQuestions = () => {
    inquirer.prompt (
        {
        type:"list",
        name:"table",
        choices:[
            "view all departments",
            "view all roles",
            "view all employees",
            "add a department",
            "add a role",
            "add an employee",
            "update an employee role"
        ],
    }).then ((data)=> {
        switch(data.table) {
            case "view all departments":{
                viewDepartment()
                break
            }
            case "view all roles": {
                viewRoles()
                break
            }
            case "view all employees": {
                viewEmployee()
                break
            }
            case "add a department": {
                addDepartment()
                break
            }
            case "add a role": {
                addRole()
                break
            }
            case "add an employee": {
                addEmployee()
                break
            }
            case "update an employee role": {
                updateEmployeeRole()
                break
            }
            default: return 
        }
    })
};

function viewDepartment(){
    const mysq = "select * from department;"
    database.query(mysq,(error,data)=>{
        if(error){
            console.log("There is a problem")
        } else {
            console.log(chart.getTable(data))
            chartQuestions()

        }
    })
};

function viewRoles(){
    const mysq = "select roles.id, roles.position,roles.salary, department.name from roles INNER JOIN department ON roles.department_id = department.id;"
    database.query(mysq,(error,data)=>{
        if(error){
            console.log("There is a problem")
        } else {
            console.log(chart.getTable(data))
            chartQuestions()

        }
    })
};

function viewEmployee(){
    const mysq = "select employee.first_name, employee.last_name, department.name, roles.salary, roles.position from employee LEFT JOIN roles ON employee.roles_id = roles.id LEFT JOIN department ON roles.department_id = department.id;"
    database.query(mysq,(error,data)=>{
        if(error){
            console.log("There is a problem")
        } else {
            console.log(chart.getTable(data))
            chartQuestions()

        }
    })
};

const addDepartment = ()=>{
    inquirer.prompt([
        {
            type:"input",
            name:"name",
            message:"What department would you like to add?"
        }
    ]).then((data)=> {
        const mysq = "insert into department (name) Values (?);"
        const param = [data.name];
        database.query(mysq,param,(error,data)=>{
            if(error){
                console.log("Department not added");
            }else {
                console.log(chart.getTable(data))
                viewDepartment()
                chartQuestions()
            }
        })
    })
};

const addRole = () => {
    inquirer.prompt([
        {
            type:"input",
            name:"position",
            message:"What position would you like to add?"
        },
        {
            type:"input",
            name: "salary",
            message:"What is the yearly salary?"
        },
        {
            type:"input",
            name:"department",
            message:"What department does this position report to?"
        }
    ]).then((data)=> {
        const mysq = "insert into roles (position, salary, department_id) Values (?,?,?);"
        const param = [data.position, data.salary, data.department]
        database.query(mysq,param,(error,data)=>{
            if(error){
                console.log("Role not added");
            }else {
                console.log(chart.getTable(data))
                viewRoles()
                chartQuestions()
            }
        })
    })
};

const addEmployee = ()=>{
    inquirer.prompt([
        {
            type:"input",
            name:"first_name",
            message:"Enter employee's first name."
        },
        {
            type:"input",
            name: "last_name",
            message:"Enter employee's last name."
        },
        {
            type:"input",
            name:"roles_id",
            message:"What is the employee's position?"
        }
    ]).then((data)=> {
        const mysq = "insert into employee (first_name,last_name,roles_id,manager_id) Values (?,?,?,NULL);"
        const param = [data.first_name, data.last_name, data.roles_id];
        database.query(mysq,param,(error,data)=>{
            if(error){
                console.log("Employee not added");
            }else {
                console.log(chart.getTable(data))
                viewEmployee()
                chartQuestions()
            }
        })
    })
};

const updateEmployeeRole = ()=> {
    inquirer.prompt ([{
        type:"input",
        name:"employee_id",
        message:"Who are needs to be updated?"
    },
    {
        type:"input",
        name:"roles_id",
        message:"What is the new role?"
    }
]).then((data)=>{
    const mysq = "update employee set roles_id = ? where id = ?;"
    const param = [data.roles_id,data.employee_id]
    database.query(mysq,param,(error,data)=>{
        if(error){
            console.log("Employee not updated");
        }else {
            console.log(chart.getTable(data))
            viewEmployee()
            chartQuestions()
        }
    })
})
};


chartQuestions();

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });