import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Updated for React Router v6
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons for edit and delete
import Lessonnav from './Lessonnav'; // Import the Lessonnav component

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
const Lesson = ({ lesson, onDelete }) => {
  const navigate = useNavigate();

  // Delete lesson handler
  const deleteLesson = async () => {
    try {
      await axios.delete(`${URL}/${lesson._id}`);
      onDelete(lesson._id); // Call the function to update the lesson list
      alert('Lesson deleted successfully!');
    } catch (error) {
      console.error('Error deleting the lesson:', error);
    }
  };

  // Edit lesson handler
  const editLesson = () => {
    navigate(`/edit-lesson/${lesson._id}`); // Navigate to the edit page
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-4">{lesson.title}</h2>
      <p className="text-center text-lg mb-2"><strong>Date:</strong> {new Date(lesson.date).toLocaleDateString()}</p>
      <p className="text-center text-lg mb-2"><strong>Time:</strong> {lesson.time}</p>
      <p className="text-center text-lg mb-2"><strong>Location:</strong> {lesson.location}</p>
      <p className="text-center text-lg mb-4"><strong>Description:</strong> {lesson.description}</p>

      <div className="flex justify-center space-x-4">
        {/* Edit Button */}
        <button
          onClick={editLesson}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
        >
          <FaEdit className="text-xl" />
        </button>

        {/* Delete Button */}
        <button
          onClick={deleteLesson}
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300"
        >
          <FaTrash className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default function Lessondetails() {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  // Fetch lessons when the component is mounted
  useEffect(() => {
    fetchHandler().then((data) => setLessons(data.lessons));
  }, []);

  // Handler to update the lesson list after deletion
  const handleDelete = (id) => {
    setLessons((prevLessons) => prevLessons.filter((lesson) => lesson._id !== id));
  };

  return (
    <div className="flex">
      {/* Lesson Navigation Bar */}
      <Lessonnav />
      
      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gray-100 p-8 ml-64"> {/* Adjust margin for sidebar */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Lesson Details</h1>

        <div className="w-full max-w-2xl mx-auto">
          {lessons.length > 0 ? (
            lessons.map((lesson, i) => (
              <Lesson key={i} lesson={lesson} onDelete={handleDelete} />
            ))
          ) : (
            <p className="text-gray-500 text-center">No lessons available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
