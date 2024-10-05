import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';
import axios from 'axios';

export default function Addorder() {
  const history = useNavigate();

  const [inputs, setInputs] = useState({
    cnumber: '',
    mmyy: '',
    cvc: '',
    name: '',
    address: '',
    email: '',
    pnumber: '',
    type: '',
  });

  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const validate = () => {
    const errors = {};
    if (!/^\d{16}$/.test(inputs.cnumber)) {
      errors.cnumber = 'Card number must be 16 digits';
    }
     // MM/YY validation
     if (!/^\d{2}\/\d{2}$/.test(inputs.mmyy)) {
      tempErrors.mmyy = 'Expiration date must be in MM/YY format.';
    }
    if (!/^\d{3,4}$/.test(inputs.cvc)) {
      errors.cvc = 'CVV must be 3 or 4 digits';
    }
    if (!/^[A-Za-z\s]+$/.test(inputs.name)) {
      errors.name = 'Name can only contain letters and spaces';
    }
    if (!inputs.address.trim()) {
      errors.address = 'Address is required';
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.email)) {
      errors.email = 'Invalid email address';
    }
    if (!/^\d{10}$/.test(inputs.pnumber)) {
      errors.pnumber = 'Phone number must be 10 digits';
    }
    if (!inputs.type) {
      errors.type = 'Surfboard type is required';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await sendRequest();
        setSubmissionStatus('success');
        setTimeout(() => {
          history('/surfboard'); // Navigate to the Surfboard page after successful submission
        }, 2000);
      } catch (error) {
        setSubmissionStatus('failure');
      }
    }
  };

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
        type: String(inputs.type),
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
            <label>Surfboard Type:</label>
            <select
              name="type"
              value={inputs.type}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Surfboard Type</option>
              <option value="shortboard">Shortboard</option>
              <option value="longboard">Longboard</option>
              <option value="funboard">Funboard</option>
              <option value="fish">Fish</option>
            </select>
            {errors.type && <p className="error-message">{errors.type}</p>}
          </div>

          <div className="form-group">
            <label>Card Number:</label>
            <input
              type="text"
              name="cnumber"
              value={inputs.cnumber}
              onChange={handleChange}
              placeholder="Enter card number"
              maxLength="16"
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                  e.preventDefault();
                }
              }}
              required
            />
            {errors.cnumber && <p className="error-message">{errors.cnumber}</p>}
          </div>

          <div className="form-group">
            <label>Month & Year (MM/YY):</label>
            <input
              type="text"
              name="mmyy"
              value={inputs.mmyy}
              onChange={handleChange}
              placeholder="MM/YY"
              maxLength="5"
              onKeyDown={(e) => {
                if (!/[0-9\/]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                  e.preventDefault();
                }
              }}
              required
            />
            {errors.mmyy && <p className="error-message">{errors.mmyy}</p>}
          </div>

          <div className="form-group">
            <label>CVV:</label>
            <input
              type="text"
              name="cvc"
              value={inputs.cvc}
              onChange={handleChange}
              placeholder="Enter CVV"
              maxLength="4"
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                  e.preventDefault();
                }
              }}
              required
            />
            {errors.cvc && <p className="error-message">{errors.cvc}</p>}
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
                if (!/[A-Za-z\s]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                  e.preventDefault();
                }
              }}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
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
            {errors.address && <p className="error-message">{errors.address}</p>}
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
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              name="pnumber"
              value={inputs.pnumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              maxLength="10"
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                  e.preventDefault();
                }
              }}
              required
            />
            {errors.pnumber && <p className="error-message">{errors.pnumber}</p>}
          </div>

          <button type="submit" className="submit-button">Submit Order</button>
          
          {submissionStatus === 'success' && <p className="success-message">Order placed successfully!</p>}
          {submissionStatus === 'failure' && <p className="error-message">Failed to place order. Please try again.</p>}
        </form>
      </main>
      <Footer />

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

          .form-group input,
          .form-group select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
          }

          .submit-button {
            display: block;
            width: 100%;
            padding: 10px;
            background-color: #007bff; /* Bootstrap primary color */
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1.2rem;
          }

          .submit-button:hover {
            background-color: #0056b3; /* Darker blue on hover */
          }

          p {
            color: red; /* Style error messages in red */
            margin: 5px 0;
          }
          
          .success-message {
            color: green; /* Style success messages in green */
          }

          .error-message {
            color: red; /* Style error messages in red */
          }
        `}
      </style>
    </div>
  );
}
