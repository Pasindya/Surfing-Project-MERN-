const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//import routes
const router = require("./Route/BookingRoute");

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors());

// Booking routes
app.use("/bookings", router);

// MongoDB connection and server start
mongoose.connect("mongodb+srv://surfdeck:surfdeck1234@cluster0.kcpia.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5005, () => {
      console.log("Server is running on port 5005");
    });
  })
  .catch((err) => console.log(err));
