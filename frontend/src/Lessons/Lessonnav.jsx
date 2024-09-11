import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import { FaHome, FaListAlt, FaPlusCircle, FaSignOutAlt } from 'react-icons/fa'; // Importing icons

export default function Lessonnav() {
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout actions here, e.g., clear user session or authentication tokens
    // localStorage.removeItem('authToken'); // Example: remove token from localStorage

    // Redirect to home page after logout
    navigate('/');
  };

  return (
    <div className="bg-gray-800 text-white h-screen w-64 fixed top-0 left-0 flex flex-col shadow-md z-50">
      {/* Logo/Title Section */}
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Lesson Management
      </div>

      {/* Navigation Links */}
      <ul className="mt-4 flex-1">
        <li>
          <Link to="/adminhome" className="flex items-center p-4 hover:bg-gray-700 transition duration-200">
            <FaHome className="mr-3 text-xl" />
            <span>Home</span>
          </Link>
        </li>

        <li>
          <Link to="/lessondetails" className="flex items-center p-4 hover:bg-gray-700 transition duration-200">
            <FaListAlt className="mr-3 text-xl" />
            <span>Lesson Details</span>
          </Link>
        </li>

        <li>
          <Link to="/addlesson" className="flex items-center p-4 hover:bg-gray-700 transition duration-200">
            <FaPlusCircle className="mr-3 text-xl" />
            <span>Add Lesson</span>
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={handleLogout} // Use button with onClick handler
          className="flex items-center p-4 hover:bg-red-700 transition duration-200 w-full text-left"
        >
          <FaSignOutAlt className="mr-3 text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
