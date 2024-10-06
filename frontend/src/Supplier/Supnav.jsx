import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Supnav() {
  const navigate = useNavigate();

  // Handle Logout functionality
  const handleLogout = () => {
    // Clear user session or token here
    // Navigate to the home page after logout
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link to="/adminhome" className="hover:bg-gray-700 px-3 py-2 rounded-md">
            Admin Home
          </Link>
          <Link to="/table" className="hover:bg-gray-700 px-3 py-2 rounded-md">
            View Details
          </Link>
          {/* Link to Bar Chart Page */}
          <Link to="/bchart" className="hover:bg-gray-700 px-3 py-2 rounded-md">
            Bar Chart
          </Link>
        </div>

        {/* Logout Button */}
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
