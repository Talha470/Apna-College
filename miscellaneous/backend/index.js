const express = require("express");
const app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.json);

const port= 8080;

app.listen(port , () => {
  console.log(`Listening to ${port} port`);
});

app.get("/register" , (req, res) => {
  let {user, password} = req.query;
  res.send(`Standerd Get response. Welcome ${user }! `);
})
app.post("/register" , (req, res) => {
  let {user , password} = req.body;
  res.send(`Standerd Post response. Welcome ${user}! `);
  console.log(req.body);
})