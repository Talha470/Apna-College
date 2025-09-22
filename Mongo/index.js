//requiring mongoose
const mongoose = require('mongoose');
mongoose.set('bufferCommands', true);

//estavlishing the connection asynchronously
main().then((res) => {console.log("Connection Sucessfull");}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

//creating class for schemas
const userschema = mongoose.Schema({
    name : String,
    email : String,
    age : Number
});

//Creating model, We pass 2 arguments "name of collection", "user schema"
const User = mongoose.model("User", userschema);

//Inserting One user at a time
const user2 = new User({
  name : "Taha ",
  email : "tahanadeem470@gmail.com",
  age : 21
});
user2.save()
.then((res) => {console.log(res)
})
.catch((err) => {console.log(err);});

//Inserting Multiple 
User.insertMany([
  { name: "Talha Nadeem", email: "talha@example.com", age: 22 },
  { name: "Sara Khan", email: "sara.khan@example.com", age: 25 },
  { name: "Ahmed Raza", email: "ahmed.raza@example.com", age: 19 },
  { name: "Hassan Ali", email: "hassan.ali@example.com", age: 28 },
  { name: "Ayesha Noor", email: "ayesha.noor@example.com", age: 21 },
  { name: "Usman Tariq", email: "usman.tariq@example.com", age: 24 },
  { name: "Fatima Malik", email: "fatima.malik@example.com", age: 23 },
  { name: "Zain Abbas", email: "zain.abbas@example.com", age: 27 },
  { name: "Hiba Zafar", email: "hiba.zafar@example.com", age: 20 },
  { name: "Omar Farooq", email: "omar.farooq@example.com", age: 26 }
])
.then((res) => {console.log(res)
})
.catch((err) => {console.log(err);});

//Finding In Mongoose
User.find({ age : {$gt : 20}}).then((res) => {console.log(res)}).catch((err) => {console.log(err)});
User.findOne({ age : {$gt : 20}}).then((res) => {console.log(res)}).catch((err) => {console.log(err)});
User.findById("6867575c5440b0945a270a6a").then((res) => {console.log(res)}).catch((err) => {console.log(err)});

//Updating Documents
User.updateOne({ name : "Sara Khan"}, {age : 30}).then((res) => {console.log(res)}).catch((err) => {console.log(err)});
User.updateMany({ age : {$gt : 20}}, {age : 55}).then((res) => {console.log(res)}).catch((err) => {console.log(err)});

//here we get old value which is printed first and dont get updated value, to avoid this we use {new : true }
User.findOneAndUpdate({name : "Sara Khan"}, {age : 10}).then((res) => {console.log(res)}).catch((err) => {console.log(err)});
User.findOneAndUpdate({name : "Sara Khan"}, {age : 10}, {new : true }).then((res) => {console.log(res)}).catch((err) => {console.log(err)});
User.findByIdAndUpdate("6867575c5440b0945a270a6a", {age : 10}, {new : true }).then((res) => {console.log(res)}).catch((err) => {console.log(err)});

//Deleting in Mongoose
//User.deleteOne({name : "Sara Khan"}).then((res) => {console.log(res)}).catch((err) => {console.log(err)});
//User.deleteMany({age : {$gte : 25}}).then((res) => {console.log(res)}).catch((err) => {console.log(err)});