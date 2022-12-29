// Setup empty JS object to act as endpoint for all routes
const projectData = {
    makes: ["renault","audi","bmw","chevrolet","dodge"] ,
    models: ["duster","megane","a4","a5","x3","x6","aveo","corvette","challenger","hornet"]
};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
const mysql = require("mysql");
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'carAgency'
})

try {
    connection.connect();
} catch (error) {
    console.log(error);
}

// db demo
connection.query("SELECT * FROM car_status",function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
const { json } = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(require("cors")());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(8000,()=>{
    console.log("server running"); 
});

// GET Route Setup
app.get("/get",(req,res)=>{
    req = req.json()});

    
    
app.get("/init",(req,res)=>{
    res.send(JSON.stringify(projectData))});
    
// POST Route Setup
app.post("/post",(req,res)=>{
    const data = {
        temp: req.body.temp,
        feel: req.body.feel,
        date: req.body.date
    }
    console.log(data);
    projectData[data.date] = data;
});