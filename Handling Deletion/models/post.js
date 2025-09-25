const mongoose = require('mongoose');
const { Schema } = mongoose;

main()
    .then(() => console.log("Connection Successful"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
    console.log("Connected to MongoDB");
}

// ----- User Schema -----
const userSchema = new Schema({
    username: String,
    email: String
});

// ----- Post Schema -----
const postSchema = new Schema({
    title: String,
    content: String,
    user: { type: Schema.Types.ObjectId, ref: "User" }   // Reference to User
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

// ----- Add Data -----
const addData = async () => {
    // let user1 = new User({
    //     username: "JohnDoe",
    //     email: "john@gmail.com"
    // });
    let user = await User.findOne({ username: "JohnDoe" });
    // let post1 = new Post({
    //     title: "My First Post",
    //     content: "This is the content of my first post.",
    // });
    let post2 = new Post({
        title: "My 2nd Post",
        content: "This is the content of my first post.",
    });

    // Reference user
    post2.user = user._id;

    await user.save();
    let result = await post2.save();
    console.log(result);
};

const getData = async () => {
    let data = await Post.findOne({})
 
    .populate("user")  // Populate user details
    console.log(data);
}
getData();