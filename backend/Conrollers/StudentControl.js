const Student =require("../Model/StudentModel");

const getAllStudents = async(req, res, next) =>{

    let getAllStudents;

    try{
         students = await Student.find();

    }catch(err){
        console.log(err);
    }

    //not found
    if(!students){
        return res.status(404).json({message:"Users not found "});
    }

    //displayed
    return res.status(200).json({students});
                                            
};


//Insert data
const addStudents = async (req, res,next) => {

    const {name,email,address,mobileno,password} = req.body;

    let students;

    try{
        students = new Student({name,email,address,mobileno,password});
        await students.save();

    }catch(err){
        console.log(err);
    }

    //not insert students

    if(!students){
        return res.status(404).json({message:"Unable to add student"});
    }
    return res.status(200).json({students});
};


//Get by Id
const getById = async (req, res,next) => {

    const id = req.params.id;

    let students;

    try{
        students = await Student.findById(id);
    }catch (err) {
        console.log(err);
    }

     //not available students

     if(!students){
        return res.status(404).json({message:"Students not found"});
    }
    return res.status(200).json({students});
   
};


//Update student details
const updateStudent = async (req, res,next) =>{

    const id = req.params.id;
    const {name,email,address,mobileno,password} = req.body;

    let lessons;

    try{
        students = await Student.findByIdAndUpdate(id,
            {name:name,emai:email,address:address,mobileno:mobileno,password:password});
            students = await students.save();
    }catch(err){
        console.log(err);
    }

    //not available students
    if(!students){
        return res.status(404).json({message:"Unable to update student"});
    }
    return res.status(200).json({students});

};

//Delete student details

const deleteStudent = async (req, res, next) =>{
 
    const id = req.params.id;

    let student;

    try{
        student = await Student.findByIdAndDelete(id)
    }catch (err){
        console.log(err);
    }

     //not available bookings

     if(!student){
        return res.status(404).json({message:"Unable to Delete student details"});
    }
    return res.status(200).json({student});
   

};


exports.getAllStudents = getAllStudents;
exports.addStudents =addStudents;
exports.getById = getById;
exports.updateStudent = updateStudent;
exports.deleteStudent = deleteStudent;