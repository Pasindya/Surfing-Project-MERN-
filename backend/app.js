const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookingRouter = require("./Route/BookingRoute");
const lessonRouter = require("./Route/LessonRoute");
 NewPayment
const paymentRouter = require("./Route/PaymentRoute");
const reportRouter = require("./Route/ReportRoute");


const studentRouter = require("./Route/StudentRoute");
const staffRouter = require("./Route/StaffRoute");
const salesRouter = require("./Route/SalesRoute");
const equiment = require("./Route/equimentRoute");
const Sup = require("./Route/suplierRoute");
 main

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/bookings", bookingRouter);
app.use("/lessons", lessonRouter);
 NewPayment
app.use("/payments",paymentRouter);
app.use("/reports", reportRouter);


app.use("/students", studentRouter);
app.use("/staff", staffRouter);
app.use("/sales", salesRouter);
app.use('/api/equiment', equiment);
app.use('/api/suplier', Sup);
app.use("/users", salesRouter);
main

// Connect to MongoDB and start server
mongoose.connect("mongodb+srv://surfdeck:surfdeck1234@cluster0.kcpia.mongodb.net/")
    .then(() => console.log("Connected to MongoDB"))
    .then(() => {
        app.listen(5009, () => console.log("Server running on port 5009"));
    })
    .catch((err) => console.log(err));
