import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';
import Eqnav from "./Eqnav";
import { Bar } from 'react-chartjs-2';  // Import the Bar chart component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
  const chartData = {
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

  return (
    <div>
      <Eqnav />
      <div className="h-[600px] relative">
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex justify-center items-center">
            <h1 className="text-4xl font-serif opacity-90 text-gray-800">Equipment Management</h1>
          </div>

          {/* Search Input and Buttons */}
          {/* Existing code for search and buttons... */}

          {/* Render the Bar Chart */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Equipment Quantity Chart</h2>
            <Bar data={chartData} />
          </div>

          {/* Existing table rendering code... */}
        </div>
      </div>
    </div>
  );
}
