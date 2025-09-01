const express = require("express");
const app = express();
let port = 8080;
app.listen(port, () => {
  console.log(`App is listening port ${port}`);
});
//app.use((req, res) => {
//  console.log("Request recieved");
//  res.send({
//    name : "Talha",
//    color : "Fair"
//  })
//}); 
app.get('/' , (req, res) => {
  res.send("you cntacted root path");
} );


//query string
app.get('/search', (req, res)=>{
  console.log(req.query);
  let {q} = req.query;
  res.send(`Search for $  {q}`);
})


app.get('/:username' , (req, res) => {
  let {username} = req.params;
  res.send(`hey user ${username}`);
} );
