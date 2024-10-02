const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Custom function to generate numeric short IDs
function generateNumericId() {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit numeric ID
}

const lessonSchema = new Schema({
  _id: {
    type: String,
    default: function() {
      return `LS${generateNumericId()}`; // Prefix with 'LS' and generate numeric ID
    },
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false, // Optional
  },
});

// Export the model
const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;
