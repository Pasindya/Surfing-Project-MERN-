const express = require("express");
const router = express.Router();

// Insert User Controller
const SupplierController = require("../Conrollers/suplier.controller");

router.post('/Pcreate',SupplierController.createsuplier );
router.get('/getAll', SupplierController.getAllsuplier);
router.put('/sup/:suplierId',SupplierController.updatesuplier);
router.delete('/deletesup/:supId',SupplierController.deletesuplier);
router.post('/Ocreate',SupplierController.createorder );

// Export the router
module.exports = router;