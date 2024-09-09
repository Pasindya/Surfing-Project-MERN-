const BookingModel = require("../Model/BookingModel");
const Booking = require("../Model/BookingModel");

const getAllBookings = async (req, res, next) =>{

    let getAllBookings;

    try{
        bookings = await Booking.find();
    }catch (err){
        console.log(err);
    }

    //not found
    if(!bookings){
        return res.status(404).json({message:"BookingModel "})
    }
    //desplayed
    return res.status(200).json({bookings});
                                            
};


//Insert data
const addBookings = async (req, res,next) => {

    const {name,packagename,email,mobileno,address} = req.body;

    let bookings;

    try{
        bookings = new Booking({name,packagename,email,mobileno,address});
        await bookings.save();
    }catch(err){
        console.log(err);
    }

    //not insert bookings

    if(!bookings){
        return res.status(404).json({message:"Unable to add bookings"});
    }
    return res.status(200).json({bookings});
};

//Get by Id
const getById = async (req, res,next) => {

    const id = req.params.id;

    let bookings

    try{
        bookings = await Booking.findById(id);
    }catch (err) {
        console.log(err);
    }

     //not available bookings

     if(!bookings){
        return res.status(404).json({message:"Booking not found"});
    }
    return res.status(200).json({bookings});
   
};

//Update Booking details
const updateBooking = async(req, res, next) => {

    const id = req.params.id;
    const {name,packagename,email,mobileno,address} = req.body;

    let bookings;

    try{
        bookings = await Booking.findByIdAndUpdate(id,
            {name,packagename,email,mobileno,address});
            bookings = await bookings.save();
    }catch(err){
        console.log(err);
    }

    //not available bookings

    if(!bookings){
        return res.status(404).json({message:"Unable to update booking details"});
    }
    return res.status(200).json({bookings});
   
    
};


//Delete booking details

const deleteBooking = async (req, res, next) =>{
 
    const id = req.params.id;

    let booking;

    try{
        booking = await Booking.findByIdAndDelete(id)
    }catch (err){
        console.log(err);
    }

     //not available bookings

     if(!booking){
        return res.status(404).json({message:"Unable to Delete booking details"});
    }
    return res.status(200).json({booking});
   

};

exports.getAllBookings = getAllBookings;
exports.addBookings = addBookings;
exports.getById = getById;
exports.updateBooking = updateBooking;
exports.deleteBooking = deleteBooking;
