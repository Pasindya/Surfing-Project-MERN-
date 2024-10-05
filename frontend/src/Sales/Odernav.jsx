import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { FaShoppingCart, FaHome, FaClipboardList, FaSignOutAlt, FaListUl } from 'react-icons/fa'; // Import icons

export default function OrderNav() {
  return (
    <div className="bg-gradient-to-b from-blue-800 to-blue-900 text-white h-screen w-64 fixed top-0 left-0 flex flex-col shadow-lg z-50">
      {/* Logo/Title Section */}
      <div className="p-4 text-2xl font-bold border-b border-blue-700 bg-blue-800">
        Order Management
      </div>

      {/* Navigation Links */}
      <ul className="mt-4 flex-1 space-y-2">
        <li>
          <Link
            to="/adminhome"
            className="flex items-center p-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            <FaHome className="mr-3 text-xl transition-transform duration-200 hover:scale-110" />
            <span className="font-medium">Home</span>
          </Link>
        </li>

        <li>
          <Link
            to="/viewoder"
            className="flex items-center p-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            <FaShoppingCart className="mr-3 text-xl transition-transform duration-200 hover:scale-110" />
            <span className="font-medium">View Orders</span>
          </Link>
        </li>

        <li>
          <Link
            to="/odersummary" // Link to Order List
            className="flex items-center p-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            <FaListUl className="mr-3 text-xl transition-transform duration-200 hover:scale-110" />
            <span className="font-medium">Order List</span>
          </Link>
        </li>

        <li>
          <Link
            to="/oderdetail"
            className="flex items-center p-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            <FaClipboardList className="mr-3 text-xl transition-transform duration-200 hover:scale-110" />
            <span className="font-medium">Order Details</span>
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <div className="mt-auto mb-4">
        <Link
          to="/"
          className="flex items-center p-4 rounded-lg hover:bg-red-700 transition duration-200 w-full"
        >
          <FaSignOutAlt className="mr-3 text-xl transition-transform duration-200 hover:scale-110" />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </div>
  );
}
