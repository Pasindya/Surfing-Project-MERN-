import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';

export default function PaymentPage() {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address: '',
    cardType: '',
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    cvv: '',
    offerCode: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Log payment details to check before submitting
    console.log('Payment Details:', paymentDetails);

    // Basic validation
    const newErrors = {};
    if (!paymentDetails.fullName) newErrors.fullName = 'Full Name is required';
    if (!paymentDetails.cardNumber) newErrors.cardNumber = 'Card Number is required';
    // Add more validation as needed
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const data = {
      FullName: paymentDetails.fullName,
      Email: paymentDetails.email,
      Mobile: paymentDetails.mobile,
      Address: paymentDetails.address,
      CardType: paymentDetails.cardType,
      CardNumber: paymentDetails.cardNumber,
      ExpirationMonth: paymentDetails.expirationMonth,
      ExpirationYear: paymentDetails.expirationYear,
      CVV: paymentDetails.cvv,
      OfferCode: paymentDetails.offerCode,
    };

    setIsLoading(true); // Set loading state to true during submission

    try {
      const response = await fetch('http://localhost:5009/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response Status:', response.status); // Log response status

      if (response.ok) {
        const createdPayment = await response.json(); // Get the created payment data
        console.log('Created Payment:', createdPayment); // Log the newly created payment for debugging

        alert('Payment submitted successfully');

        // Navigate to the confirmation page with payment details
        navigate('/paymentsummary', { state: { paymentDetails } });
      } else {
        const errorData = await response.json(); // Get error details from the response
        console.log('Error Data:', errorData); // Log error response for debugging
        alert(`Error submitting payment: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Error:', err); // Log the error for debugging
      alert('Error submitting payment');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
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

      <div className="p-10 bg-white/80 border-2 border-gray-200 shadow-2xl rounded-3xl max-w-4xl mx-auto my-12 transition-all duration-500">
        <h2 className="text-4xl md:text-5xl font-bold text-center my-6 text-black drop-shadow-lg">
          Payment Form
        </h2>

        <div className="mt-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div className="flex flex-col">
              <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={paymentDetails.fullName}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg"
                required
              />
              {errors.fullName && <span className="text-red-500">{errors.fullName}</span>}
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={paymentDetails.email}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Mobile Field */}
            <div className="flex flex-col">
              <label htmlFor="mobile" className="text-sm font-medium text-gray-700">Mobile</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={paymentDetails.mobile}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Address Field */}
            <div className="flex flex-col">
              <label htmlFor="address" className="text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={paymentDetails.address}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Card Type Field */}
            <div className="flex flex-col">
              <label htmlFor="cardType" className="text-sm font-medium text-gray-700">Card Type</label>
              <select
                id="cardType"
                name="cardType"
                value={paymentDetails.cardType}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Card Type</option>
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
                <option value="American Express">American Express</option>
              </select>
            </div>

            {/* Card Number Field */}
            <div className="flex flex-col">
              <label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg"
                required
              />
              {errors.cardNumber && <span className="text-red-500">{errors.cardNumber}</span>}
            </div>

            {/* Expiration Month Field */}
            <div className="flex flex-col">
              <label htmlFor="expirationMonth" className="text-sm font-medium text-gray-700">Expiration Month</label>
              <input
                type="text"
                id="expirationMonth"
                name="expirationMonth"
                value={paymentDetails.expirationMonth}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg"
                placeholder="MM"
                required
              />
            </div>

            {/* Expiration Year Field */}
            <div className="flex flex-col">
              <label htmlFor="expirationYear" className="text-sm font-medium text-gray-700">Expiration Year</label>
              <input
                type="text"
                id="expirationYear"
                name="expirationYear"
                value={paymentDetails.expirationYear}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg"
                placeholder="YYYY"
                required
              />
            </div>

            {/* CVV Field */}
            <div className="flex flex-col">
              <label htmlFor="cvv" className="text-sm font-medium text-gray-700">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Offer Code Field */}
            <div className="flex flex-col">
              <label htmlFor="offerCode" className="text-sm font-medium text-gray-700">Offer Code</label>
              <input
                type="text"
                id="offerCode"
                name="offerCode"
                value={paymentDetails.offerCode}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className={`p-3 w-full rounded-lg text-white transition-all duration-300 ${isLoading ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600'}`}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
