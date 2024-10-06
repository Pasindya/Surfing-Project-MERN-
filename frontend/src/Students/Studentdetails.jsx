import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';  // Import jsPDF
import 'jspdf-autotable';  // Import autotable to generate tables
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

    // Automatically filter students as search query changes
    useEffect(() => {
        if (searchQuery) {
            const filtered = students.filter(student =>
                student.name.toLowerCase().includes(searchQuery.toLowerCase())  // Case-insensitive search
            );
            setFilteredStudents(filtered);  // Update the filtered students
        } else {
            setFilteredStudents(students);  // Show all students if search is empty
        }
    }, [searchQuery, students]);  // Run this effect when searchQuery or students changes

    // Function to download all students' details as a PDF with a table and signature section
    const downloadAllStudentsPDF = () => {
        const doc = new jsPDF();

        // Convert your logo to a Base64 string and use it here
        const logo = '/images/logoh.jpeg';  // Adjust the path to your logo

        // Add the logo to the PDF
        doc.addImage(logo, 'PNG', 10, 10, 30, 30);  // x, y, width, height

        // Add the company name
        doc.setFontSize(16);
        doc.text('SurfDeck', 50, 20);

        // Add the company address
        doc.setFontSize(12);
        doc.text('123 Surf Lane, Beach City, CA', 50, 28);  // Company address

        // Add the current date
        const currentDate = new Date().toLocaleDateString();
        doc.text(`Date: ${currentDate}`, 150, 28);  // Current date

        // Add a title to the PDF
        doc.setFontSize(18);
        doc.text('All Students Details', 105, 50, null, null, 'center');  // Centered title at the top

        // Define the table content (headers and rows)
        const tableColumns = ["Student Name", "Email", "Phone", "Address"];
        const tableRows = students.map((student) => [
            student.name,
            student.email,
            student.mobileno,
            student.address,
        ]);

        // Add the student details in a table format
        doc.autoTable({
            startY: 70,  // Table start position
            head: [tableColumns],
            body: tableRows,
        });

        // Add the signature section
        const finalY = doc.lastAutoTable.finalY || 60;  // Get the final Y position after the table

        // Add Signature ("vishmi") above the line
        doc.setFontSize(14);
        doc.setFont("helvetica", "italic");  // Using italic to simulate a cursive signature
        doc.text("vishmi", 60, finalY + 20, null, null, 'center');  // Adjust positioning as necessary

        // Add line below the signature
        doc.setLineWidth(0.5);
        doc.line(40, finalY + 22, 80, finalY + 22);  // Adjusted x-coordinates for better centering

        // Add Role and Company below the line
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");  // Reset to normal font
        doc.text("Student Manager, Surf Deck.", 60, finalY + 28, null, null, 'center');

        // Save the PDF with 'All-Students-Details-Report' in the filename
        doc.save(`All-Students-Details-Report.pdf`);
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

                {/* Search Input */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by student name"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}  // Update search query on each keystroke
                    />
                </div>

                {/* Render student details if available */}
                <div>
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map((student, i) => (
                            <div key={i} className="mb-4 p-4 bg-white rounded-lg shadow-md bg-opacity-90">
                                <Student student={student} />  {/* Render each student */}
                                
                                {/* Download PDF Button for all students */}
                                <button
                                    onClick={downloadAllStudentsPDF}
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
