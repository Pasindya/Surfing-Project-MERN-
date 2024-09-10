import React from 'react';
import Bookingnav from './Bookingnav';
import Bookingdescription from './Bookingdescription';

export default function Viewbooking() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <Bookingnav />
      <div className="container mx-auto py-8 px-4 lg:py-12 lg:px-6">
        <Bookingdescription />
        <div className="flex flex-col items-end text-right mb-8 lg:mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Welcome to Your Booking Details
          </h1>
          <p className="text-lg lg:text-xl text-gray-700">
            We're excited to help you review and manage your bookings! Below you'll find all the details you need.
          </p>
        </div>
        <div className="bg-white shadow-2xl rounded-lg p-8 lg:p-12 text-right transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <p className="text-gray-800 text-lg lg:text-xl">
            Here you can view your booking details. This section will display all the necessary information about your bookings.
          </p>
        </div>
      </div>
    </div>
  );
}