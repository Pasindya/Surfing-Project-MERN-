import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cat from "/Surfing-Project-MERN-/frontend/public/images/logo.png";
import jsPDF from "jspdf";
import "jspdf-autotable";

import Eqnav from "./Eqnav";

export default function Schedul() {
  const [publishError, setPublishError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const [Info, setInfo] = useState([]);
  const [DId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState("");

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

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`http://localhost:5009/api/equiment/deleteEuip/${DId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setInfo((prev) => prev.filter((Employe) => Employe._id !== DId));
        setShowSuccessModal(true);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Search functionality
  useEffect(() => {
    if (query.trim() === "") {
      setfilter([...Info]);
    } else {
      const filteredData = Info.filter((Employe) =>
        Employe.name && Employe.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Info]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const logo = new Image();
    logo.src = Cat; // Use the appropriate path for your logo

    // Add logo
    doc.addImage(logo, 'JPEG', 10, 10, 30, 30); // Adjust the dimensions and position as needed

    // Add company details
    doc.setFontSize(12);
    doc.text("Company Name", 50, 20);
    doc.text("Address: 123 Main St, City, Country", 50, 25);
    doc.text("Email: example@company.com", 50, 30);
    doc.text("Mobile: +1234567890", 50, 35);

    // Add title
    doc.text("Equipment Report", 10, 50);

    // Define the columns for the table
    const columns = [
      { title: "Name", dataKey: "name" },
      { title: "Required Data", dataKey: "Reqdata" },
      { title: "Maintenance Task", dataKey: "Task" },
      { title: "Items Quantity", dataKey: "Quantity" },
      { title: "Available Fund", dataKey: "fund" },
    ];

    // Define the data for the table
    const data = Info.map((emp) => ({
      name: emp.name,
      Reqdata: emp.Reqdata,
      Task: emp.Task,
      Quantity: emp.Quantity,
      fund: emp.fund,
    }));

    // Add table to the PDF
    doc.autoTable({
      columns: columns,
      body: data,
      startY: 60, // Starting position for the table
      styles: {
        cellPadding: 1,
        fontSize: 10,
        lineHeight: 1.2,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [173, 216, 230], // Light blue color
        textColor: [0, 0, 0], // Black text color
        fontStyle: "bold",
      },
      columnStyles: {
        0: { halign: "left" },
        1: { halign: "left" },
        2: { halign: "left" },
        3: { halign: "left" },
        4: { halign: "left" },
      },
    });

    // Add signature section
    const signatureY = doc.autoTable.previous.finalY + 10;
   
    doc.text("Signature:Hansi", 10, signatureY + 10); // Name
    doc.text(" Equipment Manager,SurfDeck", 10, signatureY + 15); // Role

    // Save the PDF
    doc.save("equipmentReport.pdf");
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div>
      <Eqnav />
      <div className="h-[600px] relative">
        <img src={Cat} alt="" className="w-full h-full object-cover" />
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div>
            <div className="flex justify-center items-center">
              <div>
                <h1 className="text-4xl font-serif opacity-90 text-gray-800">Equipment Management</h1>
              </div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <form>
                <div className="opacity-50">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-[350px] h-10 rounded-full shadow-xl border border-white bg-opacity-10"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="mb-1 mt-4">
              <Link to={`/Eadd`}>
                <button className="w-36 bg-blue-600 rounded-lg h-10 bg-opacity-90 border-white border border-opacity-45 text font-serif text-white text-opacity-90">
                  New Request
                </button>
              </Link>
              <button
                onClick={() => generatePDF()}
                className="w-24 bg-blue-600 rounded-lg h-10 bg-opacity-90 border-white border border-opacity-45 text font-serif text-white text-opacity-90 ml-2"
              >
                Report
              </button>
            </div>
          </div>
          <div className="lg:w-[900px] xl:w-[1300px] lg:h-[400px] w-[450px] md:w-[700px] rounded-lg bg-opacity-30 bg-white">
            <div>
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full border border-white border-opacity-50 divide-y divide-white divide-opacity-40 shadow-md">
                  <thead className="bg-none divide-x divide-black">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs bg-blue-700 bg-opacity-70 text-white font-medium text-opacity-80 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium bg-blue-700 bg-opacity-70 text-white text-opacity-80 uppercase">Required Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium bg-blue-700 bg-opacity-70 text-white text-opacity-80 uppercase">Maintenance Task</th>
                      <th className="px-6 py-3 text-left text-xs font-medium bg-blue-700 bg-opacity-70 text-white text-opacity-80 uppercase">Items Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium bg-blue-700 bg-opacity-70 text-white text-opacity-80 uppercase">Available Fund</th>
                      <th className="px-6 py-3 text-left text-xs font-medium bg-blue-700 bg-opacity-70 text-white text-opacity-80 uppercase">Edit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium bg-blue-700 bg-opacity-70 text-white text-opacity-80 uppercase">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="bg-none bg-opacity-40 divide-y divide-gray-200">
                    {filter && filter.length > 0 ? (
                      <>
                        {filter.map((Employe) => (
                          <tr key={Employe._id} className="dark:border-gray-700 dark:bg-white">
                            <td className="px-6 py-4 break-words max-w-[300px]">{Employe.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{Employe.Reqdata}</td>
                            <td className="px-6 py-4 break-words max-w-[300px]">{Employe.Task}</td>
                            <td className="px-6 py-4 break-words max-w-[300px]">{Employe.Quantity}</td>
                            <td className="px-8 py-4 whitespace-nowrap">{Employe.fund}</td>
                            <td className="whitespace-nowrap">
                              <Link to={`/Eupdate/${Employe._id}`}>
                                <button className="bg-green-500 rounded-lg border border-gray-300 px-4 py-1 text-white text-opacity-90 hover:bg-green-600">Edit</button>
                              </Link>
                            </td>
                            <td className="whitespace-nowrap">
                              <button
                                className="bg-red-500 rounded-lg border border-gray-300 px-4 py-1 text-white text-opacity-90 hover:bg-red-600"
                                onClick={() => {
                                  setformId(Employe._id);
                                  handleDeleteUser();
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-4">No records found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}
