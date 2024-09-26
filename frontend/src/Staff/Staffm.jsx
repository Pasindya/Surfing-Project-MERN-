import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Staffm(props) {
  const { _id, name, gmail, age, address, experience, password } = props.staff;
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/upstaff/${_id}`); // Navigate to update page with staff ID
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5009/staff/${_id}`);
      alert('Staff member deleted successfully.');
      window.location.reload(); // Refresh the page to reflect changes
    } catch (error) {
      console.error('Error deleting staff member:', error);
      alert('Error deleting staff member.');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
      <h1 className="text-xl font-bold mb-2">Staff Member Details</h1>
      <p><strong>ID:</strong> {_id}</p>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {gmail}</p>
      <p><strong>Age:</strong> {age || 'Not provided'}</p>
      <p><strong>Address:</strong> {address || 'Not provided'}</p>
      <p><strong>Experience:</strong> {experience || 'Not provided'}</p>
      <p><strong>Password:</strong> {password || 'Not provided'}</p> {/* Display password field */}
      <div className="mt-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
