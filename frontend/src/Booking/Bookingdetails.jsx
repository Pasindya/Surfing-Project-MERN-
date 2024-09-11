import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Bookingnav from './Bookingnav';  // Ensure this is the correct path to Bookingnav component
import Booking from './Booking';  // Ensure this is the correct path to Booking component

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
}

export default function Bookingdetails() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Fetch the bookings when the component mounts
        fetchHandler().then((data) => {
            if (data && data.bookings) {
                setBookings(data.bookings);  // Set bookings if available
            } else {
                console.warn("No bookings found or data format incorrect.");
            }
        });
    }, []);  // Empty dependency array ensures this effect runs only once on mount

    return (
        <div className="flex">
            <Bookingnav />  {/* Include the navigation bar */}
            <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Booking Details</h1>

                {/* Render booking details if available */}
                <div>
                    {bookings.length > 0 ? (
                        bookings.map((booking, i) => (
                            <Booking key={i} booking={booking} />  // Render each booking
                        ))
                    ) : (
                        <p>No bookings available.</p>  // Message if no bookings found
                    )}
                </div>
            </main>
        </div>
    );
}
