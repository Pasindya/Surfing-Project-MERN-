import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';
import axios from 'axios';

export default function Addorder() {
  const history = useNavigate();

  // State to manage form inputs
  const [inputs, setInputs] = useState({
    cnumber: '',
    mmyy: '',
    cvc: '',
    name: '',
    address: '',
    email: '',
    pnumber: '',
  });

  // State to manage validation errors
  const [errors, setErrors] = useState({});

  // State to manage submission status
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' or 'failure'

  // Validation helper functions
  const validate = () => {
    const errors = {};
    
    // Card number validation: 16 digits
    if (!/^\d{16}$/.test(inputs.cnumber)) {
      errors.cnumber = 'Card number must be 16 digits';
    }

    // Expiration date validation: MM/YY format, with valid month
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(inputs.mmyy)) {
      errors.mmyy = 'Expiration date must be in MM/YY format';
    }

    // CVV validation: 3 or 4 digits
    if (!/^\d{3,4}$/.test(inputs.cvc)) {
      errors.cvc = 'CVV must be 3 or 4 digits';
    }

    // Name validation: Only letters and spaces
    if (!/^[A-Za-z\s]+$/.test(inputs.name)) {
      errors.name = 'Name can only contain letters and spaces';
    }

    // Address validation: Not empty
    if (!inputs.address.trim()) {
      errors.address = 'Address is required';
    }

    // Email validation: Valid email format
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.email)) {
      errors.email = 'Invalid email address';
    }

    // Phone number validation: 10 digits
    if (!/^\d{10}$/.test(inputs.pnumber)) {
      errors.pnumber = 'Phone number must be 10 digits';
    }

    return errors;
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    const validationErrors = validate();
    setErrors(validationErrors);

    // If there are no errors, proceed with form submission
    if (Object.keys(validationErrors).length === 0) {
      try {
        await sendRequest();
        setSubmissionStatus('success');
        setTimeout(() => {
          history('/surfboard'); // Navigate to the Surfboard page after successful submission
        }, 2000); // Delay of 2 seconds for better user experience
      } catch (error) {
        setSubmissionStatus('failure');
      }
    }
  };

  // Function to send the order data to the server
  const sendRequest = async () => {
    return await axios
      .post('http://localhost:5009/users', {
        cnumber: Number(inputs.cnumber),
        mmyy: String(inputs.mmyy),
        cvc: String(inputs.cvc),
        name: String(inputs.name),
        address: String(inputs.address),
        email: String(inputs.email),
        pnumber: Number(inputs.pnumber),
      })
      .then((res) => res.data);
  };

  return (
    <div>
      <Headernav />
      <main>
        <h1 style={{ textAlign: 'center', margin: '20px 0', fontSize: '2rem' }}>Place Your Order</h1>
        <form onSubmit={handleSubmit} className="order-form">
          <div className="form-group">
            <label>Card Number:</label>
            <input
              type="text"
              name="cnumber"
              value={inputs.cnumber}
              onChange={handleChange}
              placeholder="Enter card number"
              maxLength="16" // Restricts input to 16 characters
              onKeyDown={(e) => {
                // Only allow digits, backspace, and delete keys
                if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                  e.preventDefault();
                }
              }}
              required
            />
            {errors.cnumber && <p style={{ color: 'red' }}>{errors.cnumber}</p>}
          </div>

          <div className="form-group">
            <label>Month & Year (MM/YY):</label>
            <input
              type="text"
              name="mmyy"
              value={inputs.mmyy}
              onChange={handleChange}
              placeholder="MM/YY"
              maxLength="5" // Restricts input length to 5 characters (MM/YY)
              onKeyDown={(e) => {
                // Only allow digits, backspace, delete, and `/` for separator
                if (!/[0-9\/]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                  e.preventDefault();
                }
              }}
              required
            />
            {errors.mmyy && <p style={{ color: 'red' }}>{errors.mmyy}</p>}
          </div>

          <div className="form-group">
            <label>CVV:</label>
            <input
              type="text"
              name="cvc"
              value={inputs.cvc}
              onChange={handleChange}
              placeholder="Enter CVV"
              maxLength="4" // Restricts input to 4 characters
              onKeyDown={(e) => {
                // Only allow digits, backspace, and delete keys
                if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                  e.preventDefault();
                }
              }}
              required
            />
            {errors.cvc && <p style={{ color: 'red' }}>{errors.cvc}</p>}
          </div>

          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              onKeyDown={(e) => {
                // Only allow letters and spaces, backspace, and delete keys
                if (!/[A-Za-z\s]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                  e.preventDefault();
                }
              }}
            />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={inputs.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
            />
            {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              name="pnumber"
              value={inputs.pnumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              maxLength="10" // Restricts input to 10 characters
              onKeyDown={(e) => {
                // Only allow digits, backspace, and delete keys
                if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                  e.preventDefault();
                }
              }}
              required
            />
            {errors.pnumber && <p style={{ color: 'red' }}>{errors.pnumber}</p>}
          </div>

          <button type="submit" className="btn">Submit Order</button>
        </form>

        {submissionStatus === 'success' && (
          <p style={{ color: 'green', textAlign: 'center', marginTop: '20px' }}>
            Order placed successfully! Redirecting to Surfboard page...
          </p>
        )}
        {submissionStatus === 'failure' && (
          <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
            Order placement failed. Please try again.
          </p>
        )}

        <style>
          {`
            .order-form {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #f8f8f8;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .form-group {
              margin-bottom: 15px;
            }
            .form-group label {
              display: block;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .form-group input {
              width: 100%;
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
            }
            .btn {
              display: block;
              width: 100%;
              padding: 10px;
              background-color: #007bff;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              font-size: 1.2rem;
            }
            .btn:hover {
              background-color: #0056b3;
            }
          `}
        </style>
      </main>
      <Footer />
    </div>
  );
}
