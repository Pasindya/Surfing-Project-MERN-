import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const URL = "http://localhost:5009/bookings"; // Ensure this is the correct URL to your API

export default function Bookingsummary() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summaryData, setSummaryData] = useState([]);
  const [bookingsByPackage, setBookingsByPackage] = useState({});

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(URL);
        setBookings(response.data.bookings);
        generateSummaryData(response.data.bookings);
        groupBookingsByPackage(response.data.bookings);
      } catch (err) {
        setError('Failed to fetch bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Function to group bookings by both date and package name for the bar chart
  const generateSummaryData = (bookings) => {
    const summaryByDateAndPackage = bookings.reduce((acc, booking) => {
      const bookingDate = new Date(booking.date).toLocaleDateString(); // Assuming 'date' field exists
      const packageName = booking.packagename; // Assuming 'packagename' field exists

      // Initialize date entry if it doesn't exist
      if (!acc[bookingDate]) {
        acc[bookingDate] = {};
      }
      // Increment the count for the specific package on that date
      acc[bookingDate][packageName] = (acc[bookingDate][packageName] || 0) + 1;

      return acc;
    }, {});

    // Transform data into an array of objects for charting
    const summary = Object.keys(summaryByDateAndPackage).map(date => {
      const entry = { date };
      Object.keys(summaryByDateAndPackage[date]).forEach(packageName => {
        entry[packageName] = summaryByDateAndPackage[date][packageName];
      });
      return entry;
    });

    setSummaryData(summary);
  };

  // Function to group bookings by package name for display in the table
  const groupBookingsByPackage = (bookings) => {
    const bookingsGrouped = bookings.reduce((acc, booking) => {
      const packageName = booking.packagename;
      if (!acc[packageName]) {
        acc[packageName] = [];
      }
      acc[packageName].push(booking);
      return acc;
    }, {});

    setBookingsByPackage(bookingsGrouped);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Extract all unique package names for the legend and bars
  const allPackages = Array.from(new Set(bookings.map(booking => booking.packagename)));

  // Define a fixed set of colors for the packages
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c", "#d0ed57"];

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Booking Summary</h1>
      
      {/* Bar Chart for bookings over time, grouped by package */}
      <div className="w-full h-64 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={summaryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {allPackages.map((packageName, index) => (
              <Bar
                key={packageName}
                dataKey={packageName}
                fill={colors[index % colors.length]} // Use colors from the predefined set
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Display bookings grouped by package name */}
      <div className="w-full">
        <h2 className="text-xl font-bold mb-4">Bookings by Package</h2>
        {Object.keys(bookingsByPackage).map((packageName) => (
          <div key={packageName} className="mb-6">
            <h3 className="text-lg font-semibold">{packageName}</h3>
            <table className="min-w-full bg-white border border-gray-300 rounded shadow mb-2">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Mobile</th>
                  <th className="py-2 px-4 border-b">Address</th>
                </tr>
              </thead>
              <tbody>
                {bookingsByPackage[packageName].map((booking) => (
                  <tr key={booking._id}>
                    <td className="py-2 px-4 border-b">{booking._id}</td>
                    <td className="py-2 px-4 border-b">{booking.name}</td>
                    <td className="py-2 px-4 border-b">{booking.email}</td>
                    <td className="py-2 px-4 border-b">{booking.mobileno}</td>
                    <td className="py-2 px-4 border-b">{booking.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
