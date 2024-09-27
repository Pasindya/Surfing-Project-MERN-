import React from 'react';
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { IoMdNotificationsOutline } from 'react-icons/io'; // Import a notification icon from react-icons

export default function Events() {
  return (
    <div className="bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-500 min-h-screen flex flex-col justify-between relative">
      <Headernav />

      {/* Notification Icon */}
      <div className="absolute top-20 right-6 z-20">
        <Link to="/notification"> {/* Add a link to the notifications page */}
          <button className="relative p-3 bg-yellow-500 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
            <IoMdNotificationsOutline className="text-white text-3xl" />
            {/* Notification badge (optional) */}
            <span className="absolute top-6 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">3</span>
          </button>
        </Link>
      </div>

      <div className="p-6 max-w-3xl mx-auto my-12 bg-white shadow-2xl rounded-lg transition-transform transform hover:scale-105 hover:rotate-1">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-pulse mb-6">
          Event Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Board Surfing */}
          <div className="bg-gradient-to-b from-white to-blue-100 p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow hover:scale-105">
            <img
              src="/images/event1.jpg" // Replace with actual image URL
              alt="Surfboard"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h3 className="text-xl font-semibold mt-4 text-blue-900">Board Surfing</h3>
            <p className="text-gray-700 mt-2">
              Board surfing is a water sport where a rider stands or lies on a surfboard and rides ocean waves towards the shore...
            </p>
            <div className="mt-4">
              <Link to="/boardsurf">
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-lg hover:bg-blue-600 transition-colors">
                  Explore Board Surfing
                </button>
              </Link>
            </div>
          </div>

          {/* Boat Surfing */}
          <div className="bg-gradient-to-b from-white to-blue-100 p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow hover:scale-105">
            <img
              src="/images/event2.jpg" // Replace with actual image URL
              alt="Boat"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h3 className="text-xl font-semibold mt-4 text-blue-900">Boat Surfing</h3>
            <p className="text-gray-700 mt-2">
              Boat surfing, also known as wakesurfing, is a water sport where a rider surfs the wake created by a moving boat...
            </p>
            <div className="mt-4">
              <Link to="/boatsurf">
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                  Explore Boat Surfing
                </button>
              </Link>
            </div>
          </div>

          {/* Wind Surfing */}
          <div className="bg-gradient-to-b from-white to-blue-100 p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow hover:scale-105">
            <img
              src="/images/event3.jpg" // Replace with actual image URL
              alt="Windsurf"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h3 className="text-xl font-semibold mt-4 text-blue-900">Wind Surfing</h3>
            <p className="text-gray-700 mt-2">
              Windsurfing is a water sport that combines surfing and sailing, using wind power to glide across the water...
            </p>
            <div className="mt-4">
              <Link to="/windsurf">
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                  Explore Wind Surfing
                </button>
              </Link>
            </div>
          </div>

          {/* Special Events */}
          <div className="bg-gradient-to-b from-white to-blue-100 p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow hover:scale-105">
            <img
              src="/images/event4.jpg" // Replace with actual image URL
              alt="Special Events"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h3 className="text-xl font-semibold mt-4 text-blue-900">Special Events</h3>
            <p className="text-gray-700 mt-2">
              There are award ceremonies, level-up ceremonies, batch parties, and beach parties in the surfing school...
            </p>
            <div className="mt-4">
              <Link to="/specialsurf">
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                  Explore Special Events
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
