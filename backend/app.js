const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookingRouter = require("./Route/BookingRoute");
const lessonRouter = require("./Route/LessonRoute");
 register
const studentRouter =require("./Route/StudentRoute");

const staffRouter = require("./Route/StaffRoute");
const salesRouter = require("./Route/SalesRoute");
 main

const app = express();


// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/bookings", bookingRouter);
app.use("/lessons", lessonRouter);
register
app.use("/students",studentRouter);

app.use("/staff", staffRouter);
app.use("/sales",salesRouter);
 main

mongoose.connect("mongodb+srv://surfdeck:surfdeck1234@cluster0.kcpia.mongodb.net/")
    .then(() => console.log("Connected to MongoDB"))
    .then(() => {
        app.listen(5009, () => console.log("Server running on port 5009"));
    })
    .catch((err) => console.log(err));
