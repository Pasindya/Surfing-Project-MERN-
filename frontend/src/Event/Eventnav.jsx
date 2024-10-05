import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaSignOutAlt, FaEdit } from 'react-icons/fa'; // Importing icons from react-icons

export default function Eventnav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any necessary logout operations, such as clearing user data
    localStorage.removeItem('userEvent'); // Clear event data
    navigate('/'); // Redirect to the home page
  };

  return (
    <nav className="bg-blue-600 h-16 shadow-lg"> {/* Set a fixed height for horizontal nav */}
      <div className="flex items-center justify-between p-4"> {/* Flex for horizontal layout */}
        <h1 className="text-white font-bold text-2xl">Event Manager</h1> {/* Header for the nav */}

        {/* Navigation Links */}
        <div className="flex space-x-8"> {/* Horizontal spacing between items */}
          <Link to="/adminhome" className="flex items-center text-white hover:text-gray-200 transition duration-300">
            <FaHome className="mr-1" /> {/* Home Icon */}
            Home
          </Link>
          <Link to="/viewevent/66ff58928cb98d32ca243848" className="flex items-center text-white hover:text-gray-200 transition duration-300">
            <FaCalendarAlt className="mr-1" /> {/* View Event Icon */}
            View Event
          </Link>
          
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="flex items-center text-white hover:text-gray-200 transition duration-300" // No need for margin-top here
        >
          <FaSignOutAlt className="mr-1" /> {/* Logout Icon */}
          Logout
        </button>
      </div>
    </nav>
  );
}
