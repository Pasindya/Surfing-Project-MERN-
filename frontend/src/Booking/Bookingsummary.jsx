import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const URL = "http://localhost:5009/bookings"; // Ensure this is the correct URL to your API

export default function Bookingsummary() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingsByPackage, setBookingsByPackage] = useState({});

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(URL);
        setBookings(response.data.bookings);
        groupBookingsByPackage(response.data.bookings);
      } catch (err) {
        setError('Failed to fetch bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

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

  // Extract all unique package names for the pie chart
  const allPackages = Array.from(new Set(bookings.map(booking => booking.packagename)));

  // Define a fixed set of colors for the packages
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c", "#d0ed57"];

  // Prepare data for the pie chart
  const pieData = allPackages.map(packageName => {
    return {
      name: packageName,
      value: bookings.filter(booking => booking.packagename === packageName).length, // Count of bookings for each package
    };
  });

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Booking Summary</h1>

      <div className="flex flex-row justify-between w-full">
        {/* Pie Chart for total bookings by package */}
        <div className="w-full h-64 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Display package names and booking counts inside a notice frame */}
        <div className="ml-8 flex flex-col justify-center">
          <div className="border border-gray-300 rounded-lg bg-gray-100 p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-2">Bookings Count</h2>
            {pieData.map((data, index) => (
              <div key={index} className="text-lg mb-1">
                {data.name}: <span className="font-bold">{data.value}</span> bookings
              </div>
            ))}
          </div>
        </div>
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
