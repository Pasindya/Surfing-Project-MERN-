import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';  // Import jsPDF
import 'jspdf-autotable';  // Import autotable if you want to generate tables
import Studentnav from './Studentnav';  // Ensure this is the correct path
import Student from './Student';  // Ensure this is the correct path

const URL = "http://localhost:5009/students";  // Ensure your backend API is running and the URL is correct

// Function to fetch student data
const fetchHandler = async () => {
    try {
        const response = await axios.get(URL);
        return response.data;  // Return the data received from the backend
    } catch (error) {
        console.error("Error fetching students:", error);  // Log error to help debugging
        return { students: [] };  // Return an empty array in case of error
    }
}

export default function Studentdetails() {
    const [students, setStudents] = useState([]);  // State to store all students
    const [searchQuery, setSearchQuery] = useState('');  // State to store search query
    const [filteredStudents, setFilteredStudents] = useState([]);  // State to store filtered students

    useEffect(() => {
        // Fetch the students when the component mounts
        fetchHandler().then((data) => {
            if (data && data.students) {
                setStudents(data.students);  // Set students if available
                setFilteredStudents(data.students);  // Initially show all students
            } else {
                console.warn("No students found or data format incorrect.");
            }
        });
    }, []);

    // Filter students based on the search query
    const handleSearch = () => {
        if (searchQuery) {
            const filtered = students.filter(student =>
                student.name.toLowerCase().includes(searchQuery.toLowerCase())  // Case-insensitive search
            );
            setFilteredStudents(filtered);  // Update the filtered students
        } else {
            setFilteredStudents(students);  // Show all students if search is empty
        }
    };

    // Function to download a student's details as a PDF with a frame and custom title
    const downloadStudentPDF = (student) => {
        const doc = new jsPDF();

        // Add a title to the PDF
        doc.setFontSize(18);
        doc.text('Student Details Report', 105, 20, null, null, 'center');  // Centered title at the top

        // Draw a frame (rectangle) around the student details
        doc.setDrawColor(0);  // Black border color
        doc.setLineWidth(0.5);  // Border thickness
        doc.rect(10, 30, 190, 60);  // x, y, width, height for the frame

        // Add student details inside the frame
        doc.setFontSize(12);  // Set font size for details
        doc.text(`Name: ${student.name}`, 15, 40);
        doc.text(`Email: ${student.email}`, 15, 50);
        doc.text(`Phone: ${student.mobileno}`, 15, 60);
        doc.text(`Address: ${student.address}`, 15, 70);
        doc.text(`Password: ${student.password}`, 15, 80);

        // Save the PDF with the student's name and 'Report' in the filename
        doc.save(`${student.name}-details-report.pdf`);
    };

    return (
        <div
            className="flex min-h-screen"
            style={{
                backgroundImage: `url('/images/img2.jpg')`,  // Path to your uploaded background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Studentnav />  {/* Include the navigation bar */}
            <main className="flex-1 ml-64 p-8 bg-gray-100 bg-opacity-70 min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-blue-500">Student Details</h1>

                {/* Search Input with Icon */}
                <div className="mb-6 flex">
                    <input
                        type="text"
                        placeholder="Search by student name"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}  // Update search query
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();  // Trigger search on Enter key press
                            }
                        }}
                    />
                    <button
                        onClick={handleSearch}
                        className="ml-2 p-3 bg-blue-500 text-white rounded-md"
                    >
                        {/* Search Icon as SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 110 8 4 4 0 010-8zM2 8a6 6 0 1111.52 3.387l4.387 4.386a1 1 0 11-1.414 1.415l-4.386-4.387A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                {/* Render student details if available */}
                <div>
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map((student, i) => (
                            <div key={i} className="mb-4 p-4 bg-white rounded-lg shadow-md bg-opacity-90">
                                <Student student={student} />  {/* Render each student */}
                                
                                {/* Download PDF Button */}
                                <button
                                    onClick={() => downloadStudentPDF(student)}
                                    className="mt-4 p-2 bg-blue-500 text-white rounded-md"
                                >
                                    Download PDF
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No students found.</p>  // Message if no students match the search
                    )}
                </div>
            </main>
        </div>
    );
}
