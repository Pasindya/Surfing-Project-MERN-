import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPlusCircle, FaListAlt } from 'react-icons/fa'; // Importing icons

export default function Bookingnav() {
  return (
    <div className="bg-gray-800 text-white h-screen w-64 fixed top-0 left-0 flex flex-col shadow-md z-50">
      {/* Logo/Title Section */}
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Surf School Admin
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
          <Link to="/bookingdetails" className="flex items-center p-4 hover:bg-gray-700 transition duration-200">
            <FaListAlt className="mr-3 text-xl" />
            <span>Booking Details</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}