import React, { useState } from 'react';
import { FaSearch, FaBars, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Headernav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center">
          <img src="public/images/logoh.jpeg" alt="Surf Deck Logo" className="h-8 sm:h-12" />
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ml-2">
            <span className="text-slate-500">Surf</span>
            <span className="text-slate-900">Deck</span>
          </h1>
        </Link>

        {/* Search Bar */}
        <form className="bg-slate-100 p-2 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600 ml-2" aria-label="Search Icon" />
        </form>

        {/* Hamburger Menu for Mobile */}
        <div className="sm:hidden">
          <button
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-slate-700 hover:text-slate-900 focus:outline-none"
          >
            <FaBars className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={`${menuOpen ? "block" : "hidden"} sm:flex gap-4`}>
          <Link to="/packages" className="text-slate-700 hover:underline">
          Packages
          </Link>
          <Link to="/upcoming" className="text-slate-700 hover:underline">
            Lessons
          </Link>
          <Link to="/staff" className="text-slate-700 hover:underline">
            Staff
          </Link>
          <Link to="/events" className="text-slate-700 hover:underline">
            Events
          </Link>
          <Link to="/Eadd" className="text-slate-700 hover:underline">
            Equipments
          </Link>
          <Link to="/payment" className="text-slate-700 hover:underline">
            Payments
          </Link>
          <Link to="/order" className="text-slate-700 hover:underline">
            Supplier
          </Link>
          <Link to="/surfboard" className="text-slate-700 hover:underline">
            Surfboards
          </Link>
          
          
        </nav>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            aria-label="Profile"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="text-slate-700 hover:text-slate-900 focus:outline-none"
          >
            <FaUserCircle className="h-6 w-6 sm:h-8 sm:w-8 " />
          </button>
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
              <Link to="/profile" className="block px-4 py-2 text-slate-700 hover:bg-slate-100">
                Profile
              </Link>
              <Link to="/settings" className="block px-4 py-2 text-slate-700 hover:bg-slate-100">
                Settings
              </Link>
              <Link to="/logout" className="block px-4 py-2 text-slate-700 hover:bg-slate-100">
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-slate-200 shadow-md mt-2">
          <nav className="flex flex-col">
            <Link to="/package" className="px-4 py-2 text-slate-700 hover:bg-slate-100">
              Package
            </Link>
            <Link to="/staff" className="px-4 py-2 text-slate-700 hover:bg-slate-100">
              Staff
            </Link>
            <Link to="/events" className="px-4 py-2 text-slate-700 hover:bg-slate-100">
              Events
            </Link>
            <Link to="/equipments" className="px-4 py-2 text-slate-700 hover:bg-slate-100">
              Equipments
            </Link>
            <Link to="/payment" className="px-4 py-2 text-slate-700 hover:bg-slate-100">
              Payments
            </Link>
            <Link to="/order" className="px-4 py-2 text-slate-700 hover:bg-slate-100">
              Supplier
            </Link>
            <Link to="/support" className="px-4 py-2 text-slate-700 hover:bg-slate-100">
              Support
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}