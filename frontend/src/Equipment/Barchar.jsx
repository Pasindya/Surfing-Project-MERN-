import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bar, Pie } from 'react-chartjs-2';  // Import Bar and Pie chart components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement  // For the Pie chart
} from 'chart.js';
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';
import Eqnav from "./Eqnav";

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Barchar() {
  const [publishError, setPublishError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const [Info, setInfo] = useState([]);
  const [DId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`http://localhost:5009/api/equiment/getAll`);
        const data = await res.json();

        if (res.ok) {
          setInfo(data.equipment);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchinfo();
  }, []);

  // Prepare data for the bar chart
  const barChartData = {
    labels: Info.map((equip) => equip.name),  // Use equipment names as labels
    datasets: [
      {
        label: 'Quantity',
        data: Info.map((equip) => equip.Quantity), // Use quantity as data
        backgroundColor: 'rgba(255, 99, 132, 0.5)', // Red color
        borderColor: 'rgba(255, 99, 132, 1)', // Dark red border
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for the pie chart
  const pieChartData = {
    labels: Info.map((equip) => equip.name),  // Use equipment names as labels
    datasets: [
      {
        data: Info.map((equip) => equip.Quantity), // Use quantity as data
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',  // Red
          'rgba(54, 162, 235, 0.5)',  // Blue
          'rgba(255, 206, 86, 0.5)',  // Yellow
          'rgba(75, 192, 192, 0.5)',  // Green
          'rgba(153, 102, 255, 0.5)', // Purple
          'rgba(255, 159, 64, 0.5)'   // Orange
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',  // Red border
          'rgba(54, 162, 235, 1)',  // Blue border
          'rgba(255, 206, 86, 1)',  // Yellow border
          'rgba(75, 192, 192, 1)',  // Green border
          'rgba(153, 102, 255, 1)', // Purple border
          'rgba(255, 159, 64, 1)'   // Orange border
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Eqnav />
      <div className="h-[600px] relative">
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex justify-center items-center">
            <h1 className="text-4xl font-serif opacity-90 text-gray-800">Equipment Management</h1>
          </div>

          {/* Render the Bar Chart */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Equipment Quantity Bar Chart</h2>
            <Bar data={barChartData} />
          </div>

          {/* Render the Pie Chart */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Equipment Quantity Pie Chart</h2>
            <Pie data={pieChartData} />
          </div>

          {/* Existing table rendering code... */}
        </div>
      </div>
    </div>
  );
}
