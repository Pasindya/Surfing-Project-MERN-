const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const suplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      
    },
    contact: {
      type: Number,
      required: true,
      
    },
    Address: {
      type: String,
      required: true,
    },
    SItems: {
      type: String,
      required: true,
     
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Suplier", suplierSchema);