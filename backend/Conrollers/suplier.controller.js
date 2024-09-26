const Order = require("../Model/order.model.js");
const Suplier = require("../Model/suplier.model.js");




//create suplier
 const createsuplier = async (req, res, next) => {
  

  const {  name, contact,Address,SItems } = req.body;

  const newSuplier = new Suplier({
    contact,
    name,
    SItems,
    Address,
   
    

  });
  try {
    const savedsup = await newSuplier.save();
    res.status(201).json(savedsup);
  } catch (error) {
    next(error);
  }
};




//get all suplier
const getAllsuplier = async (req, res, next) => {
  try {
    const suplier = await Suplier.find();

    if (suplier.length > 0) {
      res.json({ message: "suplier detail retrieved successfully", suplier});
    } 
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};



//delete suplier
const deletesuplier = async (req, res, next) => {

  try {
    await Suplier.findByIdAndDelete(req.params.supId);
    res.status(200).json("The Suplier has been deleted");
  } catch (error) {
    next(error);
  }
};



//update suplier
const updatesuplier = async (req, res, next) => {
 
  try {
    const updatesuplier = await Suplier.findByIdAndUpdate(
      req.params.suplierId,
      {
        $set: {
         
        
          name: req.body.name,
          contact: req.body.contact,
          Address: req.body.Address,
          SItems: req.body.SItems,
        },
      },
      { new: true }
    );
    res.status(200).json(updatesuplier);
  } catch (error) {
    next(error);
  }
};


//create Order
const createorder = async (req, res, next) => {
  

    const {  Iname, description,quntity, } = req.body;
  
    const newOrder = new Order({
      Iname,
      description,
      quntity,
     
     
      
  
    });
    try {
      const savedorder = await newOrder.save();
      res.status(201).json(savedorder);
    } catch (error) {
      next(error);
    }
  };

 

  exports.createsuplier = createsuplier;
exports.getAllsuplier = getAllsuplier;
exports.deletesuplier = deletesuplier;
exports.updatesuplier = updatesuplier;
exports.createorder = createorder;