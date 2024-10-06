import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Staffnavi from './Staffnavi'; 
import { useNavigate, Link } from 'react-router-dom'; 
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
import { format } from 'date-fns'; 
import logo from '/images/logoh.jpeg';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Staffdetails() {
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const componentRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:5009/staff');
        setStaff(response.data.staff);
        setFilteredStaff(response.data.staff);
      } catch (err) {
        setError('Failed to fetch staff data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  // Function to handle search by ID
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchId(value);

    if (value === '') {
      setFilteredStaff(staff);
    } else {
      const filtered = staff.filter((member) =>
        member._id.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredStaff(filtered);
    }
  };

  // Function to handle staff member deletion
  const handleDelete = async (staffId) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        await axios.delete(`http://localhost:5009/staff/${staffId}`);
        setStaff(prevStaff => prevStaff.filter(member => member._id !== staffId));
        setFilteredStaff(prevFilteredStaff => prevFilteredStaff.filter(member => member._id !== staffId));
      } catch (err) {
        console.error('Error deleting staff member:', err);
      }
    }
  };

  // Function to handle PDF download
  const handleDownloadReport = (staffMember) => {
    const doc = new jsPDF();
    const currentDate = format(new Date(), 'MMMM dd, yyyy');

    const imgData = logo; 

    // Add logo and header
    doc.addImage(imgData, 'JPEG', 10, 10, 30, 30); 
    doc.setFontSize(20);
    doc.text('SurfDeck', 50, 20);
    doc.setFontSize(12);
    doc.text('123 Surf Lane, Beach City, CA', 50, 30);
    doc.text(`Date: ${currentDate}`, 50, 40);
    doc.setFontSize(16);
    doc.text('Staff Member Details', 14, 60);

    // Add the table of staff details
    doc.autoTable({
      head: [['Field', 'Value']],
      body: [
        ['ID', staffMember._id],
        ['Name', staffMember.name],
        ['Email', staffMember.gmail],
        ['Age', staffMember.age],
        ['Address', staffMember.address],
        ['Experience', staffMember.experience],
        ['Nic', staffMember.nic],
        ['Salary', staffMember.salary],
        ['Designation', staffMember.designation],
      ],
      startY: 70,
    });

    // Add Signature Section
    const finalY = doc.lastAutoTable.finalY || 70; // Get the final Y position after the table

    // Add Signature ("Thenujaa") above the line
    doc.setFontSize(14);
    doc.setFont("helvetica", "italic"); // Using italic to simulate a cursive signature
    doc.text("Tharindu", 60, finalY + 20, null, null, 'center');

    // Add line below the signature
    doc.setLineWidth(0.5);
    doc.line(40, finalY + 22, 80, finalY + 22); // Adjust x-coordinates for better centering

    // Add Role and Company below the line
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal"); // Reset to normal font
    doc.text("Staff Manager, Surf Deck.", 60, finalY + 28, null, null, 'center');

    // Save the PDF
    doc.save(`${staffMember.name}_details.pdf`);
  };

  // Prepare data for the chart
  const designationCount = {};
  filteredStaff.forEach(member => {
    designationCount[member.designation] = (designationCount[member.designation] || 0) + 1;
  });

  const chartData = Object.keys(designationCount).map(key => ({
    designation: key,
    count: designationCount[key],
  }));

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex">
      <Staffnavi />
      <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen" ref={componentRef}>
        <h1 className="text-3xl font-bold mb-6">Staff Details</h1>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            value={searchId}
            onChange={handleSearch}
            placeholder="Search by ID"
            className="border p-2 rounded-md w-full"
          />
        </div>

        <table className="min-w-full bg-white border border-gray-300 rounded shadow mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Age</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Experience</th>
              <th className="py-2 px-4 border-b">Nic</th>
              <th className="py-2 px-4 border-b">Salary</th>
              <th className="py-2 px-4 border-b">Designation</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((staffMember) => (
              <tr key={staffMember._id}>
                <td className="py-2 px-4 border-b text-center">{staffMember._id}</td>
                <td className="py-2 px-4 border-b text-center">{staffMember.name}</td>
                <td className="py-2 px-4 border-b text-center">{staffMember.gmail}</td>
                <td className="py-2 px-4 border-b text-center">{staffMember.age}</td>
                <td className="py-2 px-4 border-b text-center">{staffMember.address}</td>
                <td className="py-2 px-4 border-b text-center">{staffMember.experience}</td>
                <td className="py-2 px-4 border-b text-center">{staffMember.nic}</td>
                <td className="py-2 px-4 border-b text-center">{staffMember.salary}</td>
                <td className="py-2 px-4 border-b text-center">{staffMember.designation}</td>
                <td className="py-2 px-4 border-b text-center">
                  <Link
                    to={`/updatestaff/${staffMember._id}`} 
                    className="bg-yellow-500 text-white py-1 px-2 rounded mr-1"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(staffMember._id)}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleDownloadReport(staffMember)} 
                    className="bg-blue-500 text-white py-1 px-2 rounded ml-1"
                  >
                    Download Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Chart Component */}
        <h2 className="text-2xl font-bold mb-4">Staff Distribution by Designation</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="designation" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </main>
    </div>
  );
}
