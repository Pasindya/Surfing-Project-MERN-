import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lesson from './Lesson';
import Lessonnav from './Lessonnav';




const URL = "http://localhost:5009/lessons";

const fetchHandler = async () => {
    try {
        const response = await axios.get(URL);
        return response.data;  // Return the data received from the backend
    } catch (error) {
        console.error("Error fetching lessons:", error);  // Log error to help debugging
        return { lessons: [] };  // Return an empty array in case of error
    }
}

export default function Lessondetails() {
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        // Fetch the bookings when the component mounts
        fetchHandler().then((data) => {
            if (data && data.lessons) {
                setLessons(data.lessons);  // Set bookings if available
            } else {
                console.warn("No lessons found or data format incorrect.");
            }
        });
    }, []);  // Empty dependency array ensures this effect runs only once on mount

    return (
        <div className="flex">
            <Lessonnav />  {/* Include the navigation bar */}
            <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Lesson Details</h1>

                {/* Render lesson details if available */}
                <div>
                    {lessons.length > 0 ? (
                        lessons.map((lesson, i) => (
                            <Lesson key={i} lesson={lesson} />  // Render each lesson
                        ))
                    ) : (
                        <p>No Lessonsavailable.</p>  // Message if no lessons found
                    )}
                </div>
            </main>
        </div>
    );
}

