import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import for table functionality

export default function Viewevent() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5009/events');
        setEvents(response.data.planevents);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Error fetching events. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEdit = (eventData) => {
    navigate('/updateevent', { state: { eventData } });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:5009/events/${id}`);
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
        alert('Event deleted successfully');
      } catch (err) {
        console.error('Error deleting event:', err);
        alert('Error deleting event. Please try again later.');
      }
    }
  };

  const handleGenerateReport = () => {
    const doc = new jsPDF(); // Create a new PDF document

    doc.setFontSize(18);
    doc.text('Employee/Event Report', 14, 22);
    doc.setFontSize(12);
    doc.text('Generated on: ' + new Date().toLocaleString(), 14, 30);

    const filteredEvents = events.filter((event) =>
      event.StudentName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredEvents.length > 0) {
      const tableColumn = ['Student Name', 'Event Name', 'Age', 'Email', 'Gender'];
      const tableRows = [];

      filteredEvents.forEach((event) => {
        const eventData = [
          event.StudentName,
          event.EventName,
          event.age,
          event.gmail,
          event.gender,
        ];
        tableRows.push(eventData);
      });

      // Add autoTable for rows
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 40,
      });

      doc.save('Employee_Event_Report.pdf'); // Save the PDF
    } else {
      alert('No events found for the search query!');
    }
  };

  const handleGenerateSummaryReport = () => {
    const doc = new jsPDF(); // Create a new PDF document for summary report

    doc.setFontSize(18);
    doc.text('Summary Report', 14, 22);
    doc.setFontSize(12);
    doc.text('Generated on: ' + new Date().toLocaleString(), 14, 30);

    const totalEvents = events.length; // Get total events
    const uniqueStudents = [...new Set(events.map(event => event.StudentName))].length; // Count unique students

    doc.text(`Total Events: ${totalEvents}`, 14, 40);
    doc.text(`Unique Students: ${uniqueStudents}`, 14, 50);
    
    doc.save('Summary_Report.pdf'); // Save the summary report
  };

  const filteredEvents = events.filter((event) =>
    event.StudentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border px-4 py-2 rounded-lg"
            />
          </div>

          {/* Generate Report Button */}
          <div className="flex justify-center mb-4">
            <button
              onClick={handleGenerateReport}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-transform duration-300 mx-2"
            >
              Generate Detailed Report
            </button>

            {/* New Summary Report Button */}
            <button
              onClick={handleGenerateSummaryReport}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-transform duration-300 mx-2"
            >
              Generate Summary Report
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
                          onClick={() => handleEdit(event)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-transform duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
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
