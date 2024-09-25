const express = require("express");
const router = express.Router();

//Insert Model
const Student = require ("../Model/StudentModel");

//Insert Student Controller
const StudentController = require("../Conrollers/StudentControl");

router.get("/",StudentController.getAllStudents);
router.post("/",StudentController.addStudents);
router.get("/:id",StudentController.getById);
router.put("/:id",StudentController.updateStudent);
router.delete("/:id",StudentController.deleteStudent);

//export
module.exports = router;
