import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2"; // Import Bar chart from react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; // Import necessary Chart.js components
import Supnav from "./Supnav"; // Keep the navigation bar

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend); // Register Chart.js components

export default function Bchart() {
  const [publishError, setPublishError] = useState(null); // State to handle fetch errors
  const [Info, setInfo] = useState([]); // State to hold supplier data

  // Fetch supplier data from the API
  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`http://localhost:5009/api/suplier/getAll`);
        const data = await res.json();
        if (res.ok) {
          setInfo(data.suplier); // Store supplier data
        } else {
          setPublishError("Error fetching data");
        }
      } catch (error) {
        setPublishError(error.message);
      }
    };
    fetchinfo();
  }, []);

  // Function to count items separated by commas
  const countItems = (itemsString) => {
    if (!itemsString) return 0;
    return itemsString.split(',').length; // Split items by comma and return the count
  };

  // Prepare data for the bar chart
  const barChartData = {
    labels: Info.map((supplier) => supplier.name), // Supplier names as labels
    datasets: [
      {
        label: "Number of Supply Items",
        data: Info.map((supplier) => countItems(supplier.SItems)), // Count supply items for each supplier
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Bar border color
        borderWidth: 1, // Border width of the bars
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to resize properly
    scales: {
      y: {
        beginAtZero: true, // Ensure Y-axis starts at zero
        ticks: {
          stepSize: 1, // Increment by 1
        },
        title: {
          display: true, // Display Y-axis label
          text: "Number of Categories", // Y-axis label
          font: { size: 14 }, // Y-axis label font size
        },
      },
      x: {
        title: {
          display: true, // Display X-axis label
          text: "Supplier Name", // X-axis label
          font: { size: 14 }, // X-axis label font size
        },
      },
    },
    plugins: {
      legend: {
        display: true, // Display legend
        position: "top", // Legend position
      },
      title: {
        display: true, // Display title
        text: "Supply Items by Supplier", // Chart title
        font: { size: 20 }, // Slightly smaller title
        color: "#000", // Title color
      },
    },
  };

  return (
    <div>
      <Supnav /> {/* Navigation bar */}
      
      <div className="flex justify-center items-center mt-6 h-[500px]"> {/* Adjust height */}
        {/* Display error message if data fetching fails */}
        {publishError ? (
          <p className="text-red-500">{publishError}</p>
        ) : (
          <div className="w-4/5 h-full"> {/* Moderate width and height */}
            <Bar data={barChartData} options={chartOptions} /> {/* Render the bar chart */}
          </div>
        )}
      </div>
    </div>
  );
}
