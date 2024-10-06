import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import jsPDF from 'jspdf';
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';

// Import the logo image (make sure the path is correct)
import logo from '/images/logo.png'; // Update the path if necessary

export default function PaymentSummary() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const { paymentDetails } = location.state || {};

  const downloadPDF = () => {
    if (!paymentDetails) return;

    const doc = new jsPDF();

    // Set a soft light blue background color (RGB: 220, 240, 255)
    doc.setFillColor(220, 240, 255);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F'); // Fill the whole page

    // Add the logo
    doc.addImage(logo, 'PNG', 10, 10, 30, 30); // Adjust the path and size if necessary

    // Add company name and address
    doc.setFontSize(16);
    doc.text('SurfDeck', 50, 20); // Company name
    doc.setFontSize(14);
    doc.text('123 Surf Lane, Beach City, CA', 50, 30); // Company address

    // Add the current date
    const currentDate = new Date().toLocaleDateString();
    doc.text(`Date: ${currentDate}`, 150, 20); // Date at the top-right

    // Add the current time below the date
    const currentTime = new Date().toLocaleTimeString();
    doc.text(`Time: ${currentTime}`, 150, 30); // Time directly below the date

    // Draw a line to separate company details and payment details
    doc.setLineWidth(0.5); // Set the line width
    doc.line(10, 50, doc.internal.pageSize.getWidth() - 10, 50); // Horizontal line

    // Add payment report title (centered)
    doc.setFontSize(27);
    const reportTitle = 'Payment Report';
    const reportTitleWidth = doc.getTextWidth(reportTitle);
    doc.text(reportTitle, (doc.internal.pageSize.getWidth() - reportTitleWidth) / 2, 70); // Move down to Y=70

    // Add "Payment Successful" message in the PDF (centered)
    doc.setFontSize(16);
    doc.setTextColor(0, 128, 0); // Green text for success
    const successfulMessage = 'Payment Successful';
    const messageWidth = doc.getTextWidth(successfulMessage);
    doc.text(successfulMessage, (doc.internal.pageSize.getWidth() - messageWidth) / 2, 90); // Move down to Y=90

    // Add Thank You message
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 225); // Change color to blue
    const thankYouMessage = 'Thank you for your payment!';
    const thankYouWidth = doc.getTextWidth(thankYouMessage);
    doc.text(thankYouMessage, (doc.internal.pageSize.getWidth() - thankYouWidth) / 2, 100); // Centered horizontally

    // Set text color back to black for payment details (centered)
    doc.setTextColor(0, 0, 0); // Black color
    doc.setFont('helvetica', 'bold'); // Set font to Helvetica and bold
    doc.setFontSize(15);

    // Calculate vertical center for the payment details
    const verticalStart = 130; // Adjust the start position for details (below the Thank You message)
    const lineHeight = 10;
    const totalLines = 6; // Total number of payment details lines
    const verticalOffset = ((doc.internal.pageSize.getHeight() - (totalLines * lineHeight)) / 2) - verticalStart;

    // Add the payment details (centered vertically and horizontally)
    const details = [
      `Full Name: ${paymentDetails.fullName}`,
      `Email: ${paymentDetails.email}`,
      `Mobile: ${paymentDetails.mobile}`,
      `Address: ${paymentDetails.address}`,
      `Card Type: ${paymentDetails.cardType}`,
      `Total Amount (USD $): ${paymentDetails.totalAmount}`
    ];

    details.forEach((detail, index) => {
      const detailWidth = doc.getTextWidth(detail);
      doc.text(detail, (doc.internal.pageSize.getWidth() - detailWidth) / 2, verticalStart + verticalOffset + (index * lineHeight)); // Centered details vertically and horizontally
    });

    // Add the footer (company email, phone number, and website)
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100); // Dark grey for footer

    const footerText = [
      `Email: info@surfdeck.com`,
      `Phone: +123 456 7890`
    ];

    footerText.forEach((text, idx) => {
      const footerWidth = doc.getTextWidth(text);
      doc.text(text, (doc.internal.pageSize.getWidth() - footerWidth) / 2, 280 + (idx * 5)); // Footer position near the bottom
    });

    // Save the PDF
    doc.save(`Payment_Summary_${paymentDetails.fullName}.pdf`);
  };

  return (
    <div 
      className="min-h-screen flex flex-col" 
      style={{
        backgroundImage: 'url("/images/beach2.jpg")', // Update with the correct path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Headernav />
      
      <div className="p-12 bg-white/80 border-2 border-gray-200 shadow-2xl rounded-3xl max-w-4xl mx-auto my-12 transition-all duration-500">
        <h2 className="text-4xl md:text-5xl font-bold text-center my-6 text-black drop-shadow-lg">
          Payment Summary
        </h2>
        
        <div className="mt-8 space-y-4">
          <p><strong>Full Name:</strong> {paymentDetails.fullName}</p>
          <p><strong>Email:</strong> {paymentDetails.email}</p>
          <p><strong>Mobile:</strong> {paymentDetails.mobile}</p>
          <p><strong>Address:</strong> {paymentDetails.address}</p>
          <p><strong>Card Type:</strong> {paymentDetails.cardType}</p>
          <p><strong>Total Amount (USD $):</strong> {paymentDetails.totalAmount}</p>
          {/* Add more details as necessary */}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={downloadPDF}
            className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-800"
          >
            Download Summary 
          </button>
        </div>
        
        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-800"
          >
            Back to Home
          </button>
        </div>

      </div>

      <div className="mt-auto mb-0"> {/* Add margin-bottom to push footer down */}
        <Footer />
      </div>
    </div>
  );
}
