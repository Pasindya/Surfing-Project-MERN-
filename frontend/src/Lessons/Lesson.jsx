import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatTime = (timeString) => {
  const time = new Date(`1970-01-01T${timeString}:00`);
  return time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export default function Lesson({ lesson }) {
  const { _id, title, date, time, location, description } = lesson;
  const navigate = useNavigate();

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5009/lessons/${_id}`);
      navigate("/viewlesson"); // Redirect to a lessons list or any appropriate page after deletion
    } catch (error) {
      console.error('Failed to delete lesson:', error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="p-4 mb-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">Lesson Information</h2>
      <p><strong>Id:</strong> {_id}</p>
      <p><strong>Title:</strong> {title}</p>
      <p><strong>Date:</strong> {formatDate(date)}</p>
      <p><strong>Time:</strong> {formatTime(time)}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Description:</strong> {description}</p>
      <div className="mt-4">
        <Link to={`/updatelesson/${_id}`}>
          <button className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600">
            Update
          </button>
        </Link>
        <button
          onClick={deleteHandler}
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
