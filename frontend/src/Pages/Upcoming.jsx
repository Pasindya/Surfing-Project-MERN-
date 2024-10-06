import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';

const URL = "http://localhost:5009/lessons";

// Function to fetch lessons
const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return { lessons: [] };
  }
};

const Lesson = ({ lesson }) => {
  return (
    <div className="bg-white shadow-xl rounded-lg p-6 mb-8 w-full max-w-xl mx-auto transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl border-l-4 border-pink-500 hover:border-yellow-500">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center mr-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l2 2m-2-2h.01M21 12.5c0 3.57-2.925 6.5-6.5 6.5S8 16.07 8 12.5 10.925 6 14.5 6c2.43 0 4.617.975 6.223 2.552M16.5 3a9.49 9.49 0 00-4.5 1.08A9.49 9.49 0 008 3"/>
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-pink-700 mb-2 hover:text-yellow-600 transition-colors">{lesson.title}</h2>
      </div>
      <div className="flex justify-between mb-4">
        <p className="text-lg"><strong>Date:</strong> {new Date(lesson.date).toLocaleDateString()}</p>
        <p className="text-lg"><strong>Time:</strong> {lesson.time}</p>
      </div>
      <p className="text-lg mb-4"><strong>Location:</strong> {lesson.location}</p>
      <p className="text-lg mb-4"><strong>Description:</strong> {lesson.description}</p>
    </div>
  );
};

export default function Upcoming() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook

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

  if (loading) return <p className="text-center text-teal-500 animate-pulse">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-600 via-blue-500 to-purple-600">
      <Headernav />

      <div className="relative p-16 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 opacity-90 animate-pulse"></div>
        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold mb-6 tracking-widest animate-bounce">Upcoming Surf Lessons</h1>
          <p className="text-2xl mb-6">Catch the waves and learn from the best! Find your next adventure here.</p>
          <button
            onClick={() => navigate('/explorelessons')}
            className="bg-gradient-to-r from-yellow-500 to-pink-500 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-gradient-to-l hover:scale-105 transition-all"
          >
            Explore Lessons
          </button>
        </div>
      </div>

      <div className="flex-1 p-12 bg-white/80 rounded-lg shadow-2xl max-w-5xl mx-auto mt-8">
        {lessons.length > 0 ? (
          lessons.map((lesson) => (
            <Lesson key={lesson._id} lesson={lesson} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No upcoming lessons available.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
