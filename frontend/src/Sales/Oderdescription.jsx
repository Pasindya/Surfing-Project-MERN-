import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import OrderNav from '../Sales/Odernav'; // Import OrderNav

export default function OrderDescription() {
  return (
    <div className="flex flex-col md:flex-row">
      <OrderNav /> {/* Include OrderNav */}
      
      <div className="order-description bg-white p-6 rounded-lg shadow-md flex-1 mx-4 my-4">
        <h2 className="text-3xl font-bold mb-4 text-blue-700">Order Details</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          This page provides detailed information about a specific order, including customer details, items ordered, total amount, and order status. Staff can efficiently manage and track orders to ensure customer satisfaction.
        </p>
        
        <Link 
          to="/oderdetail" 
          className="mt-4 inline-block bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
        >
          Back to Orders
        </Link>
      </div>

      <style>
        {`
          .order-description {
            flex: 1; /* Take remaining space */
            margin: 1rem; /* Add margin for better spacing */
            padding: 2rem; /* Increase padding for readability */
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
            transition: all 0.3s ease-in-out;
          }

          .order-description:hover {
            transform: translateY(-3px); /* Add a subtle hover effect */
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15); /* Enhance the shadow on hover */
          }

          /* Responsive styles for small screens */
          @media (max-width: 768px) {
            .order-description {
              margin: 0 1rem;
              padding: 1.5rem;
            }

            .flex {
              flex-direction: column;
            }
          }
        `}
      </style>
    </div>
  );
}


