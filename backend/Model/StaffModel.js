//Model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require('shortid'); // Import shortid

const staffSchema = new Schema({
    _id: {
        type: String,
        default: function () {
            return 'STM-' + shortid.generate(); // Prefix + unique ID
        }
    },
    name: {
        type: String,
        required: true,
       
    },
    gmail: {
        type: String,
        required: true,
      
    },
    age: {
        type: Number,
        required: true,
      
    },
    address: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
        
    },
    password: {
        type: String,
        required: true,
       
    },
    nic: {
        type: String,
        required: true,
        
    },
    salary: {
        type: Number,
        required: true,
       
    },
    designation: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("StaffModel", staffSchema);
