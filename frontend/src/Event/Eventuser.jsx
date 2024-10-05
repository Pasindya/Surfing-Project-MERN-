import React, { useEffect, useState } from 'react';
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Eventuser() {
  const [eventData, setEventData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve event data from localStorage
    const storedEvent = localStorage.getItem('userEvent');
    if (storedEvent) {
      setEventData(JSON.parse(storedEvent));
    }
  }, []);

  // Function to generate PDF resembling a registration form with header information
  const generatePDF = () => {
    fetch('/images/logo.png') // Replace this with the correct logo path
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Logo = reader.result;

          const doc = new jsPDF();

          // Add light yellow background
          doc.setFillColor(255, 255, 204); // RGB for light yellow
          doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

          // Add Logo
          doc.addImage(base64Logo, 'PNG', 10, 10, 30, 30); // x, y, width, height

          // Add Title and Company Information
          doc.setFontSize(22);
          doc.text("SurfDeck", 105, 20, null, null, 'center');
          doc.setFontSize(16);
          doc.text("123 Surf Lane, Beach City, CA", 105, 28, null, null, 'center');

          // Add the current date
          const currentDate = new Date().toLocaleDateString();
          doc.text(`Date: ${currentDate}`, 105, 36, null, null, 'center');

          // Add "Registration Details" heading
          doc.setFontSize(18);
          doc.text("Registration Details", 105, 46, null, null, 'center');

          // Set initial y position for the form fields
          let yPosition = 60;

          // Define fields and their corresponding values
          const fields = [
            { label: "Student Name:", value: eventData.StudentName },
            { label: "Event Name:", value: eventData.EventName },
            { label: "Age:", value: eventData.age.toString() },
            { label: "Gmail:", value: eventData.gmail },
            { label: "Gender:", value: eventData.gender },
          ];

          // Loop through each field to add to the PDF
          fields.forEach((field) => {
            // Add label
            doc.setFontSize(14);
            doc.text(field.label, 20, yPosition);

            // Draw rectangle (simulating input field)
            doc.rect(60, yPosition - 5, 120, 10); // x, y, width, height

            // Add value inside the rectangle
            doc.setFontSize(12);
            doc.text(field.value, 62, yPosition + 2);
            
            // Increment y position for next field
            yPosition += 15;
          });

          // Add Signature ("Thenujaa") above the line
          doc.setFontSize(14);
          doc.setFont("helvetica", "italic"); // Using italic to simulate a cursive signature
          doc.text("Thenujaa", 60, yPosition + 10, null, null, 'center');

          // Add line below the signature
          doc.setLineWidth(0.5);
          doc.line(40, yPosition + 12, 80, yPosition + 12); // Adjusted x-coordinates for better centering

          // Add Role and Company below the line
          doc.setFontSize(12);
          doc.setFont("helvetica", "normal"); // Reset to normal font
          doc.text("Event Manager, Surf Deck.", 60, yPosition + 18, null, null, 'center');

          // Save the PDF
          doc.save("event-registration-details.pdf");
        };

        reader.readAsDataURL(blob);
      })
      .catch(error => {
        console.error('Error loading logo image:', error);
      });
  };

  // Function to send event registration details via email
  const handleSendEmail = () => {
    if (!eventData || !eventData.gmail) {
      alert('Email address is not available.');
      return;
    }

    const subject = encodeURIComponent('Event Registration Details');
    const body = encodeURIComponent(`
Student Name: ${eventData.StudentName}
Event Name: ${eventData.EventName}
Age: ${eventData.age}
Gmail: ${eventData.gmail}
Gender: ${eventData.gender}
    `);
    const mailtoLink = `mailto:${eventData.gmail}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink; // Redirect to the mail client
  };

  if (!eventData) {
    return (
      <div
        className="flex flex-col min-h-screen"
        style={{
          backgroundImage: "url('/images/background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Headernav />
        <div className="flex-grow flex items-center justify-center">
          <div className="p-6 max-w-3xl mx-auto my-8 bg-white bg-opacity-80 shadow-2xl rounded-lg text-center">
            <h2 className="text-3xl font-bold text-center mb-6">No Event Registered</h2>
            <p className="text-center">You have not registered for any event yet.</p>
            <div className="text-center mt-4">
              <button
                onClick={() => navigate('/events')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-transform duration-300"
              >
                Register an Event
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('/images/userback.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Headernav />
      <div className="flex-grow flex items-center justify-center">
        <div className="p-6 max-w-3xl mx-auto my-8 bg-white bg-opacity-80 shadow-2xl rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-6">Your Event Registration</h2>
          <div className="flex flex-col items-center">

            {/* Event Details */}
            <form className="w-full max-w-lg">
              <div className="mb-4">
                <label htmlFor="StudentName" className="block text-lg font-semibold text-gray-800">Student Name:</label>
                <input
                  type="text"
                  id="StudentName"
                  name="StudentName"
                  value={eventData.StudentName}
                  readOnly
                  className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-blue-600 bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="EventName" className="block text-lg font-semibold text-gray-800">Event Name:</label>
                <input
                  type="text"
                  id="EventName"
                  name="EventName"
                  value={eventData.EventName}
                  readOnly
                  className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-blue-600 bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="age" className="block text-lg font-semibold text-gray-800">Age:</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={eventData.age}
                  readOnly
                  className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-blue-600 bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="gmail" className="block text-lg font-semibold text-gray-800">Gmail:</label>
                <input
                  type="email"
                  id="gmail"
                  name="gmail"
                  value={eventData.gmail}
                  readOnly
                  className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-blue-600 bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="gender" className="block text-lg font-semibold text-gray-800">Gender:</label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  value={eventData.gender}
                  readOnly
                  className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-blue-600 bg-gray-100"
                />
              </div>
            </form>

            {/* Buttons */}
            <div className="flex justify-center mt-6 space-x-4">
              {/* Get a Copy Button */}
              <button
                onClick={generatePDF}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-transform duration-300"
              >
                Get a Copy
              </button>

              {/* Send Email Button */}
              <button
                onClick={handleSendEmail}
                className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform duration-300 ${
                  !eventData.gmail ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!eventData.gmail}
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
