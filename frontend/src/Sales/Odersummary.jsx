import React, { useEffect, useState } from 'react';
import axios from 'axios';

import OrderNav from './Odernav';

const URL = "http://localhost:5009/users"; // Ensure the URL is correct

export default function OrderSummary() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(URL);
        setUsers(response.data.users); // Assuming the structure of the response has users in data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="order-summary-container">
      <OrderNav /> {/* Add Navigation component here */}
      <h1 className="summary-heading">Order Summary</h1>
      {users.length > 0 ? (
        <table className="summary-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Card Number</th>
              <th>MM/YY</th>
              <th>CVC</th>
              <th>Surfboard Type</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.pnumber}</td>
                <td>{user.address}</td>
                <td>{user.cnumber}</td>
                <td>{user.mmyy}</td>
                <td>{user.cvc}</td>
                <td>{user.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No order details available.</p>
      )}

      <style>
        {`
          .order-summary-container {
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
            background-color: #f0f4f8;
            border-radius: 12px;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
          }
          .summary-heading {
            text-align: center;
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 20px;
            color: #333;
          }
          .summary-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          .summary-table th, .summary-table td {
            padding: 10px;
            border: 1px solid #e0e0e0;
            text-align: left;
          }
          .summary-table th {
            background-color: #f2f2f2;
          }
        `}
      </style>
    </div>
  );
}
