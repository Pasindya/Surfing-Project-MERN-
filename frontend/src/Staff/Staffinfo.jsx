//staffinfo
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Staffnavi from './Staffnavi'; // Ensure this path is correct

const URL = 'http://localhost:5009/staff';

export default function Staffinfo() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch staff data
  const fetchHandler = async () => {
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      setError('Failed to load staff data.');
      return { staff: [] }; // Return empty data on failure
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHandler();
        setStaff(data.staff || []);
      } catch (error) {
        setError('Failed to load staff data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <Staffnavi /> {/* Include the Staffnavi component */}
      <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Staff Information</h1>

        {/* Loading and error handling */}
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Staff details */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          {staff.length > 0 ? (
            staff.map((staffMember) => (
              <div key={staffMember._id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p><strong>Name:</strong> {staffMember.name}</p>
                <p><strong>Position:</strong> {staffMember.position}</p>
                <p><strong>Email:</strong> {staffMember.email}</p>
                <p><strong>Phone:</strong> {staffMember.phone}</p>
                {/* Add other details as needed */}
              </div>
            ))
          ) : (
            <p>No staff members available.</p>
          )}
        </div>
      </main>
    </div>
  );
}
