import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import OrderNav from '../Sales/Odernav'; // Import OrderNav

export default function ViewOrder() {
  return (
    <div className="flex">
      <OrderNav /> {/* Include OrderNav */}
      <div className="view-order bg-white p-6 rounded-lg shadow-md flex-1 mx-4 my-4 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-700 text-center">Welcome to Order Management</h2>
        <p className="text-gray-700 mb-6 text-center">
          Here, you can view and manage your orders efficiently. Select an order to see its details and updates.
        </p>

        <Link 
          to="/adminhome" 
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>

      <style>
        {`
          .view-order {
            flex: 1; /* Allow the view order to take remaining space */
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
            display: flex; /* Make it a flex container */
            flex-direction: column; /* Align children in a column */
            align-items: center; /* Center align children horizontally */
            justify-content: center; /* Center align children vertically */
          }
          /* Additional styles for responsiveness */
          @media (max-width: 768px) {
            .view-order {
              margin-left: 0; /* Reset margin for small screens */
              margin-right: 0;
            }
          }
        `}
      </style>
    </div>
  );
}
