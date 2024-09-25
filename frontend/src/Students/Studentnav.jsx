import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { FaHome, FaPlusCircle, FaListAlt, FaSignOutAlt, FaCaretDown } from 'react-icons/fa'; 

export default function Studentnav() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false); // For handling dropdown

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="bg-blue-900 text-white shadow-lg w-full fixed top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo/Title Section */}
        <div className="text-2xl font-bold">
          Surf School Admin
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-lg">
          <Link to="/adminhome" className="hover:text-blue-400 flex items-center">
            <FaHome className="mr-2 text-xl" /> Home
          </Link>

          <Link to="/studentdetails" className="hover:text-blue-400 flex items-center">
            <FaListAlt className="mr-2 text-xl" /> Student Details
          </Link>

          <Link to="/addstudent" className="hover:text-blue-400 flex items-center">
            <FaPlusCircle className="mr-2 text-xl" /> Add Student
          </Link>

          {/* Optional Dropdown Example (for something like "Gallery") */}
          <div className="relative group">
            <button
              className="hover:text-blue-400 flex items-center"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              Options <FaCaretDown className="ml-1" />
            </button>

            {showDropdown && (
              <div
                className="absolute top-full left-0 bg-white text-black shadow-lg mt-2 w-48 z-50"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <Link to="/option1" className="block px-4 py-2 hover:bg-gray-200">Option 1</Link>
                <Link to="/option2" className="block px-4 py-2 hover:bg-gray-200">Option 2</Link>
                <Link to="/option3" className="block px-4 py-2 hover:bg-gray-200">Option 3</Link>
              </div>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-700 px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200 flex items-center"
        >
          Logout <FaSignOutAlt className="ml-2 text-xl" />
        </button>
      </div>
    </nav>
  );
}
