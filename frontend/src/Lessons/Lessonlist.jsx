import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import LessonNav from '../Lessons/Lessonnav'; // Adjust the import path as needed
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For generating tables in PDFs
import logo from '/images/logoh.jpeg'; // Add the correct path to your logo image

export default function LessonList() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get('http://localhost:5009/lessons');
        setLessons(response.data.lessons);
      } catch (err) {
        setError('Failed to fetch lessons.');
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const handleDownloadReport = () => {
    const doc = new jsPDF();

    // Add logo
    const img = new Image();
    img.src = logo;  // Use the imported logo image path
    img.onload = function() {
      // Add header information: Logo, Company Name, Address, Date
      doc.addImage(img, 'JPEG', 10, 10, 30, 30); // Adjust logo dimensions and position
      doc.setFontSize(16);
      doc.text('SurfDeck', 50, 20);
      doc.setFontSize(12);
      doc.text('123 Surf Lane, Beach City, CA', 50, 28);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 50, 36);

      // Add table with lesson data
      const tableColumn = ["ID", "Title", "Date", "Time", "Location", "Description"];
      const tableRows = [];

      lessons.forEach(lesson => {
        const lessonData = [
          lesson._id,
          lesson.title,
          new Date(lesson.date).toLocaleDateString(),
          new Date(`1970-01-01T${lesson.time}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
          lesson.location,
          lesson.description
        ];
        tableRows.push(lessonData);
      });

      doc.autoTable(tableColumn, tableRows, { startY: 50 }); // Adjust position to accommodate the header
      doc.save('lessons_report.pdf');
    };
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Lesson Report",
    onAfterPrint: () => alert("Lesson Report Successfully printed!"),
  });

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 flex flex-col items-center">
      <LessonNav />
      <h1 className="text-2xl font-bold mb-4 text-center">Lessons List</h1>

      <div ref={componentRef} className="ml-auto"> {/* Aligning the table to the right */}
        <table className="min-w-full bg-white border border-gray-300 rounded shadow mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Time</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Description</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id}>
                <td className="py-2 px-4 border-b text-center">{lesson._id}</td>
                <td className="py-2 px-4 border-b text-center">{lesson.title}</td>
                <td className="py-2 px-4 border-b text-center">{new Date(lesson.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b text-center">{new Date(`1970-01-01T${lesson.time}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                <td className="py-2 px-4 border-b text-center">{lesson.location}</td>
                <td className="py-2 px-4 border-b text-center">{lesson.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between w-full mt-4">
        <button
          onClick={handlePrint}
          className="bg-green-500 text-white py-2 px-4 rounded mr-2"
        >
          Print Lesson Report
        </button>
        <button
          onClick={handleDownloadReport}
          className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${reportLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={reportLoading}
        >
          {reportLoading ? 'Generating Report...' : 'Download Report'}
        </button>
      </div>
    </div>
  );
}
