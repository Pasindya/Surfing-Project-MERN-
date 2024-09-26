const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import necessary routes
const bookingRouter = require("./Route/BookingRoute");
const lessonRouter = require("./Route/LessonRoute");

const studentRouter = require("./Route/StudentRoute");
const staffRouter = require("./Route/StaffRoute");
const salesRouter = require("./Route/SalesRoute");
const equipmentRouter = require("./Route/equimentRoute"); // Ensure this file exists and is correctly named
const supplierRouter = require("./Route/suplierRoute");
const paymentRouter = require("./Route/PaymentRoute");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/bookings", bookingRouter);
app.use("/lessons", lessonRouter);

app.use("/students", studentRouter);
app.use("/staff", staffRouter);
app.use("/sales", salesRouter);
app.use("/api/equipment", equipmentRouter);
app.use("/api/supplier", supplierRouter);
app.use("/payments",paymentRouter);

// Connect to MongoDB and start server
mongoose.connect("mongodb+srv://surfdeck:surfdeck1234@cluster0.kcpia.mongodb.net/")
    .then(() => console.log("Connected to MongoDB"))
    .then(() => {
        app.listen(5009, () => console.log("Server running on port 5009"));
    })
    .catch((err) => console.log(err));
