const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    bookingId: {
        type: String,
        default: function () {
            return 'BK' + Math.floor(Math.random() * 1000000); // Prefix BK + random number for uniqueness
        },
        unique: true // Ensure it's unique
    },
    name: {
        type: String,
        required: true
    },
    packagename: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileno: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Booking", bookingSchema);
