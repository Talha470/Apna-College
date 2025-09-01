const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

//Method Override to change request format in http
const methodOverride = require('method-override')
app.use(methodOverride('_method'))


//uuid
const { v4: uuidv4 } = require('uuid');
 
//parsing rule middleware
app.use(express.urlencoded({extended : true}));
app.use(express.json());

//setting for ejs, views, static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
2 
//Setting Paths for randering 
app.use(express.static( path.join(__dirname, "public")));

//Listening port
app.listen(port, () => {
  console.log(`Your are listening to port : ${port}`);
});

//Home Page => Index route
let posts = [
  {
    id: uuidv4(),
    username : "Talha Nadeem",
    content : "I am learning backend"
  },
  {
    id: uuidv4(),
    username : "Sudais Nadeem",
    content : "I am learning frontend"
  },
  {
    id:uuidv4(),
    username : "Fatime Nadeem",
    content : "I am learning python"
  },
];

app.get("/post", (req, res) => {
  res.render("index", {posts});
})

//Add a new Post => new.ejs

app.get("/post/new" , (req, res) => {
  res.render("new");
});

app.post("/post", (req, res) => {
  let { name, post } = req.body;
  console.log(req.body); 
  posts.push({ username: name, content: post, id : uuidv4() });
  res.redirect("/post");
});

//to check post by id 
app.get("/post/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find(p => p.id === id);  
  if (!post) {
    return res.status(404).send("Post not found");
  }
  res.render("show", { post });
});

//Update Route 
app.patch("/post/:id", (req, res) => {
  let { id } = req.params;
  let newcontent = req.body.content;
  let post = posts.find(p => p.id === id);  
  post.content = newcontent;
  res.redirect("http://localhost:8080/post")
});

app.get("/post/:id/edit" , (req, res) => {
  let { id } = req.params;
  let post = posts.find(p => p.id === id);  
  res.render("edit", {post});
});

//Deleteing
app.delete("/post/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter(p => p.id !== id);  
  res.redirect("http://localhost:8080/post")
});