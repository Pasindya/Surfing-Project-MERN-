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
    // Confirm deletion with the user
    const confirmed = window.confirm("Are you sure you want to delete this lesson?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5009/lessons/${_id}`);
        navigate("/viewlesson"); // Redirect after deletion
      } catch (error) {
        console.error('Failed to delete lesson:', error);
        // Optionally, show an error message to the user
      }
    }
  };

  return (
    <div className="p-4 mb-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Lesson Information</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">Field</th>
            <th className="py-2 px-4 border-b">Value</th>
          </tr>
        </thead>
        <tbody>
          {[ 
            { label: "Id", value: _id },
            { label: "Title", value: title },
            { label: "Date", value: formatDate(date) },
            { label: "Time", value: formatTime(time) },
            { label: "Location", value: location },
            { label: "Description", value: description },
          ].map((row, index) => (
            <tr key={index} className="hover:bg-gray-100 transition duration-200">
              <td className="py-2 px-4 border-b font-bold">{row.label}</td>
              <td className="py-2 px-4 border-b">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
