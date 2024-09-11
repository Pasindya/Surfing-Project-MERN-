const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

const lessonSchema = new Schema({
  _id: {
    type: String,
    default: function() {
      return `LS${shortid.generate()}`;
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
