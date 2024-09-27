import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';

const PaymentSummary = () => {
  const location = useLocation();
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    Mobile: '',
    Address: ''
  });
  const navigate = useNavigate(); // Add navigate

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
      payment._id.includes(searchTerm)
    );
    setFilteredPayments(results);
  }, [searchTerm, payments]);

  const handleUpdateClick = (payment) => {
    setSelectedPayment(payment);
    setFormData({
      FullName: payment.FullName,
      Email: payment.Email,
      Mobile: payment.Mobile,
      Address: payment.Address
    });
  };

  const handleDeleteClick = async (paymentId) => {
    try {
      const response = await fetch(`http://localhost:5009/payments/${paymentId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Update state to reflect deletion
        setPayments(payments.filter(payment => payment._id !== paymentId));
        setFilteredPayments(filteredPayments.filter(payment => payment._id !== paymentId)); // Update filtered payments

        // Navigate to report generation page after deletion
        navigate('/paymentsummary');
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
        setFormData({ FullName: '', Email: '', Mobile: '', Address: '' });
      } else {
        console.error("Error updating payment:", await response.text());
      }
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-gray-100"
      style={{
        backgroundImage: `url('/images/board3.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Headernav />

      <div className="p-10 bg-white/60 border-2 border-white/50 shadow-5xl rounded-3xl max-w-9xl mx-auto my-12 transition-all duration-500 ">
        <h2 className="text-4xl md:text-5xl font-bold text-center my-6 text-black drop-shadow-lg">
          Payment Summary
        </h2>

        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Payment ID"
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="mt-10">
          <table className="min-w-full bg-white border border-gray-200 table-auto">
            <thead>
              <tr>
                <th className="border px-6 py-4">Payment ID</th>
                <th className="border px-6 py-4">Full Name</th>
                <th className="border px-6 py-4">Email</th>
                <th className="border px-6 py-4">Mobile</th>
                <th className="border px-6 py-4">Address</th>
                <th className="border px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment._id}>
                    <td className="border px-6 py-4">{payment._id}</td>
                    <td className="border px-6 py-4">{payment.FullName}</td>
                    <td className="border px-6 py-4">{payment.Email}</td>
                    <td className="border px-6 py-4">{payment.Mobile}</td>
                    <td className="border px-6 py-4">{payment.Address}</td>
                    <td className="border px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdateClick(payment)}
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteClick(payment._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center border px-6 py-4">No matching payment details available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedPayment && (
          <form onSubmit={handleSubmit} className="mt-8 p-4 border border-gray-200 rounded">
            <h3 className="text-2xl font-bold mb-4">Update Payment</h3>
            <div className="mb-4">
              <label className="block mb-1">Full Name</label>
              <input
                type="text"
                name="FullName"
                value={formData.FullName}
                onChange={handleChange}
                required
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Mobile</label>
              <input
                type="text"
                name="Mobile"
                value={formData.Mobile}
                onChange={handleChange}
                required
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Address</label>
              <input
                type="text"
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                required
                className="border p-2 w-full"
              />
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update</button>
          </form>
        )}

        {/* Navigation Button to Report Generation Page */}
        <div className="mt-8">
          <button 
            onClick={() => navigate('/report')}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Go to Report Generation
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentSummary;
