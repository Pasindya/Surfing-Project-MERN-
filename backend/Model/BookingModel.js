const mongoose = require("mongoose");
const shortid = require("shortid"); // Install this package: npm install shortid

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    bookingId: {
        type: String,
        default: function () {
            return 'BK' + shortid.generate(); // Prefix BK + unique short ID
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
