const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid"); // You need to install shortid

const bookingSchema = new Schema({
    _id: {
        type: String,
        default: function () {
            return 'BK' + shortid.generate(); // Prefix + unique ID
        }
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