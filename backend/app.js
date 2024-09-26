const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookingRouter = require("./Route/BookingRoute");
const lessonRouter = require("./Route/LessonRoute");

const studentRouter =require("./Route/StudentRoute");

const staffRouter = require("./Route/StaffRoute");
const salesRouter = require("./Route/SalesRoute");
const equiment = require("./Route/equimentRoute");
const Sup = require("./Route/suplierRoute");


const app = express();


// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/bookings", bookingRouter);
app.use("/lessons", lessonRouter);

app.use("/students",studentRouter);

app.use("/staff", staffRouter);
 sup
app.use("/sales",salesRouter);
app.use('/api/equiment', equiment);
app.use('/api/suplier', Sup);

app.use("/users",salesRouter);

 main

mongoose.connect("mongodb+srv://surfdeck:surfdeck1234@cluster0.kcpia.mongodb.net/")
    .then(() => console.log("Connected to MongoDB"))
    .then(() => {
        app.listen(5009, () => console.log("Server running on port 5009"));
    })
    .catch((err) => console.log(err));
