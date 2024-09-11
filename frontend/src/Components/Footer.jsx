import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center flex-col sm:flex-row">
          {/* Logo and Description */}
          <div className="mb-6 sm:mb-0">
            <Link to="/" className="flex items-center">
             
              <h1 className="font-bold text-lg sm:text-2xl ml-3">
                <span className="text-slate-500">Surf</span>
                <span className="text-white">Deck</span>
              </h1>
            </Link>
            <p className="mt-2 text-sm sm:text-base text-slate-400">
              Your ultimate surfing companion. Join us for unforgettable surfing experiences.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mb-6 sm:mb-0">
            <h2 className="font-bold text-base sm:text-lg mb-2">Contact Us</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              <span className="block">Phone: +123 456 7890</span>
              <span className="block">Email: info@surfdeck.com</span>
              <span className="block">Address: 123 Surf Lane, Beach City, CA</span>
            </p>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col sm:flex-row gap-4 text-sm sm:text-base">
            <Link to="/aboutus">
              <li className="hover:underline">AboutUs</li>
            </Link>
            <Link to="/packages">
              <li className="hover:underline">Packages</li>
            </Link>
            <Link to="/events">
              <li className="hover:underline">Events</li>
            </Link>
            <Link to="/Support">
              <li className="hover:underline">Support</li>
            </Link>
           
            <Link to="/adminhome">
              <li className="hover:underline">Dashboard</li>
            </Link>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="mt-6 flex justify-center sm:justify-end space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="text-slate-400 hover:text-white" size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-slate-400 hover:text-white" size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-slate-400 hover:text-white" size={20} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-slate-400 hover:text-white" size={20} />
          </a>
        </div>

        {/* Footer Bottom Text */}
        <div className="mt-6 text-center text-slate-500 text-xs">
          &copy; 2024 Surf Deck. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}