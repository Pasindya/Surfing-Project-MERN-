import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Stafflog() {
  // Define the correct username and password
  const correctUsername = "tharindu";
  const correctPassword = "kavee";

  // State for form inputs and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Navigate hook for redirection
  const navigate = useNavigate();

  // Handle login validation
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === correctUsername && password === correctPassword) {
      setErrorMessage('');
      navigate('/viewstaff'); // Redirect after successful login
    } else {
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side with image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: 'url("./images/stafflog.jpg")' }} // Replace with your image URL
      ></div>

      {/* Right side with login form */}
      <div className="w-1/2 flex items-center justify-center bg-black bg-opacity-50">
        <form onSubmit={handleLogin} className="bg-black bg-opacity-70 backdrop-blur-md p-8 rounded-lg w-3/4">
          <h2 className="text-2xl font-bold mb-6 text-white">Staff Login</h2>

          {errorMessage && (
            <p className="text-red-500 mb-4">{errorMessage}</p>
          )}

          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-gray-200 rounded-md focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-200 rounded-md focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
