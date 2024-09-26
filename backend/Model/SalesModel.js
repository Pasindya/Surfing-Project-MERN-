const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
    cnumber: {
        type: Number,
        required: true // This field is required
    },
    mmyy: {
        type: String,
        required: true // This field is required
    },
    cvc: {
        type: String,
        required: true // This field is required
    },
    name: {
        type: String,
        required: true // This field is required
    },
    address: {
        type: String,
        required: true // This field is required
    },
    email: {
        type: String,
        required: true // This field is required
    },
    pnumber: {
        type: Number,
        required: true // This field is required
    }
});

// Export the model
module.exports = mongoose.model("SalesModel", userSchema);
