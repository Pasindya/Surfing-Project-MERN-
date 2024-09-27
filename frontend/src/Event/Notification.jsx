import React from 'react';
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';
import { FaBell, FaEnvelope, FaCalendarAlt } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

export default function Event() {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/notify.jpg')" }}>
      {/* Header */}
      <Headernav />

      {/* Notifications and Calendar Section */}
      <div className="relative">
        {/* Background Image */}
        <div className="relative h-72 bg-cover bg-center" style={{ backgroundImage: "url('/images/sunset.jpg')" }}>
          <div className="absolute inset-0 bg-yellow-900 opacity-60"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <h1 className="text-white text-4xl font-bold">Notifications & Calendar</h1>
          </div>
        </div>

        {/* Notification and Email Icons */}
        <div className="absolute top-4 right-4 flex space-x-4">
          <FaBell className="text-white text-3xl hover:text-gray-200 cursor-pointer" />
          <FaEnvelope className="text-white text-3xl hover:text-gray-200 cursor-pointer" />
        </div>
      </div>

      {/* Notification Details */}
      <div className="max-w-3xl mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">NOTIFICATIONS</h2>
        <p className="bg-blue-100 p-4 rounded-lg shadow-lg">
          Annual get-together on 5th of October
        </p>
      </div>

      {/* Upcoming Events Section */}
      <div className="max-w-3xl mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
        <div className="space-y-4">
          <button className="block w-full bg-green-200 hover:bg-green-300 text-lg font-medium py-3 rounded-lg shadow-sm transition-colors">
            Board surfing event for beginners
          </button>
          <button className="block w-full bg-blue-200 hover:bg-blue-300 text-lg font-medium py-3 rounded-lg shadow-sm transition-colors">
            Wind surfing event for intermediates
          </button>
          <button className="block w-full bg-yellow-200 hover:bg-yellow-300 text-lg font-medium py-3 rounded-lg shadow-sm transition-colors">
            Boat surfing event for experts
          </button>
        </div>
      </div>

      {/* Calendar Icon and Back Button */}
      <div className="max-w-3xl mx-auto py-8 px-4 text-center">
        <FaCalendarAlt className="text-6xl mx-auto text-gray-700 mb-6" />
        
        {/* Wrap Back button with Link */}
        <Link to="/events">
          <button className="bg-blue-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
            Back
          </button>
        </Link>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
