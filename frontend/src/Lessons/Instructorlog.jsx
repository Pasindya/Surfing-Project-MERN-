import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate to another page on successful login

export default function Instructorlog() {
  const [error, setError] = useState('');  // State to track error messages
  const navigate = useNavigate();  // Hook to navigate programmatically

  // Form submission handler
  const handleLogin = (e) => {
    e.preventDefault();  // Prevent form default behavior
    
    const username = e.target.username.value;
    const password = e.target.password.value;

    // Check if the credentials match
    if (username === 'pasi' && password === 'pasindya') {
      // If credentials match, navigate to another page (e.g., instructor dashboard)
      navigate('/viewlesson');
    } else {
      // Set an error message if the credentials are wrong
      setError('Invalid username or password. Please try again.');
    }
  };

  // Handler for the Previous button
  const handlePrevious = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side Image */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-gray-200">
        <img 
          src="/images/lessonplan.png" // Replace with your image source
          alt="Instructor" 
          className="h-full w-full object-cover"
        />
      </div>
      
      {/* Right Side Login Box */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Black Transparent Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-8">Instructor Login</h2>
          
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded mb-4 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Previous
          </button>

          {/* Form */}
          <form onSubmit={handleLogin}>
            {/* Username Field */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter username"
                required
              />
            </div>
            
            {/* Password Field */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter password"
                required
              />
            </div>
            
            {/* Display Error if Any */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
