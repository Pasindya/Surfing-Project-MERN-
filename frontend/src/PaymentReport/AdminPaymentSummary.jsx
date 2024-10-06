import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '/images/logo.png'; // Ensure the logo path is correct

const AdminPaymentSummary = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [formData, setFormData] = useState({
    Status: '',
    TotalAmount: '',
  });

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

  useEffect(() => {
    const results = payments.filter(payment =>
      payment._id.includes(searchTerm) || payment.FullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPayments(results);
  }, [searchTerm, payments]);

  const handleUpdateClick = (payment) => {
    setSelectedPayment(payment);
    setFormData({
      Status: payment.Status || '',
      TotalAmount: payment.TotalAmount
    });
  };

  const handleDeleteClick = async (paymentId) => {
    try {
      const response = await fetch(`http://localhost:5009/payments/${paymentId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setPayments(payments.filter(payment => payment._id !== paymentId));
        setFilteredPayments(filteredPayments.filter(payment => payment._id !== paymentId));
      } else {
        console.error("Error deleting payment:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5009/payments/${selectedPayment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedPayment = await response.json();
        setPayments(prevPayments =>
          prevPayments.map(payment =>
            payment._id === updatedPayment.payment._id ? updatedPayment.payment : payment
          )
        );
        setSelectedPayment(null);
        setFormData({ Status: '', TotalAmount: '' });
      } else {
        const errorText = await response.text();
        console.error("Error updating payment:", errorText);
      }
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF('l', 'pt', 'a4'); // 'l' for landscape

    doc.addImage(logo, 'PNG', 10, 10, 30, 30); // Adjust the path and size if necessary
    doc.setFontSize(16);
    doc.text('SurfDeck', 50, 20); // Company name
    doc.setFontSize(12);
    doc.text('123 Surf Lane, Beach City, CA', 50, 40); // Company address

    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString(); // Get the current time
    const dateWidth = doc.getTextWidth(currentDate);
    const timeWidth = doc.getTextWidth(currentTime);
    const dateXOffset = doc.internal.pageSize.width - dateWidth - timeWidth - 60; // Position on the right

    doc.setFontSize(12);
    doc.text(`Date: ${currentDate}`, dateXOffset, 20); // Position on the right
    doc.text(`Time: ${currentTime}`, dateXOffset, 40); // Position time below date

    // Add company email and mobile number
    doc.text('Email: info@surfdeck.com', 50, 60);
    doc.text('Mobile: +123 456 7890', 50, 80);

    doc.setFontSize(20);
    const title = "Payment Summary";
    const titleWidth = doc.getTextWidth(title);
    const titleXOffset = (doc.internal.pageSize.width - titleWidth) / 2; // Center the title
    doc.text(title, titleXOffset, 100);

    doc.autoTable({
      head: [['Payment ID', 'Full Name', 'Email', 'Mobile', 'Address', 'Total Amount', 'Status']],
      body: filteredPayments.map(payment => [
        payment._id,
        payment.FullName,
        payment.Email,
        payment.Mobile,
        payment.Address,
        payment.TotalAmount,
        payment.Status || 'Pending',
      ]),
      startY: 110, // Start the table below the title
      styles: {
        cellPadding: 5,
        fontSize: 10,
        valign: 'middle',
        halign: 'center',
        overflow: 'linebreak',
      },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 150 },
        2: { cellWidth: 150 },
        3: { cellWidth: 100 },
        4: { cellWidth: 150 },
        5: { cellWidth: 80 },
        6: { cellWidth: 90 },
      },
      margin: { horizontal: 15 },
    });

    // Add financial manager signature
    doc.setFont('courier', 'italic'); // Set font to italic for signature
    doc.setFontSize(14);
    const signatureText = 'Ayanima Hettiarachchi';
    const positionTitle = 'Financial Manager';

    const signatureWidth = doc.getTextWidth(signatureText);
    const pageWidth = doc.internal.pageSize.getWidth();
    const signatureXOffset = (pageWidth - signatureWidth) / 2; // Center the signature
    doc.text(signatureText, signatureXOffset, doc.internal.pageSize.getHeight() - 60);

    // Underline the signature
    doc.setLineWidth(0.5);
    doc.line(signatureXOffset, doc.internal.pageSize.getHeight() - 55, signatureXOffset + signatureWidth, doc.internal.pageSize.getHeight() - 55);

    // Position title
    doc.setFont('helvetica', 'normal');
    const positionWidth = doc.getTextWidth(positionTitle);
    const positionXOffset = (pageWidth - positionWidth) / 2; 
    doc.text(positionTitle, positionXOffset, doc.internal.pageSize.getHeight() - 40);

    doc.save('payment_summary.pdf');
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-gray-100"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1502933691298-84fc14542831?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="p-10 bg-white/70 border-2 border-white/50 shadow-5xl rounded-3xl max-w-9xl mx-auto my-12 transition-all duration-500">
        <h2 className="text-4xl md:text-5xl font-bold text-center my-6 text-black drop-shadow-lg">
          Admin Payment Summary
        </h2>

        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Payment ID or Name"
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="mt-10">
          <table className="min-w-full bg-white/75 border border-gray-500 table-auto">
            <thead>
              <tr>
                <th className="border px-6 py-4">Payment ID</th>
                <th className="border px-6 py-4">Full Name</th>
                <th className="border px-6 py-4">Email</th>
                <th className="border px-6 py-4">Mobile</th>
                <th className="border px-6 py-4">Address</th>
                <th className="border px-6 py-4">Total Amount(USD $)</th>
                <th className="border px-6 py-4">Status</th>
                <th className="border px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(payment => (
                <tr key={payment._id}>
                  <td className="border px-6 py-4">{payment._id}</td>
                  <td className="border px-6 py-4">{payment.FullName}</td>
                  <td className="border px-6 py-4">{payment.Email}</td>
                  <td className="border px-6 py-4">{payment.Mobile}</td>
                  <td className="border px-6 py-4">{payment.Address}</td>
                  <td className="border px-6 py-4">{payment.TotalAmount}</td>
                  <td className="border px-6 py-4">{payment.Status || 'Pending'}</td>
                  <td className="border px-6 py-4">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => handleUpdateClick(payment)}>Edit</button>
                    <button className="text-red-500 hover:text-red-700 ml-2" onClick={() => handleDeleteClick(payment._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={downloadPDF}
          className="mt-8 bg-blue-600 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded"
        >
          Download PDF
        </button>

        

        {selectedPayment && (
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Update Payment</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <input
                  type="text"
                  name="Status"
                  value={formData.Status}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Total Amount</label>
                <input
                  type="number"
                  name="TotalAmount"
                  value={formData.TotalAmount}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Update Payment
              </button>
              <button
                type="button"
                onClick={() => setSelectedPayment(null)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPaymentSummary;
