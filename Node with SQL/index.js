//Containing Express
const express = require("express");
const app = express();
const port = 8080;


 //Listening port
 app.listen(port, () => {
  console.log(`Your are listening to port : ${port}`);
});

//setting for ejs, views, static files
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static( path.join(__dirname, "public")));


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
const { faker, tr } = require('@faker-js/faker');

  //too add uuid
const { v4: uuid } = require('uuid');

//faker
const getRandomUser = () => [
  faker.string.uuid(),
  faker.internet.userName(),  // Use userName() if version <9.1.0
  faker.internet.email(),
  faker.internet.password()
];



//home page => showing all users
 app.get("/" , (req,res) => {
  let q = "SELECT count(*) FROM user";

  try{
connection.query(
  q, (err, results) => {
    if (err) throw err;
    let count = results[0]["count(*)"];
    res.render('home', {count});

  }
)
}
catch(err){
  console.log(err);
}
 })

// =>Show Users => display All user with name
app.get('/users', (req, res) => {
  let q = "SELECT * FROM user";

  try{
    connection.query(
      q, (err, results) => {
        if (err) throw err;
        res.render('showusers' , {results});
    
      }
    )
    }
    catch(err){
      console.log(err);
    }
  })


//Edit route 

app.get('/users/:id/edit', (req,res) => {
    let {id} = req.params;
    let q = `SELECT * FROM user where id = "${id}"`;  
    try{
      connection.query(
        q, (err, results) => {
          if (err) throw err;
          let user = results[0];
          res.render('edit', {user}); 
        }
      )
      }
      catch(err){
        console.log(err);
      }
} )
app.patch('/users/:id', (req, res) => {
  let { id } = req.params;
  let { password: formpass, username: newUser } = req.body;
  let q = `SELECT * FROM user where id = "${id}"`;

  try {
    connection.query(q, (err, results) => {
      if (err) throw err;
      
      if (results.length === 0) {
        return res.send("User not found");
      }

      let user = results[0];

      if (formpass != user.password) {  // Corrected this line
        return res.send("Wrong Password");
      } else {
        let q2 = `UPDATE user SET username = '${newUser}' WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect("/users");
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});


//Adding a user
app.get("/user/add" , (req,res) => {
  try{
      res.render('adduser');
  }catch(err){
    console.log(err);
  }
});

app.post('/user/add', (req, res) => {
  let query = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";
  let { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.send("Enter Each Value");
  }

  let user = [uuid(), username, email, password];

  connection.query(query, user, (err, results) => {
    if (err) {
      console.error("Database Error: ", err);
      return res.send("Error adding user");
    }
    res.redirect("/users"); // Redirects to the users list page
  });
});

//DELETING 
app.delete("/users/:id", (req,res) => {;
  let query = "DELETE FROM user WHERE id = ?;";
  let {id} = req.params;
  try{
    connection.query(query, id,(err, result) => {
      if (err) throw err;
      res.redirect("/users");
    })
  }catch(err){
    console.log(err);
  }
})