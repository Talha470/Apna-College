const express = require("express");
const expressError = require("./expressError");
const app = express();

app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
  console.log("server is listening to port 8080");
})

app.use( (req, res, next) => {
  req.time= new Date(Date.now()).toDateString();
  console.log(req.time);
    console.log("🔹 Method:", req.method);
  console.log("🔹 Path:", req.path);
  console.log("🔹 Query:", req.query);
  console.log("🔹 Params:", req.params);
  console.log("🔹 IP:", req.ip);
  console.log("🔹 Headers:", req.headers);
  console.log("🔹 Time:", req.time);

  res.send("Request info logged ✅");
  return next();
})


// the check middleware is returning next without parameter so it ll search for non-error-handling middleware
//And the next error middleware where it passed displaying error object


const chk = ((req, res, next) => {
  let {tokenn} = req.query;
  if (tokenn == "giveaccess"){
  return next();
  }else{
throw new expressError(401, "Access Denied");}
})

app.get('/token', chk, (req, res) => {
  res.send("You have access to token route");
})






const check = ((req, res, next) => {
  let {token} = req.query;
  if(token === "giveaccess"){
  return next();
  }
  throw new expressError(401, "Access Denied");
 })
 
 app.get('/api',check, (req, res) => {
   res.send("Data");
 })

//app.use((err, req, res, next) => {
//  console.log("----Error----");
//  res.send(err);
//})

app.get('/', (req, res) => {
  res.send("Hi i am a root user");
})

//In this case when error occur it ll display invalid status code because the error-handling-middle-ware
//extracting status ,messege from err and sending it
app.use(("/err"),check, (req, res) => {
  abcd =abcd;
})

//Here we can also extract err for more infrmation so that object will not be display
app.use((err, req, res, next) => {
  let{status = 500, message = "Some error occur"} = err;
  res.status(status).send(message);
})

