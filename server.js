// Setup empty JS object to act as endpoint for all routes
var dBData = {
    makes: [] ,
    models: [],
    colors: [],
    milage: [],
    hp: [],
    price: [],
    year: []
};

const admin = {
    username: "admin@admin.com",
    password: "105289c3d80dc3255f11aab58c456b58" // adamkikha md5
}

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
});

connection.connect();


// db demo

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(require("cors")());

// Initialize the main project folder
app.use(express.static('FP'));


// Setup Server
app.listen(8000,()=>{
    console.log("server running"); 
});

// GET Route Setup
app.get("/get",(req,res)=>{
    req = req.json()
    req.body;
});

app.get("/init",(req,res)=>{
    try {
        connection.query("SELECT DISTINCT make FROM car",function (error, results, fields) {
            dBData.makes = results;
            if (error) throw error;
        });
        connection.query("SELECT DISTINCT color FROM car",function (error, results, fields) {
            dBData.colors = results;
            if (error) throw error;
        });
        
        connection.query("SELECT min(d_price),max(d_price),min(milage),max(milage),min(hp),max(hp),min(year),max(year) FROM car",function (error, results, fields) {
            dBData.price = [results[0]["min(d_price)"],results[0]["max(d_price)"]];
            dBData.milage = [results[0]["min(milage)"],results[0]["max(milage)"]];
            dBData.year = [results[0]["min(year)"],results[0]["max(year)"]];
            dBData.hp = [results[0]["min(hp)"],results[0]["max(hp)"]];
            if (error) throw error;
        });  
        connection.query("SELECT * FROM car ORDER BY model",function (error, results, fields) {
            dBData.models = results;
            if (error) throw error;
        });
        
    } catch (error) {
        console.log(error);
    }

    res.send(JSON.stringify(dBData));
});
    
// POST Route Setup
app.post("/post",(req,res)=>{
    const data = {
        temp: req.body.temp,
        feel: req.body.feel,
        date: req.body.date
    }
    console.log(data);
    dBData[data.date] = data;
});

// POST Login Route Setup
app.post("/login",(req,res)=>{
    let body = req.body;
    const data = {
        admin: body.admin, // 0 = user login, 1 = admin login
        username: body.email,
        password: body.password
    }
    if (data.admin){
        if (data.username == admin.username && data.password == admin.password){
            res.sendStatus(200);
            return;
        }
        res.sendStatus(400);
        return;
    }
    else{
        sql = `SELECT * FROM customer WHERE email = ? AND password = ?`
        connection.query(sql, [data.username, data.password],function (error, results, fields) {
            if (error){
                res.sendStatus(400);
                return;
            } 
                
            if (results.length == 0){
                res.sendStatus(400);
                return;
            }
            res.sendStatus(200);
            return;
          });
    }
});

// POST Register Route Setup
app.post("/register",(req,res)=>{
    let body = req.body;
    const data = {
        ssn: body.ssn,
        email: body.email,
        password: body.password,
        ph_num: body.ph_num,
        name: body.name,
        age: body.age,
        gender: body.gender
    }

    sql = `insert into customer values (?, ?, ?, ?, ?, ?, ?);`
    connection.query(sql, [data.ssn, data.email, data.password, data.ph_num, data.name, data.age, data.gender],function (error, results, fields) {
            if (error) {res.sendStatus(400);
                return;}
            res.sendStatus(200);
            return;
        });
    
});

// POST User Init Setup
app.post("/userinit",(req,res)=>{
    let body = req.body;
    sql = `SELECT * FROM customer WHERE email = ? AND password = ?`
    connection.query(sql, [body.username, body.password],function (error, results, fields) {
        if (error) {res.sendStatus(400);
            return;
        }
        if (results.length == 0){
            res.sendStatus(400);
            return;
        }
        sql = `SELECT ssn, email, name, ph_num, age, gender, model, plate_id, s_date, d_date, cancelled, R_id FROM reserve
        NATURAL JOIN customer
        NATURAL JOIN car
        WHERE ssn = ?;`;

        connection.query(sql, [results[0][0]],function (error, results2, fields) {
            if (error) {res.sendStatus(400);
                return;
            }
            res.sendStatus(200);
                // return OK response with user reservations
            });
        });
    
});
