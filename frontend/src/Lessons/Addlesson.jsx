import React, { useState } from 'react';
import Lessonnav from './Lessonnav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const lessonTitles = [
  'Beginner Surfing',
  'Intermediate Surfing',
  'Advanced Surfing',
  // Add more lesson titles as needed
];

export default function Addlesson() {
  const [inputs, setInputs] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });

  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict special characters for location and description
    if (name === 'location' || name === 'description') {
      const regex = /^[a-zA-Z0-9\s]*$/; // Allow only letters, numbers, and spaces
      if (!regex.test(value)) {
        return; // Ignore input if it doesn't match the regex
      }
    }

    setInputs(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    navigate('/lessondetails'); // Navigate to the lesson details page
  }

  const sendRequest = async () => {
    await axios.post('http://localhost:5009/lessons', {
      title: String(inputs.title),
      date: inputs.date, // No need to convert to Date
      time: String(inputs.time),
      location: String(inputs.location),
      description: String(inputs.description),
    }).then(res => res.data);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Lessonnav />

      <div className="flex-1 ml-64 p-8 lg:ml-80 lg:p-12">
        <header className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white py-8 px-6 rounded-lg shadow-lg overflow-hidden">
          <div className="absolute inset-0 opacity-50 bg-cover bg-center" style={{ backgroundImage: 'url(https://source.unsplash.com/random/1920x1080?lesson)' }}></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold leading-tight mb-4">Add New Lesson</h1>
            <p className="text-lg">Fill in the details to add a new lesson to the schedule. Your students are waiting!</p>
          </div>
        </header>

        <div className="mt-12 bg-white shadow-lg rounded-lg p-8 border-l-4 border-blue-500">
          <form onSubmit={handleSubmit}>
            {/* Title Dropdown */}
            <div className="mb-5">
              <label className="block text-gray-700 font-medium" htmlFor="title">Title</label>
              <select
                name="title"
                value={inputs.title}
                onChange={handleChange}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              >
                <option value="" disabled>Select a lesson title</option>
                {lessonTitles.map((title, index) => (
                  <option key={index} value={title}>{title}</option>
                ))}
                <option value="" disabled>Select Lesson</option>
                <optgroup label="Beginner Lessons">
                  <option value="Beginner Lesson 1">Beginner Lesson 1</option>
                  <option value="Beginner Lesson 2">Beginner Lesson 2</option>
                  <option value="Beginner Lesson 3">Beginner Lesson 3</option>
                  <option value="Beginner Final">Beginner Final</option>
                </optgroup>
                <optgroup label="Intermediate Lessons">
                  <option value="Intermediate Lesson 1">Intermediate Lesson 1</option>
                  <option value="Intermediate Lesson 2">Intermediate Lesson 2</option>
                  <option value="Intermediate Lesson 3">Intermediate Lesson 3</option>
                  <option value="Intermediate Final">Intermediate Final</option>
                </optgroup>
                <optgroup label="Advanced Lessons">
                  <option value="Advanced Lesson 1">Advanced Lesson 1</option>
                  <option value="Advanced Lesson 2">Advanced Lesson 2</option>
                  <option value="Advanced Lesson 3">Advanced Lesson 3</option>
                  <option value="Advanced Final">Advanced Final</option>
                </optgroup>
                <optgroup label="Other Lessons">
                  <option value="Yoga Lesson">Yoga Lesson</option>
                  <option value="Self-Guard Lesson">Self-Guard Lesson</option>
                </optgroup>
              </select>
            </div>

            {/* Date */}
            <div className="mb-5">
              <label className="block text-gray-700 font-medium" htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                value={inputs.date}
                onChange={handleChange}
                min={today}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>

            {/* Time */}
            <div className="mb-5">
              <label className="block text-gray-700 font-medium" htmlFor="time">Time</label>
              <input
                type="time"
                name="time"
                value={inputs.time}
                onChange={handleChange}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>

            {/* Location */}
            <div className="mb-5">
              <label className="block text-gray-700 font-medium" htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                value={inputs.location}
                onChange={handleChange}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter lesson location"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-5">
              <label className="block text-gray-700 font-medium" htmlFor="description">Description</label>
              <textarea
                name="description"
                value={inputs.description}
                onChange={handleChange}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter lesson description"
                rows="5"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105"
            >
              Add Lesson
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
