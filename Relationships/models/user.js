const mongoose = require('mongoose');
const { Schema } = mongoose;

main()
    .then(() => console.log("Connection Successful"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
    console.log("Connected to MongoDB");
}

const userSchema = new Schema({
    username: String,
    address: [
        {   _id: false,
            location: String,
            city: String
        }
    ]
});

const User = mongoose.model('User', userSchema);

let adduser = async () => {
   let user1 = new User({
        username: "JohnDoe",
        address:   [
            {location: "123 Main St",
            city: "New York" }
        ]
    });
    user1.address.push({location: "456 Elm St", city: "Los Angeles"});
    let result = await user1.save();
    console.log(result);
}

adduser();