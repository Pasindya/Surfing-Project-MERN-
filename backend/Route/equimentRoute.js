const express = require("express");
const router = express.Router();

// Insert User Controller
const EquipmentController = require("../Conrollers/equipment.controller");

router.post('/Ecreate',EquipmentController.createequiment);
router.get('/getAll',EquipmentController.getAllequiment);
router.put('/Euip/:EEId',EquipmentController.updateequiment);
router.delete('/deleteEuip/:EId',EquipmentController.deleteequiment);

// Export the router
module.exports = router;
