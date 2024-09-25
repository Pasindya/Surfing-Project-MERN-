//View Lesoon 

import React from 'react';
import Lessonnav from './Lessonnav';
import Lessondescription from './Lessondescription';

export default function Viewlesson() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <Lessonnav />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 lg:ml-80 lg:p-12">
        {/* Header Section */}
        <header className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-6 px-4 rounded-b-lg shadow-md">
          <h1 className="text-3xl font-bold">View Lesson Details</h1>
          <p className="text-lg mt-2">Explore and manage the lesson details below.</p>
        </header>

        {/* Lesson Description */}
        <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
          <Lessondescription />
        </div>
      </div>
    </div>
  );
}
