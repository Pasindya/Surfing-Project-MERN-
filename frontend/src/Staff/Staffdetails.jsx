import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Staffnavi from './Staffnavi'; // Ensure this path is correct
import Staffm from '../Staff/Staffm'; // Ensure this path is correct

const URL = "http://localhost:5009/staff";

export default function Staffdetails() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHandler = async () => {
    try {
      const response = await axios.get(URL);
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching staff data:", error);
      setError("Failed to load staff data.");
      return { staff: [] }; // Return an empty array in case of error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching staff data");
      try {
        const data = await fetchHandler();
        console.log("Fetched staff data:", data);
        setStaff(data.staff || []);
      } catch (error) {
        console.error("Error in fetchData:", error);
        setError("Failed to load staff data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      setStaff(staff.filter((staffMember) => staffMember._id !== id)); // Update the UI
    } catch (error) {
      console.error("Error deleting staff member:", error);
      setError("Failed to delete staff member.");
    }
  };

  return (
    <div className="flex">
      <Staffnavi /> {/* Include the Staffnavi component */}
      <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Staff Details</h1>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="bg-white shadow-lg rounded-lg p-6">
          {staff.length > 0 ? (
            staff.map((staffMember) => (
              <Staffm
                key={staffMember._id}
                staff={staffMember}
                onUpdate={() => console.log("Update clicked for", staffMember._id)} // Replace with actual update logic if needed
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p>No staff members available.</p>
          )}
        </div>
      </main>
    </div>
  );
}
