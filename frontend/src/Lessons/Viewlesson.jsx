import React, { useState } from 'react';
import Lessonnav from './Lessonnav';
import Lessondescription from './Lessondescription';
import LessonCalendar from './Lessoncalender'; // Import the LessonCalendar component

export default function Viewlesson() {
  // Sample scheduled lessons data
  const [scheduledLessons, setScheduledLessons] = useState([
    { name: 'Surf Lesson', time: '10:00 AM', date: '2024-10-07' }, // Use ISO date format for easier sorting
    { name: 'Yoga Lesson', time: '12:00 PM', date: '2024-10-08' },
    { name: 'Safety Lesson', time: '2:00 PM', date: '2024-10-09' },
    { name: 'Advanced Surf Lesson', time: '11:00 AM', date: '2024-10-06' }, // Added another lesson for demonstration
  ]);

  // Function to handle changes in input fields (for future use)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduledLessons((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <Lessonnav />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 lg:ml-80 lg:p-12">
        {/* Header Section */}
        <header className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-6 px-4 rounded-b-lg shadow-md mb-8">
          <h1 className="text-5xl font-extrabold tracking-tight">View Lesson Details</h1>
          <p className="text-lg mt-2 opacity-90">Explore and manage the lesson details below.</p>
        </header>

        {/* Lesson Overview and Calendar Section */}
        <div className="flex flex-wrap gap-8">
          {/* Lesson Description */}
          <div className="flex-1 bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 duration-300">
            <h2 className="text-3xl font-semibold mb-4 text-blue-600 border-b-2 border-blue-400 pb-2">Lesson Overview</h2>
            <Lessondescription />
          </div>

          {/* Lesson Calendar */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 duration-300 w-full md:w-1/2">
            <h2 className="text-3xl font-semibold mb-4 text-blue-600 border-b-2 border-blue-400 pb-2">Lesson Calendar</h2>
            <LessonCalendar /> {/* Add the Lesson Calendar here */}
          </div>
        </div>
      </div>
    </div>
  );
}
