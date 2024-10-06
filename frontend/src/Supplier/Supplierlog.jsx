import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Supplierlog() {
  // Define the correct username and password
  const correctUsername = "lasiru";
  const correctPassword = "lasi";

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
      navigate('/table');
    } else {
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };

  // Handle going back to the previous page
  const handlePrevious = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="flex h-screen">
      {/* Left side with image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: 'url("./images/goods.jpg")' }}
      ></div>

      {/* Right side with form */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Supplier Login</h2>

          {errorMessage && (
            <p className="text-red-500 mb-4">{errorMessage}</p>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
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
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-200 rounded-md focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
            >
              Previous
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
