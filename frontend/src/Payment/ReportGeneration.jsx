import React, { useEffect, useState } from 'react';
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';
import jsPDF from 'jspdf';

const ReportGeneration = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:5009/payments');
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  const handlePaymentChange = (e) => {
    const paymentId = e.target.value;
    setSelectedPaymentId(paymentId);
    
    // Find the corresponding payment based on selected ID
    const payment = payments.find(payment => payment._id === paymentId);
    setSelectedPayment(payment);
  };

  const generatePDF = () => {
    if (!selectedPayment) return;

    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Payment Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Payment ID: ${selectedPayment._id}`, 20, 40);
    doc.text(`Full Name: ${selectedPayment.FullName}`, 20, 50);
    doc.text(`Email: ${selectedPayment.Email}`, 20, 60);
    doc.text(`Mobile: ${selectedPayment.Mobile}`, 20, 70);
    doc.text(`Address: ${selectedPayment.Address}`, 20, 80);
    
    // Save the PDF
    doc.save(`Payment_Report_${selectedPayment._id}.pdf`);
  };

  return (
    <div 
      className="min-h-screen flex flex-col" 
      style={{
        backgroundImage: 'url("/images/beach2.jpg")', // Update with the correct path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Headernav />
      
      <div className="p-10 bg-white/60 border-2 border-white/30 shadow-2xl rounded-3xl max-w-8xl mx-auto my-16">
        <h2 className="text-4xl md:text-5xl font-bold text-center my-6 text-black drop-shadow-lg">
          Report Generation
        </h2>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Select Payment ID</label>
          <select
            value={selectedPaymentId}
            onChange={handlePaymentChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Payment ID</option>
            {payments.map(payment => (
              <option key={payment._id} value={payment._id}>
                {payment._id} - {payment.FullName}
              </option>
            ))}
          </select>
        </div>

        {selectedPayment && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold">Selected Payment Details:</h3>
            <p><strong>Full Name:</strong> {selectedPayment.FullName}</p>
            <p><strong>Email:</strong> {selectedPayment.Email}</p>
            <p><strong>Mobile:</strong> {selectedPayment.Mobile}</p>
            <p><strong>Address:</strong> {selectedPayment.Address}</p>
            <button
              onClick={generatePDF}
              className="mt-4 bg-green-800 text-white px-4 py-2 rounded"
            >
              Generate PDF Report
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ReportGeneration;
