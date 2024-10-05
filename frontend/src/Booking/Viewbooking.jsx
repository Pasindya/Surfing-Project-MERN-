import React from 'react';
import Bookingnav from './Bookingnav';
import Bookingdescription from './Bookingdescription';

export default function Viewbooking() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Bookingnav />
      <div className="container mx-auto py-12 px-6 lg:py-16 lg:px-8">
        <div className="flex flex-col items-center mb-10 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-wide leading-tight">
            Welcome to Your Booking Details
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-2xl">
            We're excited to help you review and manage your bookings! Below you'll find all the details you need.
          </p>
        </div>
        <div className="bg-white shadow-2xl rounded-lg p-8 lg:p-12 max-w-4xl mx-auto transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <Bookingdescription />
          <p className="mt-6 text-gray-700 text-lg lg:text-xl">
            Here you can view your booking details. This section will display all the necessary information about your bookings.
          </p>
        </div>
      </div>
      <style>
        {`
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>
    </div>
  );
}
