const express = require("express");
const router = express.Router();

// Insert User Controller
const UserController = require("../Conrollers/SalesControl");

// Route for getting all users
router.get("/", UserController.getAllUsers);
//
router.post("/", UserController.addUsers);
//
router.get("/:id", UserController.getById);
//
router.put("/:id", UserController.updateUser);
//Delete
router.delete("/:id", UserController.deleteUser);

// Export the router
module.exports = router;
