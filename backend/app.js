const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookingRouter = require("./Route/BookingRoute");
const lessonRouter = require("./Route/LessonRoute");
const planeventRouter = require("./Route/PlaneventRoutes"); // Include this for event routes
const studentRouter = require("./Route/StudentRoute");
const staffRouter = require("./Route/StaffRoute");
const salesRouter = require("./Route/SalesRoute");
const equipmentRouter = require("./Route/equipmentRoute"); // Fixed spelling of 'equipment'
const supplierRouter = require("./Route/supplierRoute"); // Fixed spelling of 'supplier'

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/bookings", bookingRouter);
app.use("/lessons", lessonRouter);
app.use("/planevents", planeventRouter);
app.use("/students", studentRouter);
app.use("/staff", staffRouter);
app.use("/sales", salesRouter);
app.use("/api/equipment", equipmentRouter); // Corrected the endpoint for equipment
app.use("/api/supplier", supplierRouter); // Corrected the endpoint for supplier

// Connect to MongoDB and start server
mongoose.connect("mongodb+srv://surfdeck:surfdeck1234@cluster0.kcpia.mongodb.net/")
    .then(() => console.log("Connected to MongoDB"))
    .then(() => {
        app.listen(5009, () => console.log("Server running on port 5009"));
    })
    .catch((err) => console.log(err));
