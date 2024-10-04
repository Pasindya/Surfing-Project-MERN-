const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const generateShortId = () => {
    // Generate a random number between 10000 and 99999
    const randomNum = Math.floor(10000 + Math.random() * 90000); 
    return 'BK' + randomNum; // Prefix + 5-digit unique ID
};

const bookingSchema = new Schema({
    _id: {
        type: String,
        default: generateShortId // Use the custom function to generate the ID
    },
    name: {
        type: String,
        required: true,
    },
    packagename: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobileno: {
        type: String, // Changed from Number to String
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Booking", bookingSchema);
