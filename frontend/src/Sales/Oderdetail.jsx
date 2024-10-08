import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Order from '../Sales/Oder'; // Ensure the component is named correctly
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import OrderNav from '../Sales/Odernav'; // Import OrderNav component

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const URL = "http://localhost:5009/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

export default function OrderDetail() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      setUsers(data.users);
      setFilteredUsers(data.users);
    });
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      Object.values(user).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
    setNoResults(filtered.length === 0);
  }, [searchQuery, users]);

  // Generate PDF function
  const handleGeneratePDF = (user, index) => {
    const doc = new jsPDF();
    const logoPath = '/images/logo.png';
    const img = new Image();
    img.src = logoPath;

    img.onload = () => {
      doc.addImage(img, 'JPEG', 10, 10, 50, 20);
      doc.setFontSize(12);
      doc.text('Surfing School', 140, 15);
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString(); // Get current time
      doc.text(`Date: ${currentDate} Time: ${currentTime}`, 140, 22); // Add time to PDF
      doc.setFontSize(18);
      doc.text('Order Details', 80, 40);
      doc.autoTable({
        startY: 50,
        head: [['Field', 'Value']],
        body: [
          ['Card Number', user.cnumber],
          ['MM/YY', user.mmyy],
          ['CVC', user.cvc],
          ['Name', user.name || 'Ashan'], // Set default name
          ['Email', 'info@surfdeck.com'], // Set email
          ['Mobile', '+123 456 7890'], // Set mobile
          ['Address', user.address],
          ['Surfboard Type', user.type],
        ],
      });

      // Add signature section
      const finalY = doc.lastAutoTable.finalY; // Get the Y position after the table
      doc.setFontSize(14);
      doc.text('Ashan', 10, finalY + 20); // Signature name
      doc.setLineWidth(0.5);
      doc.line(10, finalY + 22, 60, finalY + 22); // Line for signature (aligned after the name)
      doc.setFontSize(12);
      doc.text('Sales Manager, SurfDeck', 10, finalY + 30); // Role and company name

      // Save PDF with dynamic filename
      const date = new Date().toISOString().split('T')[0]; // Get current date for filename
      doc.save(`oders_report_${date}.pdf`);
    };
  };

  // Function to count surfboard types
  const getSurfboardTypeCounts = () => {
    const typeCounts = filteredUsers.reduce((acc, user) => {
      const type = user.type || 'Unknown'; // Fallback to 'Unknown' if no type found
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(typeCounts), // Surfboard types
      data: Object.values(typeCounts), // Corresponding counts
    };
  };

  // Get surfboard type counts for the chart
  const surfboardTypeData = getSurfboardTypeCounts();

  // Data for the bar chart
  const chartData = {
    labels: surfboardTypeData.labels, // Surfboard types
    datasets: [
      {
        label: 'Surfboard Type Count',
        data: surfboardTypeData.data, // Counts of each surfboard type
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Surfboard Type Distribution',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Surfboard Types',
        },
      },
    },
  };

  return (
    <>
      {/* Place the navigation bar outside the container */}
      <OrderNav />

      <div className="order-detail-container">
        <div className="main-content">
          <h1 className="heading">Order Details</h1>

          <div className="search-container">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              name="search"
              placeholder="Search Orders"
              value={searchQuery}
              className="search-input"
            />
            <button className="search-button">Search</button>
          </div>

          {noResults ? (
            <div className="no-results"><p>No Orders Found</p></div>
          ) : (
            <>
              {/* Display chart */}
              <div className="chart-container">
                <Bar data={chartData} options={chartOptions} />
              </div>

              {/* Display filtered users */}
              <div className="order-list">
                {filteredUsers.map((user, i) => (
                  <div key={i} className="order-item">
                    <div className="order-item-details">
                      <Order user={user} />
                    </div>
                    <button
                      onClick={() => handleGeneratePDF(user, i)}
                      className="download-button"
                    >
                      Download Order {i + 1}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <style>
        {`
          .order-detail-container {
            padding: 40px;
            max-width: 1100px;
            margin: 0 auto;
            background-color: #f0f4f8;
            border-radius: 12px;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
          }
          .main-content {
            padding: 30px;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
          .heading {
            text-align: center;
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 30px;
            color: #333;
          }
          .search-container {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
          }
          .search-input {
            padding: 12px;
            width: 280px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 16px;
            margin-right: 10px;
          }
          .search-button {
            padding: 12px 20px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
          }
          .search-button:hover {
            background-color: #218838;
          }
          .chart-container {
            margin-bottom: 40px;
            background-color: #fff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
          .order-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
          }
          .order-item {
            padding: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            position: relative;
          }
          .order-item-details {
            margin-bottom: 15px;
          }
          .download-button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            position: absolute;
            bottom: 10px;
            right: 10px;
            transition: background-color 0.3s;
          }
          .download-button:hover {
            background-color: #0056b3;
          }
          .no-results {
            text-align: center;
            font-size: 1.5rem;
            color: #888;
          }
        `}
      </style>
    </>
  );
}
