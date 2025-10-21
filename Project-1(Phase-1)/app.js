const express = require("express");
const app = express(); 
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

//requiring wrapasync
const wrapAsync = require("./utils/wrap.js");
const expressError = require("./utils/expressError.js");


//This one is to add in register
//use to create templates and layouts 
//create a folder of layouts
//boilerplate is a sample code that exists everywhere
const ejsMate = require("ejs-mate");
app.engine('ejs', ejsMate);
//ad this to the page that is same 
//    <%- body %>
//add this to unique content page
//<% layout("./layouts/boilerplate") %>


//now we are requiring joi a package that is use to validate schema i.e sending data from api and missing desc, price
//to check this we have to create many checks so instead of this we use joi that automatically validates it
//Sabse phle joi ki help se hm schema define krte hain jisme hm batate hain ke schema me hamare pas aik object aya hai jisme etc feilds hain
//ye server side validation ke lie tool hai aur hm aik bar isme schema define  krte hain
//check file joiSchema.js
const joischema = require("./joiSchema.js");
//iska hm middleware bhi bana kr use kr skte hain 
const joinValidate = (req, res, next)=>{
  // if(!req.body){
  //       throw new expressError(400, "Please Fill All Feilds");
  // }
  let {error} = joischema.validate(req.body);
  if(error){
    throw new expressError(400, error.message);
  }
  else{
 return next();  
  }
}



main().then(() => {
  console.log("Connection Sucessfull");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const port = 8080;

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static( path.join(__dirname, "public")));

app.use(express.urlencoded({extended : true}));
app.use(express.json());

const methodOverride = require('method-override');
const { wrap } = require("module");
app.use(methodOverride('_method'))



app.listen(port, () => {
 console.log(`You are listening to port ${port}`);
});

app.get("/", (req, res) => {
    res.send("Your are listening to Root");
})

//index route
app.get("/listings", wrapAsync( async(req,res) =>  {
   const alllistings = await Listing.find();
   res.render("listings/index" , {alllistings});
}))


//insert route
app.get("/listings/new",  (req,res) => {
res.render("listings/new")
})
app.post("/listings/",joinValidate, wrapAsync(async (req, res, next) => {
  const newlisting = new Listing(req.body.listing);
  await newlisting.save();
  res.redirect(`/listings`);
}));
//edit route
app.get("/listings/:id/edit", wrapAsync( async(req,res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
res.render("listings/edit" , {listing})
}))
app.put("/listings/:id" ,joinValidate ,wrapAsync( async(req, res) => {
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing})
  res.redirect(`/listings/${id}`);
}))


//delete route
app.delete("/listings/:id", wrapAsync( async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}));

//show route
app.get("/listings/:id", wrapAsync( async(req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show" , {listing})
  }))


  //Other pages responses
app.use((req, res, next) => {
  next(new expressError(404, "Page not found!"));
});


//middleware
app.use((err, req, res, next) => {
const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).json({ success: false, message });
});




  // const acceptsJSON =
  //   req.xhr ||
  //   req.headers.accept?.includes("application/json") ||
  //   req.headers["content-type"] === "application/json" ||
  //   req.originalUrl.startsWith("/api");

  // if (acceptsJSON) {
  //   return res.status(status).json({
  //     success: false,
  //     status,
  //     message,
  //   });
  // }

  // res.status(status).render("error.ejs", { message });