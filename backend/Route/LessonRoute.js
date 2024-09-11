const express = require("express");
const router = express.Router();

//Insert Model
const Lesson = require("../Model/LessonModel");

//Insert user controller
const LessonController = require("../Conrollers/LessonControl");

router.get("/",LessonController.getAllLessons);
router.post("/",LessonController.addLessons);
router.get("/:id",LessonController.getById);
router.put("/:id",LessonController.updateLesson);
router.delete("/:id",LessonController.deleteLesson);

//export
module.exports = router;