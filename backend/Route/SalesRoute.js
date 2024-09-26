const express = require("express");
const router = express.Router();

// Insert User Controller
const User = require("../Model/SalesModel");
const SalesControl = require("../Conrollers/SalesControl");

// Route for getting all users
router.get("/", SalesControl.getAllUsers);
//
router.post("/", SalesControl.addUsers);
//
router.get("/:id", SalesControl.getById);
//
router.put("/:id", SalesControl.updateUser);
//Delete
router.delete("/:id", SalesControl.deleteUser);

// Export the router
module.exports = router;
