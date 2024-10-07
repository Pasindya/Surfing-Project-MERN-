// src/Pages/Events.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';

export default function Events() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    StudentName: '',
    EventName: '',
    age: '',
    gmail: '',
    gender: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState(''); // State for submission feedback

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate StudentName input to only accept letters and spaces, but without showing the error message
    if (name === 'StudentName') {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        return;  // Do not update the state with invalid input, but do not show the error
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset submission message
    setSubmissionMessage('');

    // Basic client-side validation
    if (formData.age <= 0) {
      alert('Please enter a valid age.');
      return;
    }

    const data = {
      StudentName: formData.StudentName,
      EventName: formData.EventName,
      age: formData.age,
      gmail: formData.gmail,
      gender: formData.gender
    };

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5009/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newEvent = await response.json();
        setSubmissionMessage('Event registration successful!');
        // Save to localStorage
        localStorage.setItem('userEvent', JSON.stringify(newEvent));
        // Optionally, reset the form
        setFormData({
          StudentName: '',
          EventName: '',
          age: '',
          gmail: '',
          gender: ''
        });
        
        // Delay navigation to allow the message to be seen
        setTimeout(() => {
          navigate('/eventuser');
        }, 2000); // 2-second delay
      } else {
        const errorData = await response.json();
        setSubmissionMessage(`Error registering for event: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Error:', err);
      setSubmissionMessage('Error registering for event. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col justify-between relative"
      style={{ backgroundImage: "url('/images/beach.jpg')" }}
    >
      <Headernav />

      <div className="absolute right-5 top-20 space-x-4">
        <button
          onClick={() => navigate('/events')}
          className="bg-yellow-500 text-black px-4 py-2 rounded-full shadow-lg hover:bg-yellow-600 transition-all"
        >
          Back
        </button>
      </div>

      <div className="p-6 max-w-3xl mx-auto my-8 bg-white bg-opacity-80 shadow-2xl rounded-lg transition-transform transform hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-green-500 animate-pulse mb-6">
          Register for an Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Display submission message if any */}
          {submissionMessage && (
            <p
              className={`text-center ${
                submissionMessage.startsWith('Error') ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {submissionMessage}
            </p>
          )}

          <div>
            <label htmlFor="StudentName" className="block text-lg font-semibold text-gray-800">
              Student Name:
            </label>
            <input
              type="text"
              id="StudentName"
              name="StudentName"
              value={formData.StudentName}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-blue-600 focus:ring-4 focus:ring-blue-800 transition-all"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="EventName" className="block text-lg font-semibold text-gray-800">
              Event Name:
            </label>
            <select
              id="EventName"
              name="EventName"
              value={formData.EventName}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-blue-600 focus:ring-4 focus:ring-blue-800 transition-all"
              required
            >
              <option value="">Select an Event</option>
              <option value="Board Surfing">Board Surfing</option>
              <option value="Boat Surfing">Boat Surfing</option>
              <option value="Wind Surfing">Wind Surfing</option>
              <option value="Special Events">Special Events</option>
            </select>
          </div>
          <div>
            <label htmlFor="age" className="block text-lg font-semibold text-gray-800">
              Age:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-blue-600 focus:ring-4 focus:ring-blue-800 transition-all"
              placeholder="Enter your age"
              required
              min="1"
            />
          </div>
          <div>
            <label htmlFor="gmail" className="block text-lg font-semibold text-gray-800">
              Gmail:
            </label>
            <input
              type="email"
              id="gmail"
              name="gmail"
              value={formData.gmail}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-blue-600 focus:ring-4 focus:ring-blue-800 transition-all"
              placeholder="Enter your Gmail"
              required
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-lg font-semibold text-gray-800">
              Gender:
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-blue-600 focus:ring-4 focus:ring-blue-800 transition-all"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}
