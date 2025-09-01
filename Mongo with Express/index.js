const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Chat = require("./models/chats.js");

const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


main().then(() => {
  console.log("Connection Sucessfull");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

const methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.use(express.urlencoded({extended : true}));
app.use(express.json());

//let chat1 = new Chat({
//  from : "neha",
//  to : "talha",
//  msg : "lets Chat!",
//  created_at : new Date()
//})
//chat1.save().then( (res) => {console.log(res);}).catch((err) => {console.log(err)});

app.listen(8080, () => {
  console.log("Server is listening to port 8080");
})


//Index Route
app.get("/chats" , async (req, res) => {
   let  chats = await Chat.find();
   console.log(chats);
   res.render("index", {chats});
})

//New Chat 
app.get("/chats/new", (req, res) => {
  res.render("new")
})

app.post("/chats", (req, res) => {
  let {from, to ,msg} = req.body; 
  let newChat = new Chat({
    from : from,
    to : to,
    msg : msg,
    created_at : new Date()
  });
  newChat.save().then((res) => {console.log("Chat is Saved!")}).catch((err) => {console.log(err)});
  res.redirect("/chats");

})

//Edit Chat
app.get("/chats/:id/edit", async (req, res) => {
  let {id} = req.params;
  let chat = await Chat.findById(id);
  res.render("edit", {chat});
})

app.put("/chats/:id/edit", async (req, res) => {
  let {id} = req.params;
  let {from, to, msg} = req.body;
  let edited = await Chat.findByIdAndUpdate(id, {
    from,
    to,
    msg,
    updated_at : new Date()
  })
  res.redirect("/chats");
})


//delete chat
app.delete("/chats/:id/delete", async (req, res) => {
  let {id} = req.params;
  let del = await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
})