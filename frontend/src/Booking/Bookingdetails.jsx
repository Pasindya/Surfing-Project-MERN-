import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Bookingnav from './Bookingnav';  // Ensure this is the correct path to Bookingnav component
import Booking from './Booking';  // Ensure this is the correct path to Booking component
import { useReactToPrint } from 'react-to-print';  // Import useReactToPrint for printing functionality

const URL = "http://localhost:5009/bookings";  // Ensure your backend API is running and the URL is correct

// Function to fetch booking data
const fetchHandler = async () => {
    try {
        const response = await axios.get(URL);
        return response.data;  // Return the data received from the backend
    } catch (error) {
        console.error("Error fetching bookings:", error);  // Log error to help debugging
        return { bookings: [] };  // Return an empty array in case of error
    }
};

export default function Bookingdetails() {
    const [bookings, setBookings] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");  // State for search query
    const [filteredBookings, setFilteredBookings] = useState([]);  // State for filtered bookings
    const [noResults, setNoResults] = useState(false);  // State for no results found
    const componentRef = useRef();  // Create a ref to be used with useReactToPrint

    useEffect(() => {
        // Fetch the bookings when the component mounts
        fetchHandler().then((data) => {
            if (data && data.bookings) {
                setBookings(data.bookings);  // Set bookings if available
                setFilteredBookings(data.bookings);  // Initialize filtered bookings
            } else {
                console.warn("No bookings found or data format incorrect.");
            }
        });
    }, []);  // Empty dependency array ensures this effect runs only once on mount

    // Function to handle search
    const handleSearch = (e) => {
        const query = e.target.value;  // Get the current input value
        setSearchQuery(query);  // Update search query state
        const filtered = bookings.filter((booking) =>
            Object.values(booking).some((field) =>
                field.toString().toLowerCase().includes(query.toLowerCase())
            )
        );
        setFilteredBookings(filtered);  // Update filtered bookings
        setNoResults(filtered.length === 0);  // Update no results state
    };

    // Handle printing/report generation
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,  // Specify the content to be printed
        documentTitle: "Booking Report",
        onAfterPrint: () => alert("Booking Report Successfully downloaded!")  // Alert after download
    });

    const handleClearSearch = () => {
        setSearchQuery("");  // Clear search query
        setFilteredBookings(bookings);  // Reset filtered bookings to original state
        setNoResults(false);
    };

    return (
        <div className="flex">
            <Bookingnav />  {/* Include the navigation bar */}
            <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Booking Details</h1>

                {/* Search Input and Buttons */}
                <div className="mb-6">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}  // Update search query and filter bookings
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
                    {/* Render booking details if available */}
                    {noResults ? (
                        <p className="text-red-500">No bookings found matching your search.</p>
                    ) : (
                        <div>
                            {filteredBookings.length > 0 ? (
                                filteredBookings.map((booking, i) => (
                                    <Booking key={i} booking={booking} />  // Render each booking
                                ))
                            ) : (
                                <p>No bookings available.</p>  // Message if no bookings found
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
