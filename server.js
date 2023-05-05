const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 4003;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const database = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'cms'
  },
  console.log(`Connected to the books_db database.`)
);





app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });