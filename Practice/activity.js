const express = require("express");
const expressError = require("./expressError");
const app = express();


app.listen(8080, () => {
  console.log("server is listening to port 8080");
})


app.get(("/admin" ), (req, res) => {
  throw new expressError(403, "ACCESS IS FORBIDEN!");
})

// app.use((err, req, res, next) => {
//   let{status = 500, message = "Some Error Occur!"} = err;
//   res.status(status).send(message);

// })