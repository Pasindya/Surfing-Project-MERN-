
const Staff = require("../Model/StaffModel");

const getAllStaff = async (req, res, next) => {
    let staff;
    try {
        staff = await Staff.find();
    } catch (err) {
        console.log(err);
    }
    if (!staff) {
        return res.status(404).json({ message: "Users not found" });
    }
    return res.status(200).json({ staff });
};

// Data Insert
const addStaff = async (req, res, next) => {
    const { name, gmail, age, address, experience, password } = req.body;

    let staff;

    try {
        staff = new Staff({ name, gmail, age, address, experience, password });
        await staff.save();
    } catch (err) {
        console.log(err);
    }

    // If unable to insert staff member
    if (!staff) {
        return res.status(404).json({ message: "Unable to add staff member" });
    }
    return res.status(200).json({ staff });
};

// Get by ID
const getById = async (req, res, next) => {
    const id = req.params.id;
    let staff;

    try {
        staff = await Staff.findById(id);
    } catch (err) {
        console.log(err);
    }

    // If staff member not found
    if (!staff) {
        return res.status(404).json({ message: "Staff member not found" });
    }
    return res.status(200).json({ staff });
};

// Update staff member
const updateStaff = async (req, res, next) => {
    const id = req.params.id;
    const { name, gmail, age, address, experience, password } = req.body;
    let staff;

    try {
        staff = await Staff.findByIdAndUpdate(id, {
            name,
            gmail,
            age,
            address,
            experience,
            password,
        });
        staff = await staff.save();
    } catch (err) {
        console.log(err);
    }

    // If unable to update staff member details
    if (!staff) {
        return res.status(404).json({ message: "Unable to update staff member details" });
    }
    return res.status(200).json({ staff });
};

   //Delete staff memeber details 
   const deleteStaff = async (req,res,next) => {
    const id = req.params.id;

    let staff;

    try{
        staff = await Staff.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
    }
    //unable to delete
    if (!staff) {
        return res.status(404).json({ message: "Unable to delete staff member details" });
    }
    return res.status(200).json({ staff });
   }

// Corrected export
exports.getAllStaff = getAllStaff;
exports.addStaff = addStaff;
exports.getById = getById;
exports.updateStaff = updateStaff;
exports.deleteStaff = deleteStaff;
  
