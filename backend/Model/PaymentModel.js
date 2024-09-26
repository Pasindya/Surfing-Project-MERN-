const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

const paymentSchema = new Schema({
    _id: {
        type: String,
        default: function() {
            return 'PM' + shortid.generate();
        }
    },
    FullName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Mobile: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    CardType: {
        type: String,
        required: true,
    },
    CardNumber: {
        type: String,
        required: true,
    },
    ExpirationMonth: {
        type: String,
        required: true,
    },
    ExpirationYear: {
        type: String,
        required: true,
    },
    CVV: {
        type: String,
        required: true,
    },
    OfferCode: {
        type: String,
        required: true,
    },
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
