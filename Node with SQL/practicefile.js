//Containing Express
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");


//setting for ejs, views, static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static( path.join(__dirname, "public")));

//uuid
const { v4: uuidv4 } = require('uuid');

//parsing rule middleware
app.use(express.urlencoded({extended : true}));
app.use(express.json());

//Method Override to change request format in http
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// yahan tak express ke requirments hain


//sql 
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'mysql@123'
});

//to generate faje data
const { faker } = require('@faker-js/faker');

//faker
const getRandomUser = () => [
  faker.string.uuid(),
  faker.internet.userName(),  // Use userName() if version <9.1.0
  faker.internet.email(),
  faker.internet.password()
];

try{
  connection.query("Show tables" , (err, results) => {
    if (err) throw err;
    console.log(results);
    
  })
}catch(err){
  console.log(err);
}
connection.end();


// let query = "show tables";
//for single user
//let query = "insert into user (id, username, email, password)  Values (?, ?, ?, ?)";
//let user = ["123", '123_newuser', "abs@gmail.com", 'abd'];

//try{
//connection.query(
//  query , user, (err, results) => {
//    if (err) throw err;
//    console.log(results);
//  }
//)
//}
//catch(err){
//  console.log(err);
//}

//connection.end();

////for multiples user data entry
//let query = "insert into user (id, username, email, password)  Values ?";
//const users = [
//  ["101", "user_101", "user101@gmail.com", "Alice"],
//  ["102", "user_102", "user102@gmail.com", "Bob"],
//  ["103", "user_103", "user103@gmail.com", "Charlie"],
//  ["104", "user_104", "user104@gmail.com", "David"],
//  ["105", "user_105", "user105@gmail.com", "Emma"]
//];
//try{
//  connection.query(
//    query , [users], (err, results) => {
//      if (err) throw err;
//      console.log(results);
//    }
//  )
//  }
//  catch(err){
//    console.log(err);
//  }
  
//  connection.end();


//  //using faker
//  let query = "insert into user (id, username, email, password)  Values ?";
//  const data = [];
//  for(let i = 0; i<100; i++){
//    data.push(getRandomUser());
//  }

//  try{
//    connection.query(
//      query , [data], (err, results) => {
//        if (err) throw err;
//        console.log(results);
//      }
//    )
//    }
//    catch(err){
//      console.log(err);
//    }
    
//    connection.end();