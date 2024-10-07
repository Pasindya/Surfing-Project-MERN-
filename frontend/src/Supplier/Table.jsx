import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cat from "../../public/images/piccc.jpg";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Supnav from "../Supplier/Supnav";
import Logo from "/Surfing-Project-MERN-/frontend/public/images/logo.png"; // Ensure your logo is correctly imported

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
        const res = await fetch(`http://localhost:5009/api/suplier/getAll`);
        const data = await res.json();

        if (res.ok) {
          setInfo(data.suplier);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchinfo();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`http://localhost:5009/api/suplier/deletesup/${DId}`, {
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

  useEffect(() => {
    if (query.trim() === "") {
      setfilter([...Info]);
    } else {
      const filteredData = Info.filter(
        (Employe) =>
          Employe.name &&
          Employe.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Info]);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add logo (Ensure the logo is base64 encoded or accessible as an image)
    doc.addImage(Logo, "JPEG", 10, 10, 50, 30); // Adjust the logo dimensions as needed

    // Add company name and address
    doc.setFontSize(14);
    doc.text("Surf Deck", 70, 20);
    doc.setFontSize(10);
    doc.text("123 Surf Lane, Beach City, CA", 70, 30);
    doc.text("Phone: (123) 456-7890", 70, 35);
    doc.text("Email: info@surfdeck.com", 70, 40);

    // Add title
    doc.setFontSize(16);
    doc.text("Supplier Report", 10, 60);

    // Define the columns for the table
    const columns = [
      { title: "Name", dataKey: "name" },
      { title: "Contact", dataKey: "contact" },
      { title: "Address", dataKey: "address" },
      { title: "Supply Items", dataKey: "sItems" }
    ];

    // Define the data for the table
    const data = Info.map((emp) => ({
      name: emp.name,
      contact: emp.contact,
      address: emp.Address,
      sItems: emp.SItems,
    }));

    // Add table to the PDF
    doc.autoTable({
      startY: 70, // Start the table below the title and logo
      columns: columns,
      body: data,
      styles: {
        cellPadding: 1,
        fontSize: 10,
        lineHeight: 1.2,
        overflow: "linebreak",
      },
      columnStyles: {
        sItems: {
          cellWidth: 'auto',
          minCellWidth: 20,
          halign: 'left',
        }
      }
    });

    // Add signature at the bottom
    const pageHeight = doc.internal.pageSize.height; // Get the height of the PDF page
    doc.setFontSize(12);
    doc.text("Signature: Lasiru(Supplier Manager)", 10, pageHeight - 20); // Add signature at the bottom
 
    // Save the PDF
    doc.save("supplierReport.pdf");
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div>
      <Supnav />
      <div className="h-[600px] relative">
        <img src={Cat} alt="" className="w-full h-full object-cover" />
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div>
            <div className="flex justify-center items-center">
              <div>
                <h1 className="text-4xl font-serif opacity-70 text-gray-800">
                  Supplier Management
                </h1>
              </div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <form>
                <div className="opacity-50">
                  <input
                    type="text"
                    placeholder="Search... "
                    className="w-[350px] h-10 rounded-full shadow-xl border border-white bg-opacity-10"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="mb-1 mt-4">
              <Link to={`/add`}>
                <button className="w-36 bg-blue-900 rounded-lg h-10 bg-opacity-90 border-white border border-opacity-45 text font-serif text-white text-opacity-80">
                  New Supplier
                </button>
              </Link>
              <button
                onClick={generatePDF}
                className="w-24 bg-blue-900 rounded-lg h-10 bg-opacity-90 border-white border border-opacity-45 text font-serif text-white text-opacity-80 ml-2"
              >
                Report
              </button>
            </div>
          </div>

          <div className="lg:w-[900px] xl:w-[1300px] lg:h-[400px] w-[450px] md:w-[700px] rounded-lg bg-opacity-65 bg-slate-500">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full border border-white border-opacity-50 divide-y divide-black shadow-md">
                <thead className="bg-none divide-x divide-black">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs bg-blue-900 bg-opacity-90 text-white font-medium text-opacity-80 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium bg-blue-900 bg-opacity-90 text-white text-opacity-80 uppercase">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium bg-blue-900 bg-opacity-90 text-white text-opacity-80 uppercase">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium bg-blue-900 bg-opacity-90 text-white text-opacity-80 uppercase">
                      Supply Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium bg-blue-900 bg-opacity-90 text-white text-opacity-80 uppercase">
                      Edit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium bg-blue-900 bg-opacity-90 text-white text-opacity-80 uppercase">
                      Delete
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-none bg-opacity-40 divide-y divide-gray-200">
                  {filter && filter.length > 0 ? (
                    <>
                      {filter.map((Employe) => (
                        <tr
                          key={Employe._id}
                          className="dark:border-gray-700 dark:bg-white"
                        >
                          <td className="px-6 py-4 break-words max-w-[300px]">
                            {Employe.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {Employe.contact}
                          </td>
                          <td className="px-6 py-4 break-words max-w-[300px] ">
                            {Employe.Address}
                          </td>
                          <td className="px-6 py-4 break-words max-w-[300px]">
                            {Employe.SItems}
                          </td>
                          <td className="whitespace-nowrap">
                            <Link to={`/update/${Employe._id}`}>
                              <button className="w-24 bg-green-500 hover:opacity-80 rounded-lg h-10 bg-opacity-70 border-white border border-opacity-45 text font-serif text-white text-opacity-80">
                                Edit
                              </button>
                            </Link>
                          </td>
                          <td className="whitespace-nowrap">
                            <button
                              onClick={() => {
                                setformId(Employe._id);
                                handleDeleteUser();
                              }}
                              className="w-24 bg-red-500 hover:opacity-80 rounded-lg h-10 bg-opacity-70 border-white border border-opacity-45 text font-serif text-white text-opacity-80"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No suppliers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold">Success</h2>
            <p>The supplier has been successfully deleted.</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white rounded px-4 py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
