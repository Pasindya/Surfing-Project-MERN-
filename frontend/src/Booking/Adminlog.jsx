import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLog() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Handler for form submission
  const handleLogin = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    // Validate the credentials
    if (username === 'pasi' && password === 'pasindya') {
      navigate('/viewbooking'); // Redirect to the dashboard or desired page
    } else {
      setError('Invalid login. Please check your username or password.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side Image */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/reserve.jpg')" }}>
        {/* Optional additional content can go here */}
      </div>

      {/* Right Side Login Form */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Black Transparent Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Login Form Container */}
        <div className="relative z-10 w-full max-w-md p-8 shadow-lg rounded-lg bg-white bg-opacity-90">
          {/* Login Title */}
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
            Admin Login
          </h2>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-lg font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 text-gray-700 placeholder-gray-400"
                placeholder="Enter your username"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 text-gray-700 placeholder-gray-400"
                placeholder="Enter your password"
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            {/* Login Button */}
            <div className="flex flex-col justify-center items-center mt-6 space-y-4">
              <button
                type="submit"
                className="bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:bg-gray-900 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Login
              </button>

              {/* Previous Button */}
              <button
                onClick={() => navigate(-1)} // Navigate to the previous page
                className="bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Previous
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
