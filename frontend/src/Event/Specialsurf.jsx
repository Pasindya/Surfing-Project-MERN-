// src/Pages/Event.jsx

import React from 'react';
import { Link } from 'react-router-dom';  // Import the Link component
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';

export default function Event() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between relative">
      <Headernav />
      
      {/* Main Content */}
      <div className="relative">
        {/* Background Image */}
        <div
          className="w-full h-screen bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/specialback.jpg)', // Replace with the actual image URL
          }}
        >
          {/* Overlay with content */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Text and Price Section */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-3">
            {/* Heading with rounded shadow, hover shadow, transform, yellow, and black */}
            <h1 className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-700 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:from-orange-700 hover:to-yellow-600">
              Special Event
            </h1>
            
            <p className="text-center max-w-xl text-lg mb-5">
              Join us for a series of exclusive events designed to celebrate achievements, foster community spirit, and create unforgettable memories. Whether you're looking to honor accomplishments or simply enjoy a great time with peers, our special events cater to all.
            </p>

            {/* Special Events List */}
            <div className="bg-black bg-opacity-70 p-2 rounded-lg mb-8">
             
              <ul className="list-disc list-inside space-y-1 text-lg">
                <li>Award Ceremonies</li>
                <li>Level Up Ceremonies</li>
                <li>Annual Get-Togethers</li>
                <li>Batch Parties</li>
                <li>Beach Parties</li>
              </ul>
            </div>

            {/* Event Prices */}
            <div className="bg-black bg-opacity-70 p-2 rounded-lg">
              <h2 className="text-3xl font-semibold mb-4">Event Prices</h2>
              <ul className="space-y-4">
                <li className="flex justify-between text-xl">
                  <span>For Beginners</span>
                  <span className="font-bold">$ 6</span>
                </li>
                <li className="flex justify-between text-xl">
                  <span>For Intermediates</span>
                  <span className="font-bold">$ 12</span>
                </li>
                <li className="flex justify-between text-xl">
                  <span>For Experts</span>
                  <span className="font-bold">$ 18</span>
                </li>
              </ul>
            </div>

            {/* Let's Go Button - Link to Event Register page */}
            <Link to="/eventregister">
              <button className="mt-10 bg-yellow-500 text-black px-8 py-2 rounded-full text-2xl font-bold shadow-lg transition-colors duration-300 ease-in-out transform hover:scale-105 hover:bg-black hover:text-yellow-500">
                Let's Go
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* "Pay" Button Positioned at Bottom-Right */}
      <Link to="/payment"> {/* Adjust the 'to' prop to your desired payment route */}
        <button className="fixed bottom-20 right-5 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-transform duration-300 ease-in-out transform hover:scale-110">
           Pay
        </button>
      </Link>

      <Footer />
    </div>
  );
}
