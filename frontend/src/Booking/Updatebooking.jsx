import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Headernav from '../Components/Headernav'; // Import Headernav component

export default function UpdateBooking() {
  const [inputs, setInputs] = useState({});
  const [showSuccess, setShowSuccess] = useState(false); // State to handle success animation
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://Localhost:5005/bookings/${id}`);
        setInputs(response.data);
      } catch (err) {
        console.error("Error fetching booking details: ", err);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://Localhost:5005/bookings/${id}`, {
        name: String(inputs.name),
        packagename: String(inputs.packagename),
        email: String(inputs.email),
        mobileno: Number(inputs.mobileno),
        address: String(inputs.address),
      });
      setShowSuccess(true); // Show success animation
      setTimeout(() => navigate('/bookingdetails'), 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error("Error updating booking: ", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict mobile number to numbers only
    if (name === 'mobileno' && !/^\d*$/.test(value)) {
      return;
    }

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate mobile number length
    if (inputs.mobileno.length !== 10) {
      alert("Mobile number must be exactly 10 digits long.");
      return;
    }

    // Validate address length
    if (inputs.address.length < 10) {
      alert("Address must be at least 10 characters long.");
      return;
    }

    await sendRequest();
  };

  return (
    <div>
      <Headernav /> {/* Include Navigation Bar */}
      
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Update Booking</h1>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium" htmlFor="name">Full Name</label>
              <input
                type="text"
                value={inputs.name || ''}
                name="name"
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Package Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium" htmlFor="packagename">Package Name</label>
              <input
                type="text"
                value={inputs.packagename || ''}
                name="packagename"
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter package name"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium" htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={inputs.email || ''}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Mobile Number */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium" htmlFor="mobileno">Mobile Number</label>
              <input
                type="tel"
                name="mobileno"
                onChange={handleChange}
                value={inputs.mobileno || ''}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter your mobile number"
                required
                maxLength="10" // Ensure only 10 digits are allowed
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium" htmlFor="address">Address</label>
              <textarea
                name="address"
                value={inputs.address || ''}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter your address (at least 10 characters)"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Update Booking
            </button>
          </form>

          {/* Success Animation */}
          {showSuccess && (
            <div className="mt-4 p-4 text-green-700 bg-green-100 rounded-md text-center">
              <p>Booking Updated Successfully!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}