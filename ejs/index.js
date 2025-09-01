const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));


app.set("views" , path.join(__dirname, "views"));

app.listen(port, () => {
  console.log(`listening to port ${port}`);
})

app.set("view engine" , "ejs");

app.get ("/" , (req, res) => {
  res.render("home");
})

app.get ("/rolldice" , (req, res) => {
  let dice = Math.floor(Math.random() * 6) + 1;;
  res.render("rolldice.ejs", {num : dice});
})


app.get("/ig/:username" , (req, res) => {
  let {username} = req.params;
  console.log(username);
 const instadata = require("./data.json");   
 console.log(instadata);
 const data = instadata[username];
if(data){
  res.render("instagram.ejs" , {data });
}
})