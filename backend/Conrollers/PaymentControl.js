const Payment = require("../Model/PaymentModel.js");

// Data display
const getAllPayment = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Data insert
const addPayment = async (req, res) => {
    const { FullName, Email, Mobile, Address, CardType, CardNumber, ExpirationMonth, ExpirationYear, CVV, OfferCode } = req.body;

    try {
        const newPayment = new Payment({ FullName, Email, Mobile, Address, CardType, CardNumber, ExpirationMonth, ExpirationYear, CVV, OfferCode });
        const savedPayment = await newPayment.save();
        return res.status(201).json({ savedPayment });
    } catch (error) {
        console.error("Error saving payment:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Get by ID
const getById = async (req, res) => {
    try {
        const paymentDoc = await Payment.findById(req.params.id);
        if (!paymentDoc) {
            return res.status(404).json({ message: "Payment not found" });
        }
        return res.status(200).json({ payment: paymentDoc });
    } catch (error) {
        console.error("Error fetching payment:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Update payment details
const updatePayment = async (req, res) => {
    const id = req.params.id;
    const { FullName, Email, Mobile, Address } = req.body; // Only update these fields

    try {
        const updatedPayment = await Payment.findByIdAndUpdate(
            id,
            { FullName, Email, Mobile, Address },
            { new: true, runValidators: true }
        );
        
        if (!updatedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        
        return res.status(200).json({ payment: updatedPayment });
    } catch (error) {
        console.error("Error updating payment:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Delete Payment
const deletePayment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPayment = await Payment.findByIdAndDelete(id);
        if (!deletedPayment) {
            return res.status(404).json({ message: "Unable to delete payment details" });
        }
        return res.status(200).json({ message: "Payment deleted successfully", payment: deletedPayment });
    } catch (error) {
        console.error("Error deleting payment:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Search Payment
const searchPayment = async (req, res) => {
    const { searchTerm } = req.query;

    try {
        const payments = await Payment.find({
            $or: [
                { FullName: { $regex: searchTerm, $options: 'i' } },
                { _id: searchTerm }
            ]
        });
        return res.status(200).json(payments);
    } catch (error) {
        console.error("Error searching payment:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getAllPayment,
    addPayment,
    getById,
    updatePayment,
    deletePayment,
    searchPayment
};
