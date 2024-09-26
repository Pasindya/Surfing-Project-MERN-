const User = require("../Model/SalesModel");

const getAllUsers = async (req, res, next) => {

    let Users;

    try{
        users = await User.find();
    }catch (err) {
        console.log(err);
    }
    //not found
    if(!users){
        return res.status(404).json({message:"User not found"});
    }
    //Display
    return res.status(200).json({ users });
};

//data Insert
const addUsers = async (req, res, next) =>{
    const {cnumber,mmyy,cvc,name,address,email,pnumber} = req.body;

    let users;

    try{
     users = new User({cnumber,mmyy,cvc,name,address,email,pnumber});
     await users.save();
    }catch (err){
     console.log(err);

    }
    //not insert users
    if(!users){
     return res.status(404).json({message:"unable to add users"});
    }
    return res.status(200).json({ users });
};

//Get by Id
const getById = async (req, res, next) => {

    const id = req.params.id;

    let users

    try{
        users = await User.findById(id);
    }catch (err) {
        console.log(err);
    }
     //not available users
    if(!users){
        return res.status(404).json({message:"User Not found"});
    }
       return res.status(200).json({ users });

};

//Update User Details
const updateUser = async (req, res, next) =>{
    const id = req.params.id;
    const {cnumber,mmyy,cvc,name,address,email,pnumber} = req.body;

    let users;

    try{
        users = await User.findByIdAndUpdate(id, {cnumber:cnumber,mmyy:mmyy,cvc:cvc,name:name,address:address,email:email,pnumber:pnumber});
        users = await users.save();
    }catch(err) {
        console.log(err);
    }
     //not updete users
     if(!users){
        return res.status(404).json({message:"unable to Update user "});
       }
       return res.status(200).json({ users });
};

//Delete User 
const deleteUser =async (req, res, next) =>{
    const id = req.params.id;

    let user;

    try{
        user = await User.findByIdAndDelete(id)
    }catch (err){
        console.log(err);
    }
     //not Delete users
     if(!user){
        return res.status(404).json({message:"unable to Delete user "});
       }
       return res.status(200).json({ user });
};

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;

