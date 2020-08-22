const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
const serialiser = require('node-serialize')
const mysql = require('mysql');

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
var connection = mysql.createConnection({

    host     : DB_END_POINT,
    user     : DB_USER_NAME,
    database : DB_DATABASE_NAME,
    port: DB_PORT_NUM
  });

connection.connect();
app.get('/', (req, res) => res.send('Hello World!'))


// your code goes here

// here

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;