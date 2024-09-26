const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    Iname: {
      type: String,
      required: true,
      
    },
    quntity: {
      type: Number,
      required: true,
      
    },
    description: {
      type: String,
      required: true,
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);