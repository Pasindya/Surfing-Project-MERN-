import React from 'react';
import Lessonnav from './Lessonnav'; // Import the Lessonnav component

export default function Viewlesson() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <Lessonnav />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 lg:ml-80 lg:p-12">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-200 to-blue-400 text-center py-8 mb-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">Welcome to Your Lessons</h1>
          <p className="text-lg text-gray-700">
            Here you can view and manage all your lessons. Use the navigation on the left to access different sections of the instructor dashboard.
          </p>
        </div>

        {/* Content Area */}
        <div className="bg-white shadow-2xl rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Manage Your Lessons</h2>
          <p className="text-lg text-gray-700">
            This section is where you can review your lesson details, make updates, and manage your schedule. Please use the navigation bar to access other features and sections.
          </p>
          {/* Add more content or components here as needed */}
        </div>
      </div>
    </div>
  );
}
