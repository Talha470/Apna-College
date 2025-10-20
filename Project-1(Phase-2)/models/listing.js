const mongoose = require("mongoose");

const listingschema = new mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  description : String,
  image : {
    default : "https://tse2.mm.bing.net/th/id/OIP.bFZMFrm1utlDquUvt7_P2AHaFj?cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3",
    type : String,
    set : (v) => v === "" ? "https://tse2.mm.bing.net/th/id/OIP.bFZMFrm1utlDquUvt7_P2AHaFj?cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3" : v
  },
  location : String,
  country : String,
  price: { type: Number, required: true }
})

const Listing = mongoose.model("Listing", listingschema);
module.exports = Listing;