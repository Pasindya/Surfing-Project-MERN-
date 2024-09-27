const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid"); // Ensure shortid is installed

const planeventSchema = new mongoose.Schema({
    StudentName: {
        type: String, // Data type
        required: true, // Validation
    },
    EventName: {
        type: String, // Data type
        required: true, // Validation
    },
    age: {
        type: Number, // Data type
        required: true, // Validation
    },
    gmail: {
        type: String, // Data type
        required: true, // Validation
    },
    gender: {
        type: String, // Data type
        required: true, // Validation
    }
}, { timestamps: true });

// Export the model

const Planevent = mongoose.model("Planevent", planeventSchema);
module.exports = Planevent;