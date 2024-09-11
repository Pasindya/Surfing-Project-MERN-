import React, { useState, useEffect } from 'react';
import Lessonnav from './Lessonnav'; // Import the Lessonnav component

export default function Lessonplan() {
  const [lessons, setLessons] = useState([]);

  // Fetch lessons from an API or backend service
  useEffect(() => {
    // Replace with your actual API call
    const fetchLessons = async () => {
      try {
        const response = await fetch('/api/lessons'); // Adjust the URL to your API endpoint
        const data = await response.json();
        setLessons(data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    fetchLessons();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <Lessonnav />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 lg:ml-80 lg:p-12">
        <div className="bg-white shadow-md rounded-lg p-8 mx-auto max-w-4xl mt-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Lesson Plan</h1>

          {/* Lessons List */}
          {lessons.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lessons.map((lesson) => (
                  <tr key={lesson._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lesson.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(lesson.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lesson.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lesson.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lesson.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500">No lessons available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
