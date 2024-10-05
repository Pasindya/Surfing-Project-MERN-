const Planevent = require("../Model/PlaneventModel");

// Display all planevents
const getAllPlanevents = async(req, res, next) => {
    try {
        const planevents = await Planevent.find();
        return res.status(200).json({ planevents });
    } catch (error) {
        console.error("Error fetching planevents:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

const generatePDF = () => {
    const pdf = new jsPDF();

    // Add Title
    pdf.setFontSize(20);
    pdf.text("Events Report", 14, 22);

    // Add Column Headers
    pdf.setFontSize(12);
    pdf.text("Student Name", 14, 40);
    pdf.text("Event Name", 60, 40);

    pdf.text("Email", 130, 40);

    // Add a line for the header
    pdf.line(14, 42, 190, 42); // Start x, Start y, End x, End y

    // Adding data to PDF
    let y = 45; // Start position for data
    filteredEvents.forEach((event) => {
        pdf.text(event.StudentName, 14, y);
        pdf.text(event.EventName, 60, y);

        pdf.text(event.gmail, 130, y);

        y += 10; // Increase y position for next row
    });

    // Save the PDF
    pdf.save("events-report.pdf");
};

// Add a new planevent
const addPlanevents = async(req, res, next) => {
    const { StudentName, EventName, age, gmail, gender } = req.body;

    if (!StudentName || !EventName || !age || !gmail || !gender) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newplanevent = new Planevent({ StudentName, EventName, age, gmail, gender });
        const savedPlanevent = await newplanevent.save();
        return res.status(201).json(savedPlanevent); // Return the saved planevent
    } catch (error) {
        console.error("Error adding planevent:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};

// Get planevent by ID
const getById = async(req, res, next) => {

    try {
        const planevent = await Planevent.findById(req.params.id);
        if (!planevent) {
            return res.status(404).json({ message: "Planevent not found" });
        }
        return res.status(200).json({ planevent });
    } catch (error) {
        console.error("Error fetching planevent:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Update a planevent
const updatePlanevent = async(req, res, next) => {
    const id = req.params.id;
    const { StudentName, EventName, age, gmail, gender } = req.body;

    try {
        const updatedPlanevent = await Planevent.findOneAndUpdate({ _id: id }, { StudentName, EventName, age, gmail, gender }, { new: true, runValidators: true } // `new: true` returns the updated document
        );

        if (!updatedPlanevent) {
            return res.status(404).json({ message: "Unable to update planevent details" });
        }

        return res.status(200).json({ planevent: updatedPlanevent });
    } catch (error) {
        console.error("Error updating planevent:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Delete a planevent
const deletePlanevent = async(req, res, next) => {
    const { id } = req.params;

    try {
        const deletedPlanevent = await Planevent.findOneAndDelete({ _id: id });

        if (!deletedPlanevent) {
            return res.status(404).json({ message: "Unable to delete planevent details" });
        }

        return res.status(200).json({ message: "Planevent deleted successfully" });
    } catch (error) {
        console.error("Error deleting planevent:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Export functions
module.exports.getAllPlanevents = getAllPlanevents;
module.exports.addPlanevents = addPlanevents;
module.exports.getById = getById;
module.exports.updatePlanevent = updatePlanevent;
module.exports.deletePlanevent = deletePlanevent;