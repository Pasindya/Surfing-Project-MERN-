import React, { useState } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Headernav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-300 to-slate-200 shadow-lg">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center space-x-3">
          <img src="public/images/logoh.jpeg" className="h-10 sm:h-14 rounded-full shadow-lg" />
          <h1 className="font-bold text-lg sm:text-2xl tracking-wide text-slate-900 flex items-center">
            <span className="text-slate-600">Surf</span>
            <span className="text-blue-800">Deck</span>
          </h1>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <div className="sm:hidden">
          <button
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-slate-700 hover:text-blue-800 focus:outline-none"
          >
            <FaBars className="h-7 w-7" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={`${menuOpen ? 'block' : 'hidden'} sm:flex space-x-6`}>
          <Link to="/packages" className="text-slate-700 hover:text-blue-600 transition duration-300">
            Packages
          </Link>
          <Link to="/upcoming" className="text-slate-700 hover:text-blue-600 transition duration-300">
            Lessons
          </Link>
          <Link to="/staff" className="text-slate-700 hover:text-blue-600 transition duration-300">
            Staff
          </Link>
          <Link to="/events" className="text-slate-700 hover:text-blue-600 transition duration-300">
            Events
          </Link>
          <Link to="/Eadd" className="text-slate-700 hover:text-blue-600 transition duration-300">
            Equipments
          </Link>
          <Link to="/payment" className="text-slate-700 hover:text-blue-600 transition duration-300">
            Payments
          </Link>
          <Link to="/order" className="text-slate-700 hover:text-blue-600 transition duration-300">
            Supplier
          </Link>
          <Link to="/surfboard" className="text-slate-700 hover:text-blue-600 transition duration-300">
            Surfboards
          </Link>
        </nav>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            aria-label="Profile"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="text-slate-700 hover:text-blue-800 focus:outline-none"
          >
            <FaUserCircle className="h-7 w-7 sm:h-8 sm:w-8" />
          </button>
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
             
              <Link to="/registerstu" className="block px-4 py-2 text-slate-700 hover:bg-blue-100">
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-slate-100 shadow-md mt-2">
          <nav className="flex flex-col">
            <Link to="/package" className="px-4 py-2 text-slate-700 hover:bg-blue-100">
              Packages
            </Link>
            <Link to="/staff" className="px-4 py-2 text-slate-700 hover:bg-blue-100">
              Staff
            </Link>
            <Link to="/events" className="px-4 py-2 text-slate-700 hover:bg-blue-100">
              Events
            </Link>
            <Link to="/equipments" className="px-4 py-2 text-slate-700 hover:bg-blue-100">
              Equipments
            </Link>
            <Link to="/payment" className="px-4 py-2 text-slate-700 hover:bg-blue-100">
              Payments
            </Link>
            <Link to="/order" className="px-4 py-2 text-slate-700 hover:bg-blue-100">
              Supplier
            </Link>
            <Link to="/support" className="px-4 py-2 text-slate-700 hover:bg-blue-100">
              Support
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
