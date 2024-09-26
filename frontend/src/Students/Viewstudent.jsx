import React from 'react';
import Studentnav from './Studentnav';
import Studentdescription from './Studentdescription';

export default function Viewstudent() {
  return (
    <div className="flex min-h-screen bg-cover bg-center"   style={{ backgroundImage: "url('/images/img2.jpg')" }}>
      {/* Sidebar Navigation */}
      <Studentnav />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 p-6 lg:p-12 lg:pl-16"> {/* Adjusted padding to create space */}
        {/* Header Section */}
        <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-8 px-6 lg:px-8 rounded-lg shadow-lg mb-8">
          <h1 className="text-4xl font-extrabold mb-2">Student Details</h1>
          <p className="text-lg text-blue-200">View and manage all the student information here.</p>
        </header>

        {/* Main Card Section */}
        <div className="bg-white shadow-md rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Details Overview</h2>
          <p className="text-gray-600 mb-6">
            Below you can find detailed information about the students in your school.
            You can update, edit, or remove details as necessary.
          </p>

          {/* Student Description Section */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <Studentdescription />
          </div>
        </div>
      </div>
    </div>
  );
}
