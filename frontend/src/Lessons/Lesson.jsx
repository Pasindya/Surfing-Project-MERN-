import React from 'react';

export default function Lesson(props) {
  const { _id, title, date, time, location, description } = props.lesson;

  return (
    <div className="bg-gradient-to-r from-indigo-100 to-blue-100 p-6 rounded-2xl shadow-lg mb-8 max-w-lg mx-auto transition-all hover:shadow-2xl hover:scale-105 duration-300 ease-in-out">
      <h2 className="text-4xl font-extrabold text-indigo-700 mb-6 text-center">Lesson Information</h2>

      <div className="text-lg mb-3">
        <strong className="text-indigo-900">Lesson ID:</strong> <span className="text-gray-700">{_id}</span>
      </div>

      <div className="text-lg mb-3">
        <strong className="text-indigo-900">Title:</strong> <span className="text-gray-700">{title}</span>
      </div>

      <div className="text-lg mb-3">
        <strong className="text-indigo-900">Date:</strong> <span className="text-gray-700">{new Date(date).toLocaleDateString()}</span>
      </div>

      <div className="text-lg mb-3">
        <strong className="text-indigo-900">Time:</strong> <span className="text-gray-700">{time}</span>
      </div>

      <div className="text-lg mb-3">
        <strong className="text-indigo-900">Location:</strong> <span className="text-gray-700">{location}</span>
      </div>

      <div className="text-lg mb-5">
        <strong className="text-indigo-900">Description:</strong> <span className="text-gray-700">{description}</span>
      </div>

      <div className="flex justify-between items-center">
        {/* Update Button */}
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-700 transform hover:-translate-y-1 transition-transform duration-300 ease-in-out"
        >
          Update
        </button>

        {/* Delete Button */}
        <button
          className="bg-red-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-red-700 transform hover:-translate-y-1 transition-transform duration-300 ease-in-out"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
