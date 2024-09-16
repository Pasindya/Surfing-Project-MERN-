const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookingRouter = require("./Route/BookingRoute");
const lessonRouter = require("./Route/LessonRoute");
const staffRouter = require("./Route/StaffRoute");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/bookings", bookingRouter);
app.use("/lessons", lessonRouter);
app.use("/staff", staffRouter);

mongoose.connect("mongodb+srv://surfdeck:surfdeck1234@cluster0.kcpia.mongodb.net/")
    .then(() => console.log("Connected to MongoDB"))
    .then(() => {
        app.listen(5009, () => console.log("Server running on port 5009"));
    })
    .catch((err) => console.log(err));
