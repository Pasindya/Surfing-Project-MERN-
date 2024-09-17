import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Lesson from './Lesson';
import Lessonnav from './Lessonnav';
import { useReactToPrint } from 'react-to-print';

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
    const componentRef = useRef();  // Create a ref to be used with useReactToPrint

    useEffect(() => {
        fetchHandler().then((data) => {
            if (data && data.lessons) {
                setLessons(data.lessons);  // Set lessons if available
            } else {
                console.warn("No lessons found or data format incorrect.");
            }
        });
    }, []);  // Empty dependency array ensures this effect runs only once on mount

    // useReactToPrint to handle printing
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,  // Specify the content to be printed
        documentTitle: "Lesson Report",
        onAfterPrint: () => alert("Lesson Report Successfully downloaded!")  // Alert after download
    });

    return (
        <div className="flex">
            <Lessonnav />  {/* Include the navigation bar */}
            <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Lesson Details</h1>

                {/* Button to trigger printing/download */}
                <button
                    onClick={handlePrint}
                    className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
                >
                    Download Lesson Report
                </button>

                {/* Wrap the content to be printed in a ref div */}
                <div ref={componentRef}>
                    {/* Render lesson details if available */}
                    <div>
                        {lessons.length > 0 ? (
                            lessons.map((lesson, i) => (
                                <Lesson key={i} lesson={lesson} />  // Render each lesson
                            ))
                        ) : (
                            <p>No lessons available.</p>  // Message if no lessons found
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
