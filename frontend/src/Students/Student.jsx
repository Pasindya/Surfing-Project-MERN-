import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import axios from 'axios';

export default function Student({ student }) {
  const { _id, name, email, address, mobileno, password } = student;
  const navigate = useNavigate();

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5009/students/${_id}`);
      navigate("/viewstudent"); // Redirect to the 'Viewstudent' page after deletion
    } catch (error) {
      console.error('Failed to delete the student:', error);
    }
  };

  return (
    <div className="p-4 mb-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2 text-blue-900 ">Student Information</h2>
      
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Mobile Number:</strong> {mobileno}</p>
      <p><strong>Password:</strong> {password}</p>
      
      <div className="mt-4">
        <Link to={`/updatestudent/${_id}`}>
          <button className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600">
            Update
          </button>
        </Link>
        <button 
          onClick={deleteHandler}
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
}
