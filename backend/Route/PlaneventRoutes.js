const express = require("express");
const planeventRouter = express.Router();

//Insert Planevent Controller
const PlaneventController = require("../Conrollers/PlaneventController");

planeventRouter.get("/", PlaneventController.getAllPlanevents);
planeventRouter.post("/", PlaneventController.addPlanevents);
planeventRouter.get("/:id", PlaneventController.getById);
planeventRouter.put("/:id", PlaneventController.updatePlanevent);
planeventRouter.delete("/:id", PlaneventController.deletePlanevent);

//export
module.exports = planeventRouter;