const express = require("express");
const app =  express();

//every single request is accesing this middlewaare 
//app.use( (req, res, next) => {
//  console.log("Hi, I m middleware");
//  //res.send("Middleware Finished")
//  next();
//})


//creating utility middleware

//app.use((req,res,next) => {
//  req.time = new Date (Date.now()).toDateString();
//  console.log(req.method, req.hostname, req.ip, req.time);
//  return next();
//})

//creating api token
app.use("/api" , (req, res, next) => {
  let {token} = req.query;
  if(token === "giveaccess"){
    return next();
  }
  res.send("Access Denied!")
})
app.get("/api", (req,res) => {
  res.send("data");
})

app.listen(8080, () => {
  console.log("server is listening to port 8080");
})

app.get('/', (req, res) => {
  res.send("Hi, I m root");
})

app.get('/random', (req, res) => {
  res.send("Hi, this is random");
})
