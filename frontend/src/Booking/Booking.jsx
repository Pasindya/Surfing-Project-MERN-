import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import axios from 'axios';

export default function Booking({ booking }) {
  const { _id, name, packagename, email, mobileno, address } = booking;
  const navigate = useNavigate();

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5009/bookings/${_id}`);
      navigate("/viewbooking"); // Redirect to home after deletion
      // Optionally navigate to booking details or any other page
    } catch (error) {
      console.error('Failed to delete the booking:', error);
    }
  };

  return (
    <div className="p-4 mb-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">Booking Information</h2>
      <p><strong>Id:</strong> {_id}</p>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Package Name:</strong> {packagename}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Mobile Number:</strong> {mobileno}</p>
      <p><strong>Address:</strong> {address}</p>
      <div className="mt-4">
        <Link to={`/bookingdetails/${_id}`}>
          <button className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600">
            Update
          </button>
        </Link>
        <button onClick={deleteHandler}
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
}
