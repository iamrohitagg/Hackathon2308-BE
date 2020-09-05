const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3001;
const serialiser = require("node-serialize");
const mysql = require("mysql");

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//creating a connection
var connection = mysql.createConnection({
  host: process.env.DB_END_POINT || "localhost",
  user: process.env.DB_USER_NAME || "root",
  database: process.env.DB_DATABASE_NAME || "projectdb",
  password: process.env.DB_PASSWORD || "manisha",
  port: process.env.DB_PORT_NUM,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

//this is made to check if the server is running
app.get("/", (req, res) => res.send("Hello World!"));

// your code goes here

//api to get all the issues in database
app.get("/list-issues", (req, res) => {
  let sql = "select * from issues";
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

//api for adding to add the issue with data in request body
app.post("/add-issue", (req, res) => {
  let data = {
    title: req.body.title,
    description: req.body.description,
  };
  let sql = "insert into issues set ?";
  let query = connection.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// here
//api to delete the issue with specified id
app.delete("/delete-issue/:id", (req, res) => {
  let sql = "delete from issues where id = " + req.params.id + "";
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
