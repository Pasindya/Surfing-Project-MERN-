import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Staffnavi from './Staffnavi'; // Adjust the import path if necessary
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Staffdetails() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const componentRef = useRef();
  const navigate = useNavigate(); // Initialize navigate

  // Fetch staff data
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:5009/staff');
        setStaff(response.data.staff);
      } catch (err) {
        setError('Failed to fetch staff data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  // Dynamic import of jsPDF and autoTable for generating PDFs
  const handleDownloadReport = async (staffMember) => {
    setReportLoading(true);
    try {
      const { default: jsPDF } = await import('jspdf');
      const autoTable = (await import('jspdf-autotable')).default;

      const doc = new jsPDF();
      const tableColumn = ["Field", "Value"];
      const tableRows = [
        ["ID", staffMember._id],
        ["Name", staffMember.name],
        ["Email", staffMember.gmail],
        ["Age", staffMember.age],
        ["Address", staffMember.address],
        ["Experience", staffMember.experience],
      ];

      doc.text("Staff Member Details", 14, 15);
      autoTable(doc, { head: [tableColumn], body: tableRows });
      doc.save(`${staffMember.name}_report.pdf`);
    } catch (error) {
      console.error("Error generating PDF report: ", error);
    } finally {
      setReportLoading(false);
    }
  };

  // Function to handle staff member deletion
  const handleDelete = async (staffId) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        await axios.delete(`http://localhost:5009/staff/${staffId}`);
        // Update state after deletion
        setStaff(prevStaff => prevStaff.filter(member => member._id !== staffId));
      } catch (err) {
        console.error('Error deleting staff member:', err);
      }
    }
  };

  // Function to handle updating a staff member
  const handleUpdate = (staffMember) => {
    navigate(`/updatestaff/${staffMember._id}`); // Navigate to the update form
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex">
      <Staffnavi /> {/* Include the Staffnavi component */}
      <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen" ref={componentRef}>
        <h1 className="text-3xl font-bold mb-6">Staff Details</h1>

        <table className="min-w-full bg-white border border-gray-300 rounded shadow mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Age</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Experience</th>
              <th className="py-2 px-4 border-b">Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {staff.map((staffMember) => (
              <tr key={staffMember._id}>
                <td className="py-2 px-4 border-b text-center">{staffMember._id}</td>
                <td className="py-2 px-4 border-b text-center">{staffMember.name}</td>
                <td className="py-2 px-4 border-b text-center">{staffMember.gmail}</td>
                <td className="py-2 px-4 border-b text-center">{staffMember.age}</td>
                <td className="py-2 px-4 border-b text-center">{staffMember.address}</td>
                <td className="py-2 px-4 border-b text-center">{staffMember.experience}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleUpdate(staffMember)} // Call update function
                    className="bg-yellow-500 text-white py-1 px-2 rounded mr-1"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(staffMember._id)} // Call delete function
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleDownloadReport(staffMember)} // Call function with staff member data
                    className="bg-blue-500 text-white py-1 px-2 rounded ml-1"
                  >
                    Download Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
