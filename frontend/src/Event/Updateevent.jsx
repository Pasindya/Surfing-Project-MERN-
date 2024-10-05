// src/Pages/EditEvent.jsx

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Eventnav from './Eventnav';


export default function EditEvent() {
  const { state } = useLocation(); // Accessing the passed state
  console.log(state.eventData);
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState(state?.eventData || {
    StudentName: '',
    EventName: '',
    age: '',
    gmail: '',
    gender: 'Male',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure StudentName contains only letters and spaces
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(formData.StudentName)) {
      alert('Student Name can only contain letters and spaces.');
      return; // Prevent form submission
    }

    try {
      const response = await fetch(`http://localhost:5009/events/${formData._id}`, {
        method: 'PUT', // Use PUT or PATCH depending on your backend implementation
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Event updated successfully');
        navigate(`/viewevent/${formData._id}`); // Navigate to the View Event page with the event's ID
      } else {
        const errorData = await response.json();
        alert(`Error updating event: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Error updating event:', err);
      alert('Error updating event');
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Eventnav />

      {/* Background with Image */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/updateback.jpg)', // Add your image path here
          minHeight: '100vh',
        }}
      >
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-6 right-6 bg-orange-500 text-black px-4 py-2 rounded-lg z-10 hover:bg-orange-600 transition-all"
          style={{ zIndex: 20 }} // Ensure button is on top of other elements
        >
          Back
        </button>

        {/* Form Container */}
        <div className="relative p-6 bg-gradient-to-r from-yellow-700 to-blue-400 shadow-xl rounded-lg max-w-2xl mx-auto my-8 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-4xl font-bold text-center text-white mb-6">Update Event Register Details</h2>

          <form onSubmit={handleSubmit} className="space-y-6 text-white">
            <div className="flex justify-between items-center">
              <label className="font-semibold">Student Name:</label>
              <input
                type="text"
                name="StudentName"
                value={formData.StudentName}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-2/3 bg-gray-800 text-white focus:outline-none focus:ring-4 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="font-semibold">Event Name:</label>
              <select
                name="EventName"
                value={formData.EventName}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-2/3 bg-gray-800 text-white focus:outline-none focus:ring-4 focus:ring-yellow-500"
                required
              >
                <option value="">Select Event</option>
                <option value="Board Surfing">Board Surfing</option>
                <option value="Boat Surfing">Boat Surfing</option>
                <option value="Wind Surfing">Wind Surfing</option>
                <option value="Special Events">Special Events</option>
              </select>
            </div>

            <div className="flex justify-between items-center">
              <label className="font-semibold">Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-2/3 bg-gray-800 text-white focus:outline-none focus:ring-4 focus:ring-yellow-500"
                required
                min="0"
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="font-semibold">Gmail:</label>
              <input
                type="email"
                name="gmail"
                value={formData.gmail}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-2/3 bg-gray-800 text-white focus:outline-none focus:ring-4 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="font-semibold">Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-2/3 bg-gray-800 text-white focus:outline-none focus:ring-4 focus:ring-yellow-500"
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit" // Changed to type="submit" for form submission
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-transform duration-300 hover:scale-105 shadow-lg"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>

    
    </div>
  );
}
