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
    totalAmount: '',
  });
  const [countryCode, setCountryCode] = useState('+94'); // Default country code
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const countryCodes = [
    { code: '+94', name: 'Sri Lanka' },
    { code: '+1', name: 'United States' },
    { code: '+44', name: 'United Kingdom' },
    { code: '+49', name: 'Germany' },
    { code: '+33', name: 'France' },
    { code: '+91', name: 'India' },
    { code: '+61', name: 'Australia' },
    { code: '+81', name: 'Japan' },
    { code: '+86', name: 'China' },
    { code: '+39', name: 'Italy' },
    { code: '+55', name: 'Brazil' },
  ];
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Log payment details to check before submitting
    console.log('Payment Details:', paymentDetails);

    // Basic validation
    const newErrors = {};

    // Validate Full Name
    if (!paymentDetails.fullName) {
      newErrors.fullName = 'Full Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(paymentDetails.fullName)) {
      newErrors.fullName = 'Full Name must contain only letters and spaces';
    }

    // Validate Email
    if (!paymentDetails.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(paymentDetails.email)) {
      newErrors.email = 'Email format is invalid';
    }

    // Validate Mobile Number
    if (!paymentDetails.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^(?:\+?[0-9]{1,3})?[1-9][0-9]{9}$/.test(`${countryCode}${paymentDetails.mobile}`)) {
      newErrors.mobile = 'Mobile number must be a valid format';
    }

    // Validate Card Number
    if (!paymentDetails.cardNumber) {
      newErrors.cardNumber = 'Card Number is required';
    } else if (!/^\d{1,16}$/.test(paymentDetails.cardNumber)) {
      newErrors.cardNumber = 'Card Number must be a maximum of 16 digits';
    }

    // Validate Expiration Month and Year
    if (!paymentDetails.expirationMonth) {
      newErrors.expirationMonth = 'Expiration Month is required';
    } else if (!/^(0[1-9]|1[0-2])$/.test(paymentDetails.expirationMonth)) {
      newErrors.expirationMonth = 'Expiration Month must be between 01 and 12';
    }

    if (!paymentDetails.expirationYear) {
      newErrors.expirationYear = 'Expiration Year is required';
    } else if (paymentDetails.expirationYear.length !== 4 || isNaN(paymentDetails.expirationYear)) {
      newErrors.expirationYear = 'Expiration Year must be 4 digits';
    } else {
      const currentYear = new Date().getFullYear();
      if (parseInt(paymentDetails.expirationYear) < currentYear) {
        newErrors.expirationYear = 'Expiration Year cannot be in the past';
      }
    }

    // Validate CVV
    if (!paymentDetails.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(paymentDetails.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }

    // Validate Total Amount (if necessary)
    if (!paymentDetails.totalAmount) {
      newErrors.totalAmount = 'Total Amount is required';
    } else if (!/^\d+(\.\d{1,2})?$/.test(paymentDetails.totalAmount)) {
      newErrors.totalAmount = 'Total Amount must be a valid number';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const data = {
      FullName: paymentDetails.fullName,
      Email: paymentDetails.email,
      Mobile: `${countryCode}${paymentDetails.mobile}`, // Combine country code with mobile number
      Address: paymentDetails.address,
      CardType: paymentDetails.cardType,
      CardNumber: paymentDetails.cardNumber,
      ExpirationMonth: paymentDetails.expirationMonth,
      ExpirationYear: paymentDetails.expirationYear,
      CVV: paymentDetails.cvv,
      TotalAmount: paymentDetails.totalAmount,
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

    // Restrict Full Name to only letters and spaces
    if (name === 'fullName' && !/^[a-zA-Z\s]*$/.test(value)) {
      return; // Ignore the change if it contains numbers or special characters
    }

    // Restrict specific fields to only numbers
    if (['mobile', 'cardNumber', 'expirationYear', 'expirationMonth', 'cvv', 'totalAmount'].includes(name)) {
      if (!/^\d*$/.test(value)) {
        return; // Ignore the change if it contains letters or special characters
      }
    }

    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent('Payment Details');
    const body = encodeURIComponent(`
      Full Name: ${paymentDetails.fullName}
      Email: ${paymentDetails.email}
      Mobile: ${paymentDetails.mobile}
      Address: ${paymentDetails.address}
      Card Type: ${paymentDetails.cardType}
      Card Number: ${paymentDetails.cardNumber}
      Expiration Month: ${paymentDetails.expirationMonth}
      Expiration Year: ${paymentDetails.expirationYear}
      Total Amount: ${paymentDetails.totalAmount}
    `);
    const mailtoLink = `mailto:${paymentDetails.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink; // Redirect to the mail client
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
              {errors.email && <span className="text-red-500">{errors.email}</span>}
            </div>

             {/* Mobile Number Field with Country Code Dropdown */}
             <div className="flex flex-col">
              <label htmlFor="mobile" className="text-sm font-medium text-gray-700">Mobile Number</label>
              <div className="flex items-center">
                <select
                  id="countryCode"
                  name="countryCode"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="p-2 border border-gray-300 rounded-l-lg"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={paymentDetails.mobile}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-r-lg"
                  required
                />
              </div>
              {errors.mobile && <span className="text-red-500">{errors.mobile}</span>}
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
                <option value="American Express">Discover</option>
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

            {/* Expiration Month and Year */}
            <div className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-2">
              <div className="flex flex-col flex-1">
                <label htmlFor="expirationMonth" className="text-sm font-medium text-gray-700">Expiration Month</label>
                <input
                  type="text"
                  id="expirationMonth"
                  name="expirationMonth"
                  value={paymentDetails.expirationMonth}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-lg"
                  required
                  placeholder="MM"
                />
                {errors.expirationMonth && <span className="text-red-500">{errors.expirationMonth}</span>}
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="expirationYear" className="text-sm font-medium text-gray-700">Expiration Year</label>
                <input
                  type="text"
                  id="expirationYear"
                  name="expirationYear"
                  value={paymentDetails.expirationYear}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-lg"
                  required
                  placeholder="YYYY"
                />
                {errors.expirationYear && <span className="text-red-500">{errors.expirationYear}</span>}
              </div>
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
              {errors.cvv && <span className="text-red-500">{errors.cvv}</span>}
            </div>

            {/* Total Amount Field */}
            <div className="flex flex-col">
              <label htmlFor="totalAmount" className="text-sm font-medium text-gray-700">Total Amount (USD $)</label>
              <input
                type="text"
                id="totalAmount"
                name="totalAmount"
                value={paymentDetails.totalAmount}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Submit and Send Email Button */}
            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className={`bg-blue-600 text-white py-2 px-4 rounded-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit Payment'}
              </button>

              <button
                type="button"
                onClick={handleSendEmail}
                className="bg-green-600 text-white py-2 px-4 rounded-lg"
                disabled={!paymentDetails.email}
              >
                Send Email
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
