import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Studentnav from './Studentnav';

export default function UpdateStudent() {
  const [inputs, setInputs] = useState({});
  const [showSuccess, setShowSuccess] = useState(false); // State to handle success animation
  const navigate = useNavigate();
  const { id } = useParams();  // Extract the student ID from URL parameters

  // Fetch the student details on component load
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5009/students/${id}`);
        setInputs(response.data);  // Set the fetched data to the state
      } catch (err) {
        console.error("Error fetching student details: ", err);
      }
    };
    fetchHandler();
  }, [id]);  // Runs when 'id' changes

  // Send request to update student data
  const sendRequest = async () => {
    try {
      const updatedFields = {};  // Only send the updated fields

      // Check which fields have been modified
      if (inputs.name) updatedFields.name = inputs.name;
      if (inputs.email) updatedFields.email = inputs.email;
      if (inputs.address) updatedFields.address = inputs.address;
      if (inputs.mobileno) updatedFields.mobileno = inputs.mobileno;
      if (inputs.password) updatedFields.password = inputs.password;

      await axios.put(`http://localhost:5009/students/${id}`, updatedFields);

      setShowSuccess(true); // Show success animation
      setTimeout(() => navigate('/studentdetails'), 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error("Error updating student: ", err);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict mobile number to numbers only
    if (name === 'mobileno' && !/^\d*$/.test(value)) {
      return;
    }

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,  // Update the specific input field in state
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If only updating the address, no need to validate other fields
    if (inputs.mobileno && inputs.mobileno.length !== 10) {
      alert("Mobile number must be exactly 10 digits long.");
      return;
    }

    await sendRequest();  // Send update request
  };

  return (
    <div>
      <Studentnav />

      <div
        className="flex justify-center items-center min-h-screen bg-gray-100"
        style={{
          backgroundImage: `url('/images/img2.jpg')`, // Replace with your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md bg-opacity-90">
          <h1 className="text-3xl font-bold mb-6 text-center">Update Student</h1>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium" htmlFor="name">Name</label>
              <input
                type="text"
                value={inputs.name || ''}  // Show fetched name in input field
                name="name"
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium" htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={inputs.email || ''}  // Show fetched email in input field
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter your email"
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium" htmlFor="address">Address</label>
              <textarea
                name="address"
                value={inputs.address || ''}  // Show fetched address in input field
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter your address"
              />
            </div>

            {/* Mobile Number */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium" htmlFor="mobileno">Mobile Number</label>
              <input
                type="tel"
                name="mobileno"
                onChange={handleChange}
                value={inputs.mobileno || ''}  // Show fetched mobile number in input field
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter your mobile number"
                maxLength="10" // Ensure only 10 digits are allowed
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium" htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={inputs.password || ''}  // Show fetched password in input field
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter your password"
                maxLength="15" 
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Update Student
            </button>
          </form>

          {/* Success Animation */}
          {showSuccess && (
            <div className="mt-4 p-4 text-green-700 bg-green-100 rounded-md text-center">
              <p> Updated Successfully!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
