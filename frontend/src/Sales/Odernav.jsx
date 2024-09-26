import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHome, FaSignOutAlt, FaClipboardList } from 'react-icons/fa';

export default function OrderNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/adminhome'); // Redirect to the admin home page after logout
  };

  return (
    <div className="order-nav bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-xl shadow-xl max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center tracking-wide">Order Management</h2>

      <nav className="flex flex-col space-y-4"> {/* Maintain vertical alignment */}
        <Link
          to="/adminhome"
          className="flex items-center justify-start bg-white bg-opacity-10 text-white hover:bg-opacity-20 p-4 rounded-lg transition duration-300 ease-in-out shadow-sm"
        >
          <FaHome className="mr-4 text-xl" />
          <span className="text-lg font-medium">Home</span>
        </Link>
        <Link
          to="/vieworder" // Fixed typo from viewoder to vieworder
          className="flex items-center justify-start bg-white bg-opacity-10 text-white hover:bg-opacity-20 p-4 rounded-lg transition duration-300 ease-in-out shadow-sm"
        >
          <FaShoppingCart className="mr-4 text-xl" />
          <span className="text-lg font-medium">View Orders</span>
        </Link>
        <Link
          to="/oderdetail" // Fixed typo from oderdetail to orderdetail
          className="flex items-center justify-start bg-white bg-opacity-10 text-white hover:bg-opacity-20 p-4 rounded-lg transition duration-300 ease-in-out shadow-sm"
        >
          <FaClipboardList className="mr-4 text-xl" />
          <span className="text-lg font-medium">Order Details</span>
        </Link>
      </nav>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-sm text-lg font-semibold"
        >
          <FaSignOutAlt className="mr-3 text-xl" />
          Logout
        </button>
      </div>

      <style>
        {`
          .order-nav {
            background: linear-gradient(to right, #1c92d2, #f2fcfe);
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
          }

          h2 {
            color: #f0f4f8;
            font-family: 'Poppins', sans-serif;
          }

          nav a {
            font-size: 1.25rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            padding: 15px 20px; // Added padding for better click area
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            transition: transform 0.3s, background-color 0.3s;
          }

          nav a:hover {
            background-color: rgba(255, 255, 255, 0.15);
            transform: translateY(-3px);
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
          }

          button {
            background-color: #e63946;
            font-family: 'Poppins', sans-serif;
            font-size: 1.25rem;
            font-weight: 600;
            padding: 15px;
            border-radius: 12px;
            transition: background-color 0.3s, transform 0.3s;
          }

          button:hover {
            background-color: #d62839;
            transform: translateY(-3px);
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
          }

          @media (max-width: 768px) {
            .order-nav {
              padding: 30px;
            }

            h2 {
              font-size: 2rem;
            }

            nav a {
              padding: 12px 16px;
              font-size: 1.1rem;
            }

            button {
              padding: 12px;
            }
          }
        `}
      </style>
    </div>
  );
}
