import React, { useState } from 'react';
import Lessonnav from './Lessonnav'; // Import Lessonnav for navigation

export default function Shedulelesson() {
  // State to handle form input values
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDate, setLessonDate] = useState('');
  const [lessonTime, setLessonTime] = useState('');
  const [lessonLocation, setLessonLocation] = useState('');
  const [description, setDescription] = useState(''); // Added description state

  const handleSubmit = (e) => {
    e.preventDefault();
    // Code to handle form submission, like sending data to the server or saving it locally
    console.log({
      lessonTitle,
      lessonDate,
      lessonTime,
      lessonLocation,
      description, // Include description in the form data
    });
    // Reset form after submission
    setLessonTitle('');
    setLessonDate('');
    setLessonTime('');
    setLessonLocation('');
    setDescription(''); // Reset description
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <Lessonnav />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 lg:ml-80 lg:p-12">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-auto">
          {/* Page Header */}
          <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-900">
            Schedule a Lesson
          </h1>

          {/* Lesson Schedule Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Lesson Title */}
            <div>
              <label htmlFor="lessonTitle" className="block text-lg font-medium text-gray-700">
                Lesson Title
              </label>
              <input
                type="text"
                id="lessonTitle"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>

            {/* Lesson Date */}
            <div>
              <label htmlFor="lessonDate" className="block text-lg font-medium text-gray-700">
                Lesson Date
              </label>
              <input
                type="date"
                id="lessonDate"
                value={lessonDate}
                onChange={(e) => setLessonDate(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>

            {/* Lesson Time */}
            <div>
              <label htmlFor="lessonTime" className="block text-lg font-medium text-gray-700">
                Lesson Time
              </label>
              <input
                type="time"
                id="lessonTime"
                value={lessonTime}
                onChange={(e) => setLessonTime(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>

            {/* Lesson Location */}
            <div>
              <label htmlFor="lessonLocation" className="block text-lg font-medium text-gray-700">
                Lesson Location
              </label>
              <input
                type="text"
                id="lessonLocation"
                value={lessonLocation}
                onChange={(e) => setLessonLocation(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                rows="4" // Adjust the number of rows for textarea
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition duration-300"
              >
                Schedule Lesson
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
