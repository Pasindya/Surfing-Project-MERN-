import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import { FaHome, FaClipboardList, FaThList, FaChartPie, FaSignOutAlt } from 'react-icons/fa'; // Importing icons

export default function Bookingnav() {
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout actions here, e.g., clear user session or authentication tokens
    // localStorage.removeItem('authToken'); // Example: remove token from localStorage

    // Redirect to home page after logout
    navigate('/');
  };

  return (
    <div className="bg-gray-800 text-white h-16 w-full fixed top-0 left-0 flex items-center shadow-md z-50">
      {/* Logo/Title Section */}
      <div className="px-4 text-2xl font-bold border-b border-gray-700">
        Surf School Admin
      </div>

      {/* Navigation Links */}
      <ul className="flex flex-1 justify-around items-center h-full">
        <li>
          <Link to="/adminhome" className="flex items-center p-4 hover:bg-gray-700 transition duration-200 rounded">
            <FaHome className="mr-2 text-xl" />
            <span>Home</span>
          </Link>
        </li>

        <li>
          <Link to="/bookingdetails" className="flex items-center p-4 hover:bg-gray-700 transition duration-200 rounded">
            <FaClipboardList className="mr-2 text-xl" />
            <span>Booking Details</span>
          </Link>
        </li>

        <li>
          <Link to="/bookinglist" className="flex items-center p-4 hover:bg-gray-700 transition duration-200 rounded">
            <FaThList className="mr-2 text-xl" />
            <span>Booking List</span>
          </Link>
        </li>

        {/* Summary Section */}
        <li>
          <Link to="/bookingsummary" className="flex items-center p-4 hover:bg-gray-700 transition duration-200 rounded">
            <FaChartPie className="mr-2 text-xl" />
            <span>Summary</span>
          </Link>
        </li>

        {/* Logout Button */}
        <li>
          <button 
            onClick={handleLogout} // Use button with onClick handler
            className="flex items-center p-4 hover:bg-red-700 transition duration-200 rounded"
          >
            <FaSignOutAlt className="mr-2 text-xl" />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
