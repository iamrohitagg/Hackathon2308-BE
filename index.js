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

    host     : '3.7.227.43',
    user     : 'root',
    database : 'hackathon2308',
    port: 3306
  });

connection.connect();
app.get('/', (req, res) => res.send('Hello World!'))


// your code goes here

// here
app.get('/issues', (req, res) =>{
    const page = req.query.page;
    connection.query("select * from `issues` limit 10 offset 2",function(err, result) {
        if(err) throw err;
        //res.json({message: "Successfully fetched 10 records", issues: result})
        res.json({status: res.status,issues: result })
    }  )
    res.send({status:"done"});
   
})

app.post('/data', function(req, res){
    const query = "INSERT INTO `issues` (id, name, description, url, number, label, state, locked ) VALUES (?)"
    const values = [req.body.id, req.body.name, req.body.description, req.body.url, req.body.number , serialiser.serialize(req.body.label), req.body.state, req.body.locked]
    connection.query(query, [values], function(err, result){
        if(err) throw err;
            console.log("1 record inserted");
        });
    res.send({status: "success" , message:"done"});
});


app.patch('/update-issue/:id', (req, res) => {


    const  query = "UPDATE `issues` set name=? , description=? , url=?, number=?, label=?, state=?, locked=? where id=?";
    const  values = [ req.body.name, req.body.description, req.body.url, req.body.number , serialiser.serialize(req.body.label), req.body.state, req.body.locked,  req.body.id];

    connection.query(query, values, (err, result) => {
        if(err) throw err;

        console.log("1 record updated successfullly");
    })
    res.send({status: "success" , message:"done"});

})

app.delete('/delete-issue/:id', (req, res) => {
    const query = "Delete from `issues` where id=?"
    const value = parseInt(req.params.id);

    connection.query(query, value, (err, result) => {
        if(err) throw err;
        console.log("1 record updated successfullly");
    })

    res.send({status: "success" , message:"done"});

})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;