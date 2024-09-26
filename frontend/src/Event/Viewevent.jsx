import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';
import jsPDF from 'jspdf';

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
    // Alternatively, navigate to a specific route, e.g., navigate('/home');
  };

  // Filter events based on search query
  const filteredEvents = events.filter((event) =>
    event.StudentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to generate PDF
  const generatePDF = () => {
    const pdf = new jsPDF();
    
    // Add Title
    pdf.setFontSize(20);
    pdf.text("Events Report", 14, 22);

    // Add Column Headers
    pdf.setFontSize(12);
    pdf.text("Student Name", 14, 40);
    pdf.text("Event Name", 60, 40);
    
    pdf.text("Email", 130, 40);
   

    // Add a line for the header
    pdf.line(14, 42, 190, 42); // Start x, Start y, End x, End y

    // Adding data to PDF
    let y = 45; // Start position for data
    filteredEvents.forEach((event) => {
      pdf.text(event.StudentName, 14, y);
      pdf.text(event.EventName, 60, y);
    
      pdf.text(event.gmail, 130, y);
      
      y += 10; // Increase y position for next row
    });

    // Save the PDF
    pdf.save("events-report.pdf");
  };

  if (isLoading) return <div>Loading...</div>; // Loading state
  if (error) return <div>{error}</div>; // Error state

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Headernav />
      <div
        className="relative bg-cover bg-center"
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
                      <td className="py-3 px-4 flex space-x-2">
                        <button
                          onClick={() => handleEdit(event)} // Call handleEdit with the event data
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-transform duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)} // Call handleDelete with event ID
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-transform duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-3 px-4 text-center">
                      No events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
