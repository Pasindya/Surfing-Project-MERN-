import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation and useNavigate for redirection
import { FaShoppingCart, FaHome } from 'react-icons/fa'; // Import icons

export default function OrderNav() {
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleLogout = () => {
    // Add your logout logic here
    console.log('User logged out');
    
    // Redirect to the admin home page after logout
    navigate('/adminhome');
  };

  return (
    <div className="order-nav bg-blue-700 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Order Management</h2>
      
      <nav className="flex flex-col space-y-4">
        <Link to="/adminhome" className="flex items-center text-white hover:bg-blue-600 p-3 rounded transition duration-200">
          <FaHome className="mr-3" />
          Home
        </Link>
        <Link to="/viewoder" className="flex items-center text-white hover:bg-blue-600 p-3 rounded transition duration-200">
          <FaShoppingCart className="mr-3" />
          View Orders
        </Link>
      </nav>

      <button 
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white p-3 rounded mt-6 transition duration-200 w-full"
      >
        Logout
      </button>

      <style>
        {`
          .order-nav {
            max-width: 280px; /* Slightly reduce the width for better layout */
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Subtle shadow */
            margin: 20px auto; /* Center the nav vertically with space */
          }

          nav {
            display: flex;
            flex-direction: column; /* Ensure vertical stacking */
            gap: 10px; /* Add space between links */
          }

          nav a {
            display: flex;
            align-items: center; /* Align text and icons */
            font-size: 1rem; /* Adjust font size */
            padding: 10px 15px; /* Add more padding for a clickable area */
            transition: background-color 0.3s ease; /* Smooth transition */
          }

          nav a:hover {
            background-color: #0053a0; /* Change hover color to a darker shade */
          }

          button {
            font-size: 1rem; /* Make logout button font larger */
          }

          @media (max-width: 768px) {
            .order-nav {
              max-width: 100%; /* Make it responsive for mobile */
              padding: 20px; /* Adjust padding for smaller screens */
            }

            nav a {
              justify-content: center; /* Center links on mobile */
            }

            h2 {
              font-size: 1.5rem; /* Adjust font size for smaller screens */
            }
          }
        `}
      </style>
    </div>
  );
}
