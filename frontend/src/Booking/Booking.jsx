import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function Booking({ booking }) {
  const { _id, name, packagename, email, mobileno, address } = booking;

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
        <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
}