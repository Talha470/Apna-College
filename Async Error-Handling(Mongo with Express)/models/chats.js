const mongoose = require('mongoose');

const chatschema = mongoose.Schema({
  from : {
    type : String,
    required : true
  },
  to : {
    type : String,
    required : true
  },
  msg : {
    type : String,
    maxLenght : 50
  },
  created_at : {
    type : Date,
    required : true
  },
  updated_at : {
    type : Date,
  }
});

const Chat = mongoose.model("Chat", chatschema);

module.exports= Chat;