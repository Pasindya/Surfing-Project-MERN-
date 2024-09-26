import React, { useEffect, useState } from 'react';
import axios from "axios";
import Addoder from './Addoder'; // Assuming this component is needed elsewhere
import Oder from './Oder';
import OrderNav from '../Sales/Odernav'; // Import the OrderNav component

const URL = "http://localhost:5009/users"; // Fixed URL capitalization

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

export default function Oderdetail() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  return (
    <div className="order-detail-container">
      <div className="sidebar">
        <OrderNav /> {/* Render the OrderNav component here */}
      </div>
      <div className="main-content">
        <h1 className="heading">Order Details Display Page</h1>
        <div className="order-list">
          {users && users.map((user, i) => (
            <div key={i} className="order-item">
              <Oder user={user} />
            </div>
          ))}
        </div>
      </div>

      {/* Internal CSS */}
      <style>
        {`
          .order-detail-container {
            display: flex;
            padding: 20px;
            max-width: 1000px;
            margin: 0 auto;
          }

          .sidebar {
            width: 250px; /* Set a fixed width for the sidebar */
            margin-right: 20px; /* Space between sidebar and main content */
          }

          .main-content {
            flex: 1; /* Takes the remaining space */
          }

          .heading {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 30px;
            color: #333;
          }

          .order-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
          }

          .order-item {
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }

          .order-item:hover {
            transform: translateY(-5px);
            transition: all 0.3s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}
