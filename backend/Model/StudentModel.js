const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
   
  name:{
      type:String, //dataType
      required:true, //validate
  },
  
  email:{
    type:String, //dataType
    required:true, //validate
  },

  address: {
    type: String,
    required: true,
  },

  mobileno: {
    type: String, // Changed from Number to String
    required: true,
  },

  password: {

    type: String,
    required: true,

  }


});

module.exports = mongoose.model(
    "StudentModel",
    StudentSchema
);