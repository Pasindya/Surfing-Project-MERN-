const express = require("express");
const paymentRouter = express.Router();

// Insert payment controller
const PaymentControl = require("../Conrollers/PaymentControl");


paymentRouter.get("/",PaymentControl.getAllPayment);
paymentRouter.post("/",PaymentControl.addPayment);
paymentRouter.get("/:id",PaymentControl.getById);
paymentRouter.put("/:id",PaymentControl.updatePayment);
paymentRouter.delete("/:id",PaymentControl.deletePayment);
paymentRouter.get('/payments/search', PaymentControl.searchPayment); // Add this route for searching payments




//export
module.exports = paymentRouter;

