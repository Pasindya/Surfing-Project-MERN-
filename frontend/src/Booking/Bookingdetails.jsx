import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Bookingnav from './Bookingnav';
import Booking from './Booking';
import { useReactToPrint } from 'react-to-print';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const URL = "http://localhost:5009/bookings"; 

// Function to fetch booking data
const fetchHandler = async () => {
    try {
        const response = await axios.get(URL);
        return response.data; 
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return { bookings: [] }; 
    }
};

export default function Bookingdetails() {
    const [bookings, setBookings] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); 
    const [filteredBookings, setFilteredBookings] = useState([]); 
    const [noResults, setNoResults] = useState(false); 
    const [packageData, setPackageData] = useState([]); 
    const componentRef = useRef(); 

    useEffect(() => {
        // Fetch the bookings when the component mounts
        fetchHandler().then((data) => {
            if (data && data.bookings) {
                setBookings(data.bookings);  
                setFilteredBookings(data.bookings); 
                calculatePackageData(data.bookings);
            } else {
                console.warn("No bookings found or data format incorrect.");
            }
        });
    }, []); 

    // Function to calculate package counts for the pie chart
    const calculatePackageData = (bookings) => {
        const packageCounts = {};
        bookings.forEach(booking => {
            const packageName = booking.packagename; 
            packageCounts[packageName] = (packageCounts[packageName] || 0) + 1;
        });

        const formattedData = Object.keys(packageCounts).map(packageName => ({
            packageName,
            count: packageCounts[packageName],
        }));
        
        setPackageData(formattedData); 
    };

    // Function to handle search
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
        calculatePackageData(filtered); 
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Booking Report",
        onAfterPrint: () => alert("Booking Report Successfully downloaded!") 
    });

    const handleClearSearch = () => {
        setSearchQuery("");  
        setFilteredBookings(bookings);  
        setNoResults(false);
        calculatePackageData(bookings);
    };

    return (
        <div className="flex">
            <Bookingnav />  
            <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Booking Details</h1>

                {/* Pie Chart for Booking Counts */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Booking Distribution by Package</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={packageData}
                                dataKey="count"
                                nameKey="packageName"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                                colors={['#ff6384', '#36a2eb', '#ffce56']} // Set colors for Beginner, Intermediate, and Advanced levels
                            />
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Search Input and Buttons */}
                <div className="mb-6">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}  
                        placeholder="Search bookings by any field..."
                        className="border border-gray-300 rounded p-2 w-64"
                    />
                    <button
                        onClick={handleClearSearch}
                        className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
                    >
                        Clear Search
                    </button>
                </div>

                {/* Button to trigger printing/download */}
                <button
                    onClick={handlePrint}
                    className="bg-green-500 text-white py-2 px-4 rounded mb-4"
                >
                    Download Booking Report
                </button>

                {/* Display Booking Count */}
                <div className="mb-4">
                    {filteredBookings.length > 0 && (
                        <p className="text-gray-600">
                            Showing {filteredBookings.length} booking(s)
                        </p>
                    )}
                </div>

                {/* Wrap the content to be printed in a ref div */}
                <div ref={componentRef}>
                    {noResults ? (
                        <p className="text-red-500">No bookings found matching your search.</p>
                    ) : (
                        <div>
                            {filteredBookings.length > 0 ? (
                                filteredBookings.map((booking, i) => (
                                    <Booking key={i} booking={booking} />
                                ))
                            ) : (
                                <p>No bookings available.</p>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
