const express = require("express");
const router = express.Router();

//Inster Model
const Booking = require ("../Model/BookingModel");

//Insert Booking controller
const BoookingController = require("../Conrollers/BookingControl");

router.get("/",BoookingController.getAllBookings);
router.post("/",BoookingController.addBookings);
router.get("/:id",BoookingController.getById);
router.put("/:id",BoookingController.updateBooking);
router.delete("/:id",BoookingController.deleteBooking);

//export
module.exports= router;