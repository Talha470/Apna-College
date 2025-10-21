const express = require("express");
const app = express();
const expressError = require("./expressError");

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
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
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


//async wrap
function asyncWrap(fn){
  return function(req, res, next){
        fn(req, res, next).catch(err => next(err));
  }
}


//Index Route
app.get("/chats" , async (req, res) => {
  try{let  chats = await Chat.find();
   console.log(chats);
   res.render("index", {chats});}
   catch(err){
    next(err);
   }
   
})

//New Chat 
app.get("/chats/new", (req, res) => {
  // throw new expressError(404, "Forbiden");
  res.render("new")
})

app.post("/chats", async(req, res, next) => {
try{
  let {from, to ,msg} = req.body; 
  let newChat = new Chat({
    from : from,
    to : to,
    msg : msg,
    created_at : new Date()
  });
    if (!from || !to || !msg) {
      throw new expressError(400, "All fields (from, to, msg) are required");
    }
  await newChat.save();
 
  res.redirect("/chats");

}catch(err){
  next(err);
}
})


//Show Route
app.get("/chats/:id", asyncWrap( async(req, res, next) => {
  const {id} = req.params;
  let chat = await Chat.findById(id);
  if(!chat){
    next(new expressError(404, "Chat not Found"));
    }
  res.render("edit", {chat}); 
}))

//Edit Chat
app.get("/chats/:id/edit", async (req, res, next) => {
  try {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
      throw new expressError(404, "Chat not Found");
    }

    res.render("edit", { chat });

  } catch (err) {
    next(err);
  }
});

app.put("/chats/:id/edit", async (req, res,next) => {
  try{
 let {id} = req.params;
  let {from, to, msg} = req.body;
  let edited = await Chat.findByIdAndUpdate(id, {
    from,
    to,
    msg,
    updated_at : new Date()
  })
      if (!edited) {
      // Agar id galat hui ya record nahi mila
      throw new expressError(404, "Chat not Found for Editing");
    }
  res.redirect("/chats");
  }catch(err){next(err);}
 
})


//delete chat
app.delete("/chats/:id/delete", async (req, res, next) => {
  try {
    let { id } = req.params;
    let del = await Chat.findByIdAndDelete(id);

    if (!del) {
      throw new expressError(404, "Chat not found or already deleted");
    }

    res.redirect("/chats");
  } catch (err) {
    next(err);
  }
});

//defining error and checking to non async route 
//We throw error from chats/new
//After sucessfull we check now for edit
//For async we use next instead of throw
//for part 2 we use now we use for validation 
//we chnaged the new whole 
//part3 we work on show rouote


//this is part for for mongoose in which we are defininf error
// Helper function
const handleValidationError = (err) => {
  console.log("This is a Validation Error. Please follow rules!");
  console.dir(err);
  return err;
};
app.use((err, req, res, next) => {
 if (err.name === "ValidationError") {
  err = handleValidationError(err);
}
  next(err);
});

app.use((err, req, res, next) => {
  let {status = 500, message = "Some Error is Occured"} = err;
res.status(status).json({
    status,
    message
  });
})