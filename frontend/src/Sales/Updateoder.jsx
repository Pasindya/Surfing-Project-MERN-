import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateOrder() {
  const [inputs, setInputs] = useState({
    cnumber: '',
    mmyy: '',
    cvc: '',
    name: '',
    address: '',
    email: '',
    pnumber: '',
  });
  
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5009/users/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.users));
    };
    fetchHandler();
  }, [id]);

  const validateInputs = () => {
    let tempErrors = {};

    // Card number validation
    if (!/^\d{16}$/.test(inputs.cnumber)) {
      tempErrors.cnumber = 'Card number must be 16 digits.';
    }

    // MM/YY validation
    if (!/^\d{2}\/\d{2}$/.test(inputs.mmyy)) {
      tempErrors.mmyy = 'Expiration date must be in MM/YY format.';
    }

    // CVV validation
    if (!/^\d{4}$/.test(inputs.cvc)) {
      tempErrors.cvc = 'CVV must be 3 digits.';
    }

    // Name validation
    if (!/^[a-zA-Z\s]+$/.test(inputs.name) || inputs.name.trim() === '') {
      tempErrors.name = 'Name can only contain letters and cannot be empty.';
    }

    // Address validation
    if (inputs.address.trim() === '') {
      tempErrors.address = 'Address cannot be empty.';
    }

    // Email validation
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(inputs.email)) {
      tempErrors.email = 'Invalid email format.';
    }

    // Phone number validation
    if (!/^\d{10}$/.test(inputs.pnumber)) {
      tempErrors.pnumber = 'Phone number must be 10 digits.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const sendRequest = async () => {
    try {
      const res = await axios.put(`http://localhost:5009/users/${id}`, {
        cnumber: Number(inputs.cnumber),
        mmyy: String(inputs.mmyy),
        cvc: String(inputs.cvc),
        name: String(inputs.name),
        address: String(inputs.address),
        email: String(inputs.email),
        pnumber: Number(inputs.pnumber),
      });
      return res.data;
    } catch (error) {
      console.error(error);
      setSubmissionStatus('failure');
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      const response = await sendRequest();
      if (response) {
        setSubmissionStatus('success');
        setTimeout(() => {
          history('/oderdetail');
        }, 2000); // Delay before redirecting
      }
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2.5rem', color: '#333' }}>Update Order</h1>

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

        <button type="submit" className="btn order-btn">Update Order</button>
      </form>

      {submissionStatus === 'success' && (
        <p style={{ color: 'green', textAlign: 'center', marginTop: '20px' }}>
          Order updated successfully! Redirecting...
        </p>
      )}
      {submissionStatus === 'failure' && (
        <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
          Order update failed. Please try again.
        </p>
      )}

      <style>
        {`
          .order-form {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .form-group {
            margin-bottom: 20px;
          }
          .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
          }
          .form-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: white;
            cursor: pointer;
            font-size: 1rem;
            width: 100%;
            margin-top: 20px;
          }
          .btn:hover {
            background-color: #0056b3;
          }
        `}
      </style>
    </div>
  );
}
