import React, { useState } from 'react';
import Footer from '../Components/Footer';
import Headernav from '../Components/Headernav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Bookpackage() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    packagename: "",
    email: "",
    mobileno: "",
    address: "",
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle input restrictions
    if (name === 'name') {
      // Allow only letters and spaces for name
      const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
      setInputs((prevState) => ({
        ...prevState,
        [name]: filteredValue,
      }));
    } else if (name === 'mobileno') {
      // Allow only numbers for mobile number and limit to 10 digits
      const filteredValue = value.replace(/[^0-9]/g, '').slice(0, 10);
      setInputs((prevState) => ({
        ...prevState,
        [name]: filteredValue,
      }));
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate mobile number length
    if (inputs.mobileno.length !== 10) {
      alert("Mobile number must be exactly 10 digits long.");
      return;
    }

    try {
      await sendRequest();
      // Clear form fields after successful booking
      setInputs({
        name: "",
        packagename: "",
        email: "",
        mobileno: "",
        address: "",
      });
      // Redirect to home page after booking
      navigate('/');
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  // Function to send a booking request to the server
  const sendRequest = async () => {
    await axios.post("http://Localhost:5009/bookings", {
      name: String(inputs.name),
      packagename: String(inputs.packagename),
      email: String(inputs.email),
      mobileno: Number(inputs.mobileno),
      address: String(inputs.address),
    });
  };

  return (
    <div>
      <Headernav /> {/* Include the Header */}

      {/* Main container with background image */}
      <div 
        className="flex justify-center items-center min-h-screen bg-cover bg-center" 
        style={{ backgroundImage: 'url("/public/images/form1.jpeg")' }} // Replace with your image URL
      >
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md w-full max-w-md backdrop-blur-md">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Book Now</h1>

          {/* Booking Form */}
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium" htmlFor="fullName">Full Name</label>
              <input
                type="text"
                value={inputs.name}
                name="name"
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full bg-white bg-opacity-70"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Package Name - Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium" htmlFor="packageName">Package Name</label>
              <select
                name="packagename"
                value={inputs.packagename}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full bg-white bg-opacity-70"
                required
              >
                <option value="">Select a package</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium" htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full bg-white bg-opacity-70"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Mobile Number */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium" htmlFor="mobileNumber">Mobile Number</label>
              <input
                type="tel"
                name="mobileno"
                onChange={handleChange}
                value={inputs.mobileno}
                className="mt-1 p-2 border border-gray-300 rounded w-full bg-white bg-opacity-70"
                placeholder="Enter your mobile number"
                required
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium" htmlFor="address">Address</label>
              <textarea
                name="address"
                value={inputs.address}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full bg-white bg-opacity-70"
                placeholder="Enter your address"
                required
              />
            </div>

            {/* Book Now Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>

      <Footer /> {/* Include the Footer */}
    </div>
  );
}
