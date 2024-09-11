const Lesson = require("../Model/LessonModel");

const getAllLessons = async(req,res,next)=>{

    let Lessons;

    try{
       lessons = await Lesson.find(); 
    }catch (err){
        console.log(err);
    }
    //not found
    if(!lessons){
        return res.status(404).json({message:"Lesson not found"});
    }

    //Display all lessons
    return res.status(200).json({lessons});


};

//data insert
const addLessons = async(req,res,next) =>{

    const {title,date,time,location,description} = req.body;

    let lessons;

    try{
        lessons = new Lesson({title,date,time,location,description});
        await lessons.save();

    }catch(err){
        console.log(err);
    }
    //don't insert lessons
    if(!lessons){
        return res.status(404).json({message:"unable to add lessons"});
    }
    return res.status(200).json({lessons})

};

//Get by Id
const getById = async(req, res,next) => {

    const id = req.params.id;

    let lesson;

    try{
        lesson = await Lesson.findById(id);
    }catch(err){
        console.log(err);
    }
    //not available lessons
    if(!lesson){
        return res.status(404).json({message:"Not found lessons"});
    }
    return res.status(200).json({lesson});
};
//Update lesson details
const updateLesson = async (req, res,next) =>{

    const id = req.params.id;
    const {title,date,time,location,description} = req.body;

    let lessons;

    try{
        lessons = await Lesson.findByIdAndUpdate(id,
            {title: title, date: date, time: time, location: location,description: description});
            lessons = await lessons.save();
    }catch(err){
        console.log(err);
    }

    //not available lessons
    if(!lessons){
        return res.status(404).json({message:"Unable to update lesson"});
    }
    return res.status(200).json({lessons});

};

//delete user details
const deleteLesson = async (req, res, next) =>{
    const id = req.params.id;

    let lesson;
    try{
        lesson = await Lesson.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    if(!lesson){
        return res.status(404).json({message:"Unable to delete lesson"});
    }
    return res.status(200).json({lesson});

}

exports.getAllLessons = getAllLessons;
exports.addLessons = addLessons;
exports.getById = getById;
exports.updateLesson = updateLesson;
exports.deleteLesson = deleteLesson;