import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import BookingNav from './Bookingnav'; // Ensure this is the correct path to your BookingNav component
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For generating tables in PDFs
import logo from '/images/logoh.jpeg'; // Ensure this is the correct path to your logo image
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Import Recharts components

const URL = "http://localhost:5009/bookings"; // Ensure your backend API is running and the URL is correct

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(URL);
        setBookings(response.data.bookings);
        setFilteredBookings(response.data.bookings);
      } catch (err) {
        setError('Failed to fetch bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = bookings.filter((booking) =>
      Object.values(booking).some((field) =>
        field.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredBookings(filtered);
    setNoResults(filtered.length === 0);
  };

  const handleDownloadReport = () => {
    const doc = new jsPDF();

    // Add logo
    const img = new Image();
    img.src = logo;
    img.onload = function () {
      doc.addImage(img, 'JPEG', 10, 10, 30, 30); // Adjust logo dimensions and position
      doc.setFontSize(16);
      doc.text('SurfDeck', 50, 20);
      doc.setFontSize(12);
      doc.text('123 Surf Lane, Beach City, CA', 50, 28);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 50, 36);

      // Add table with booking data
      const tableColumn = ["ID", "Name", "Email", "Mobile", "Address", "Package"];
      const tableRows = [];

      filteredBookings.forEach(booking => {
        const bookingData = [
          booking._id,
          booking.name,
          booking.email,
          booking.mobileno,
          booking.address,
          booking.packagename,
        ];
        tableRows.push(bookingData);
      });

      doc.autoTable(tableColumn, tableRows, { startY: 50 }); // Adjust position to accommodate the header
      doc.save('bookings_report.pdf');
    };
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Booking Report",
    onAfterPrint: () => alert("Booking Report Successfully printed!"),
  });

  // Function to process booking data for chart
  const getPackageCounts = () => {
    const counts = {};
    filteredBookings.forEach(booking => {
      counts[booking.packagename] = (counts[booking.packagename] || 0) + 1;
    });
    return Object.entries(counts).map(([packageName, count]) => ({ packageName, count }));
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const packageData = getPackageCounts();

  return (
    <div className="p-4 flex flex-col items-center">
      <BookingNav />
      <h1 className="text-2xl font-bold mb-4 text-center">Booking List</h1>

      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search bookings..."
        className="border border-gray-300 rounded p-2 mb-4"
      />

      {/* Button to trigger printing/download */}
      <div className="flex justify-between w-full mb-4">
        <button
          onClick={handlePrint}
          className="bg-green-500 text-white py-1 px-3 rounded mr-2" // Reduced padding for buttons
        >
          Print Booking Report
        </button>
        <button
          onClick={handleDownloadReport}
          className="bg-blue-500 text-white py-1 px-3 rounded" // Reduced padding for buttons
        >
          Download Report
        </button>
      </div>

      {/* Display Booking Count */}
      {filteredBookings.length > 0 && (
        <p className="text-gray-600">
          Showing {filteredBookings.length} booking(s)
        </p>
      )}

      <div ref={componentRef} className="flex w-full">
        <div className="w-2/3">
          <table className="min-w-full bg-white border border-gray-300 rounded shadow">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-1 px-2 border-b text-sm">ID</th> {/* Reduced padding and font size */}
                <th className="py-1 px-2 border-b text-sm">Name</th>
                <th className="py-1 px-2 border-b text-sm">Email</th>
                <th className="py-1 px-2 border-b text-sm">Mobile</th>
                <th className="py-1 px-2 border-b text-sm">Address</th>
                <th className="py-1 px-2 border-b text-sm">Package</th>
              </tr>
            </thead>
            <tbody>
              {noResults ? (
                <tr>
                  <td colSpan="6" className="py-2 px-4 border-b text-center text-red-500">No bookings found matching your search.</td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className="py-1 px-2 border-b text-center text-sm">{booking._id}</td>
                    <td className="py-1 px-2 border-b text-center text-sm">{booking.name}</td>
                    <td className="py-1 px-2 border-b text-center text-sm">{booking.email}</td>
                    <td className="py-1 px-2 border-b text-center text-sm">{booking.mobileno}</td>
                    <td className="py-1 px-2 border-b text-center text-sm">{booking.address}</td>
                    <td className="py-1 px-2 border-b text-center text-sm">{booking.packagename}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Bar Chart Section */}
        <div className="w-1/3 pl-4">
          <h2 className="text-xl font-bold mb-2"> Booking Count</h2>
          <ResponsiveContainer width="65%" height={250}> {/* Reduced height for the chart */}
            <BarChart data={packageData}>
              <XAxis dataKey="packageName" />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* Adjusted barSize to reduce the gap between columns */}
              <Bar dataKey="count" fill="#FF6347" barSize={20} /> {/* Change #FF6347 to your desired color */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
