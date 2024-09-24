import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaListAlt, FaPlusCircle, FaSignOutAlt, FaTable } from 'react-icons/fa';

export default function LessonNav() {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout actions here, e.g., clear user session or authentication tokens
    // localStorage.removeItem('authToken'); // Example: remove token from localStorage

    // Redirect to home page after logout
    navigate('/');
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white h-screen w-64 fixed top-0 left-0 flex flex-col shadow-lg z-50">
      {/* Logo/Title Section */}
      <div className="p-4 text-2xl font-bold border-b border-gray-700 bg-gray-800">
        Lesson Management
      </div>

      {/* Navigation Links */}
      <ul className="mt-4 flex-1 space-y-2">
        <li>
          <Link
            to="/adminhome"
            className="flex items-center p-4 rounded-lg hover:bg-gray-700 transition duration-200"
          >
            <FaHome className="mr-3 text-xl transition-transform duration-200 hover:scale-110" />
            <span className="font-medium">Home</span>
          </Link>
        </li>

        <li>
          <Link
            to="/lessondetails"
            className="flex items-center p-4 rounded-lg hover:bg-gray-700 transition duration-200"
          >
            <FaListAlt className="mr-3 text-xl transition-transform duration-200 hover:scale-110" />
            <span className="font-medium">Lesson Details</span>
          </Link>
        </li>

        <li>
          <Link
            to="/addlesson"
            className="flex items-center p-4 rounded-lg hover:bg-gray-700 transition duration-200"
          >
            <FaPlusCircle className="mr-3 text-xl transition-transform duration-200 hover:scale-110" />
            <span className="font-medium">Add Lesson</span>
          </Link>
        </li>

        {/* New Lessons List Link */}
        <li>
          <Link
            to="/lessonlist"
            className="flex items-center p-4 rounded-lg hover:bg-gray-700 transition duration-200"
          >
            <FaTable className="mr-3 text-xl transition-transform duration-200 hover:scale-110" />
            <span className="font-medium">Lessons List</span>
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <div className="mt-auto mb-4">
        <button
          onClick={handleLogout}
          className="flex items-center p-4 rounded-lg hover:bg-red-700 transition duration-200 w-full text-left"
        >
          <FaSignOutAlt className="mr-3 text-xl transition-transform duration-200 hover:scale-110" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
