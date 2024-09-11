import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook for programmatic navigation
import { FaHome, FaChalkboardTeacher, FaBook, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa'; // Importing icons

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
        Instructor Dashboard
      </div>

      {/* Navigation Links */}
      <ul className="mt-4 flex-1">
        <li>
          <Link 
            to="/adminhome" 
            className="flex items-center p-4 hover:bg-gray-700 transition duration-200 group"
          >
            <FaHome className="mr-3 text-xl group-hover:text-yellow-400" />
            <span className="group-hover:text-yellow-400">Home</span>
          </Link>
        </li>

        <li>
          <Link 
            to="/lesson" 
            className="flex items-center p-4 hover:bg-gray-700 transition duration-200 group"
          >
            <FaChalkboardTeacher className="mr-3 text-xl group-hover:text-yellow-400" />
            <span className="group-hover:text-yellow-400">My Lessons</span>
          </Link>
        </li>

        <li>
          <Link 
            to="/lessondetails" 
            className="flex items-center p-4 hover:bg-gray-700 transition duration-200 group"
          >
            <FaBook className="mr-3 text-xl group-hover:text-yellow-400" />
            <span className="group-hover:text-yellow-400">Lesson Plans</span>
          </Link>
        </li>

        <li>
          <Link 
            to="/shedulelesson" 
            className="flex items-center p-4 hover:bg-gray-700 transition duration-200 group"
          >
            <FaCalendarAlt className="mr-3 text-xl group-hover:text-yellow-400" />
            <span className="group-hover:text-yellow-400">Schedule</span>
          </Link>
        </li>

        {/* Logout Button */}
        <li className="mt-auto">
          <button 
            onClick={handleLogout} // Use button with onClick handler
            className="flex items-center p-4 hover:bg-red-700 transition duration-200 group w-full text-left"
          >
            <FaSignOutAlt className="mr-3 text-xl group-hover:text-yellow-400" />
            <span className="group-hover:text-yellow-400">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
