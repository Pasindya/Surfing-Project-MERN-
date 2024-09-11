import React from 'react';

export default function Lessondescription() {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-6 mb-6 rounded-lg shadow-md transition-transform transform scale-95 hover:scale-100 ease-in-out duration-300">
      <h1 className="text-2xl font-bold mb-2 text-center">Lesson Overview</h1>
      <p className="text-lg">
        This section provides an overview of the lessons you are teaching. Here, you can find details about upcoming classes, featured lessons, and general information to help you stay organized and prepared.
      </p>
      <p className="mt-4 text-gray-700">
        Manage your lesson details, track progress, and ensure that everything is on track with our intuitive system. Keep an eye on your schedule and make adjustments as needed to provide the best experience for your students.
      </p>
    </div>
  );
}
