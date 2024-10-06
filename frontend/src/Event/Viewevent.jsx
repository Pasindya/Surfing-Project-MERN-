import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For autoTable plugin
import Eventnav from '../Event/Eventnav'; // Import the Eventnav component

export default function Viewevent() {
  const [events, setEvents] = useState([]); // State to hold all events data
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigate = useNavigate(); // Hook for navigation

  // Fetch all events when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5009/events'); // Adjust URL if needed
        setEvents(response.data.planevents); // Update state with fetched events
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Error fetching events. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents(); // Call the function to fetch events
  }, []); // Run once when the component mounts

  const handleEdit = (eventData) => {
    navigate('/updateevent', { state: { eventData } }); // Navigate to UpdateEvent with event data
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:5009/events/${id}`); // Call delete API
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id)); // Update state to remove deleted event
        alert('Event deleted successfully');
      } catch (err) {
        console.error('Error deleting event:', err);
        alert('Error deleting event. Please try again later.');
      }
    }
  };

  const handleGenerateReport = () => {
    navigate('/report'); // Navigate to the Report Page
  };

  // Function to navigate back
  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  // Filter events based on search query
  const filteredEvents = events.filter((event) =>
    event.StudentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to generate PDF
  const generatePDF = () => {
    fetch('/images/logo.png') // Fetch the logo image
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Logo = reader.result;

          const doc = new jsPDF();

          // Set the background color to white
          doc.setFillColor(255, 255, 255); // White color (RGB)
          doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F'); // Fill the background

          // Add Logo
          doc.addImage(base64Logo, 'JPEG', 10, 10, 50, 20); // Position and size of the logo

          // Add Title
          doc.setFontSize(20);
          doc.text("Events Report", 105, 40, null, null, 'center');

          // Add Company Info
          doc.setFontSize(12);
          doc.text("SurfDeck", 60, 50);
          doc.text("123 Surf Lane, Beach City, CA", 60, 56);
          doc.text("Email: info@surfdeck.com", 60, 62);
          doc.text("Mobile: +123 456 7890", 60, 68);

          // Current date and time for the report
          const currentDateTime = new Date().toLocaleString();
          doc.text(`Report Generated on: ${currentDateTime}`, 60, 74);

          // Define the table columns
          const tableColumns = ["Student Name", "Event Name", "Age", "Email", "Gender"];
          
          // Map event data to table rows
          const tableRows = filteredEvents.map(event => [
            event.StudentName,
            event.EventName,
            event.age.toString(),
            event.gmail,
            event.gender
          ]);

          // Add the table using autoTable
          doc.autoTable({
            startY: 80, // Y position to start the table
            head: [tableColumns],
            body: tableRows,
            styles: { fontSize: 12, fillColor: [255, 255, 255], textColor: [0, 0, 0] }, // Table styles
            headStyles: { fillColor: [128, 128, 128], textColor: [255, 255, 255] }, // Header styles
            theme: 'striped',
          });

          // Add Signature Section
          const finalY = doc.lastAutoTable.finalY || 80; // Get the final Y position after the table

          // Add Signature ("Thenujaa") above the line
          doc.setFontSize(14);
          doc.setFont("helvetica", "italic"); // Using italic to simulate a cursive signature
          doc.text("Thenujaa", 60, finalY + 20, null, null, 'center');

          // Add line below the signature
          doc.setLineWidth(0.5);
          doc.line(40, finalY + 22, 80, finalY + 22); // Adjusted x-coordinates for better centering

          // Add Role and Company below the line
          doc.setFontSize(12);
          doc.setFont("helvetica", "normal"); // Reset to normal font
          doc.text("Event Manager, Surf Deck.", 60, finalY + 28, null, null, 'center');

          // Save the PDF
          doc.save("events-report.pdf");
        };
        reader.readAsDataURL(blob);
      })
      .catch(error => {
        console.error('Error fetching the logo:', error);
      });
  };

  if (isLoading) return <div>Loading...</div>; // Loading state
  if (error) return <div>{error}</div>; // Error state

  return (
    <div className="min-h-screen flex flex-col">
      <Eventnav /> {/* Added Event Navigation Bar */}
      <div
        className="relative bg-cover bg-center flex-grow"
        style={{
          backgroundImage: 'url(/images/viewback.jpg)',
          minHeight: '100vh',
        }}
      >
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-transform duration-300"
        >
          Back
        </button>

        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative p-6 bg-gradient-to-br from-yellow-700 to-blue-400 shadow-xl rounded-lg max-w-5xl mx-auto my-8 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-4xl font-extrabold text-center text-white mb-6">
            View All Events
          </h2>

          {/* Search Bar */}
          <div className="flex justify-center mb-4">
            <input
              type="text"
              placeholder="Search by Student Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
              className="border px-4 py-2 rounded-lg"
            />
          </div>

          {/* Generate PDF Button */}
          <div className="flex justify-center mb-4">
            <button
              onClick={generatePDF} // Call generatePDF on button click
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-transform duration-300"
            >
              Generate PDF Report
            </button>
          </div>

          {/* Event Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-black">
              <thead>
                <tr className="w-full bg-gray-800 text-white">
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Event Name</th>
                  <th className="py-3 px-4">Age</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Gender</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <tr key={event._id} className="border-b hover:bg-gray-200">
                      <td className="py-3 px-4">{event.StudentName}</td>
                      <td className="py-3 px-4">{event.EventName}</td>
                      <td className="py-3 px-4">{event.age}</td>
                      <td className="py-3 px-4">{event.gmail}</td>
                      <td className="py-3 px-4">{event.gender}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleEdit(event)} // Call handleEdit with event data
                          className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-transform duration-300 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)} // Call handleDelete with event ID
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-transform duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
