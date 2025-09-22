//requiring mongoose
const mongoose = require("mongoose");
mongoose.set("bufferCommands", true);

//estavlishing the connection asynchronously
main()
  .then((res) => {
    console.log("Connection Sucessfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

//Creating Schemas

//Method 1
//const userschema = mongoose.Schema({
//  title : String,
//  author : String,
//  price : Number
//});

//Method 2 (recomended when we have constraints)
const bookschema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
    min: { 1: "Price is too Low" },
  },
  discount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: ["fiction", "non-fiction"],
  },
  genre: {
    type: [String],
  },
});

const Book = mongoose.model("Book", bookschema);

let book1 = new Book({
  title: "The Compound Effect",
  author: "Talha Nadeem",
  print: 1200,
});

//book1.save().then((res) => {console.log(res)}).catch((err) => {console.log(err.errors.category.properties.message)});
Book.findByIdAndUpdate("68b88b82114a6cdeac05b846", { price: -1 }, { runValidators: true})
  .then((res) => {
    console.log("Updated:", res);
  })
  .catch((err) => {
    if (err.errors) {
      for (let field in err.errors) {
        console.log(err.errors.price.properties.message);
      }
    } else {
      console.log("Error:", err.message);
    }
  });
