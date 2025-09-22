const express = require("express");
const expressError = require("./expressError");
const app = express();


app.listen(8080, () => {
  console.log("server is listening to port 8080");
})

// the check middleware is returning next without parameter so it ll search for non-error-handling middleware
//And the next error middleware where it passed displaying error object
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

//In this case when error occur it ll display invalid status code because the error-handling-middle-ware
//extracting status ,messege from err and sending it
app.use(("/err"), (req, res) => {
  abcd =abcd;
})

//Here we can also extract err for more infrmation so that object will not be display
app.use((err, req, res, next) => {
  let{status = 500, message = "Some error occur"} = err;
  res.status(status).send(message);
})

