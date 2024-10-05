import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EventManagerLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Handler for form submission
  const handleLogin = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    // Validate the credentials
    if (username === 'thenuu' && password === 'Then123') {
      navigate('/viewevent/66ff58928cb98d32ca243848');
    } else {
      setError('Invalid login. Please check your username or password.');
    }
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Full-page Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/eventplanner.jpg')" }}></div>

      {/* Transparent Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Transparent overlay */}

      {/* Right Side Login Form */}
      <div className="relative z-10 w-full max-w-md p-8 shadow-lg rounded-lg bg-white bg-opacity-90 transition-transform hover:shadow-xl hover:scale-105">
        {/* Back Button */}
        <button
          onClick={handlePrevious}
          className="bg-transparent text-gray-500 py-2 px-4 rounded-lg mb-6 border border-gray-300 transition-all duration-300 hover:text-gray-700 hover:border-gray-400 focus:outline-none"
        >
          Previous
        </button>

        {/* Login Title */}
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Event Manager Login
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
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all duration-300 text-gray-700 placeholder-gray-400"
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
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all duration-300 text-gray-700 placeholder-gray-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {/* Login Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:bg-gray-900 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
