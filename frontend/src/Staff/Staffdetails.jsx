import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Staffnavi from './Staffnavi'; // Ensure this path is correct
import Staffm from '../Staff/Staffm'; // Ensure this path is correct
import { useReactToPrint } from 'react-to-print';

const URL = 'http://localhost:5009/staff';

export default function Staffdetails() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch staff data
  const fetchHandler = async () => {
    try {
      const response = await axios.get(URL);
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching staff data:', error);
      setError('Failed to load staff data.');
      return { staff: [] }; // Return an empty array in case of error
    }
  };

  // useEffect to handle data fetching on component mount
  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching staff data');
      try {
        const data = await fetchHandler();
        console.log('Fetched staff data:', data);
        setStaff(data.staff || []);
      } catch (error) {
        console.error('Error in fetchData:', error);
        setError('Failed to load staff data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle staff deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      setStaff(staff.filter((staffMember) => staffMember._id !== id)); // Update the UI
    } catch (error) {
      console.error('Error deleting staff member:', error);
      setError('Failed to delete staff member.');
    }
  };

  // Ref for printing functionality
  const componentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: 'Staff Member Report',
    onAfterPrint: () => alert('Staff member report successfully downloaded!'),
  });

  return (
    <div className="flex">
      <Staffnavi /> {/* Include the Staffnavi component */}
      <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen" ref={componentsRef}>
        <h1 className="text-3xl font-bold mb-6">Staff Details</h1>

        {/* Loading and error handling */}
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Staff list */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          {staff.length > 0 ? (
            staff.map((staffMember) => (
              <Staffm
                key={staffMember._id}
                staff={staffMember}
                onUpdate={() => console.log('Update clicked for', staffMember._id)} // Replace with actual update logic
                onDelete={() => handleDelete(staffMember._id)} // Pass id for deletion
              />
            ))
          ) : (
            <p>No staff members available.</p>
          )}
        </div>
        
        {/* Print button */}
        <button 
          onClick={handlePrint} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Download Report
        </button>
      </main>
    </div>
  );
}
