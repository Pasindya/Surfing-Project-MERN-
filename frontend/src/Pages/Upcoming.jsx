import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Headernav from '../Components/Headernav'; // Ensure this path is correct
import Footer from '../Components/Footer'; // Ensure this path is correct

// Correct URL
const URL = "http://localhost:5009/lessons";

// Function to fetch lessons
const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return { lessons: [] }; // Return an empty array if an error occurs
  }
};

// Define the Lesson component to display individual lesson details
const Lesson = ({ lesson }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full max-w-xl mx-auto border-l-4 border-blue-500 hover:bg-blue-50 transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mr-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l2 2m-2-2h.01M21 12.5c0 3.57-2.925 6.5-6.5 6.5S8 16.07 8 12.5 10.925 6 14.5 6c2.43 0 4.617.975 6.223 2.552M16.5 3a9.49 9.49 0 00-4.5 1.08A9.49 9.49 0 008 3"/>
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-blue-700 mb-2">{lesson.title}</h2>
      </div>
      <p className="text-center text-lg mb-2"><strong>Date:</strong> {new Date(lesson.date).toLocaleDateString()}</p>
      <p className="text-center text-lg mb-2"><strong>Time:</strong> {lesson.time}</p>
      <p className="text-center text-lg mb-2"><strong>Location:</strong> {lesson.location}</p>
      <p className="text-center text-lg mb-4"><strong>Description:</strong> {lesson.description}</p>
    </div>
  );
};

export default function Upcoming() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await fetchHandler();
        const today = new Date();
        const upcomingLessons = data.lessons.filter(lesson => new Date(lesson.date) >= today);
        setLessons(upcomingLessons);
      } catch (err) {
        setError('Failed to fetch lessons.');
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Headernav />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-8 text-center text-white">
        <h1 className="text-4xl font-extrabold mb-4">Upcoming Surf Lessons</h1>
        <p className="text-lg">Catch the waves with our exciting surf lessons! Check out what's coming up.</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="w-full max-w-2xl mx-auto">
          {lessons.length > 0 ? (
            lessons.map((lesson) => (
              <Lesson key={lesson._id} lesson={lesson} />
            ))
          ) : (
            <p className="text-gray-500 text-center">No upcoming lessons available.</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
