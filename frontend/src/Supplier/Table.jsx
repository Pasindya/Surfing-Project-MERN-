import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cat from "../../public/images/piccc.jpg";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Supnav from "../Supplier/Supnav";
import logo from "../../public/images/logo.png"; // Import the logo image

// Signature info
const name = "Lasiru";
const role = "Supplier Manager";

export default function Schedul() {
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
      const res = await fetch(
        `http://localhost:5009/api/suplier/deletesup/${DId}`,
        {
          method: "DELETE",
        }
      );
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
      const filteredData = Info.filter(
        (Employe) =>
          Employe.name &&
          Employe.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Info]);

  // PDF generation with logo, company name, address, date, time, and signature
  const generatePDF = () => {
    const doc = new jsPDF();

    const currentDate = new Date().toLocaleDateString(); // Current Date
    const currentTime = new Date().toLocaleTimeString(); // Current Time

    // Add logo to the PDF (x, y, width, height)
    doc.addImage(logo, "PNG", 10, 10, 50, 20); // Adjust the position and size as needed

    // Add company name
    doc.setFontSize(16);
    doc.text("SurfDeck", 70, 15); // Adjust the position for the company name

    // Add company address
    doc.setFontSize(12);
    doc.text("123 Surf Lane, Beach City, CA", 70, 23); // Adjust position for address

    // Add date and time
    doc.setFontSize(10);
    doc.text(`Date: ${currentDate}`, 70, 30);
    doc.text(`Time: ${currentTime}`, 120, 30);

    // Add title
    doc.setFontSize(18);
    doc.text("Supplier Report", 70, 40); // Adjust position for title

    // Define the columns for the table
    const columns = [
      { title: "Name", dataKey: "name" },
      { title: "Contact", dataKey: "contact" },
      { title: "Address", dataKey: "address" },
      { title: "Supply Items", dataKey: "sItems" },
    ];

    // Define the data for the table
    const data = Info.map((emp) => ({
      name: emp.name,
      contact: emp.contact,
      address: emp.Address,
      sItems: emp.SItems,
    }));

    // Add some space between the title and the table
    doc.autoTable({
      startY: 50, // Start the table after the logo, company info, and title
      columns: columns,
      body: data,
      styles: {
        cellPadding: 1,
        fontSize: 10,
        lineHeight: 1.2,
        overflow: "linebreak", // Ensure text wraps to the next line
      },
      columnStyles: {
        sItems: {
          cellWidth: "auto", // Automatically adjust column width
          minCellWidth: 20, // Minimum width before wrapping
          halign: "left", // Horizontal alignment
        },
      },
    });

    // Add signature section
    doc.setFontSize(12);
    doc.text(`Signature:`, 10, doc.previousAutoTable.finalY + 10);
    doc.text(`${name}`, 30, doc.previousAutoTable.finalY + 10); // Name
    doc.text(`${role}, SurfDeck`, 30, doc.previousAutoTable.finalY + 15); // Role and company

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
            <div>
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
            </div>
            <div className="mb-1 mt-4">
              <Link to={`/add`}>
                <button className="w-36 bg-blue-900 rounded-lg h-10 bg-opacity-90 border-white border border-opacity-45 text font-serif text-white text-opacity-80">
                  New Supplier
                </button>
              </Link>
              <button
                onClick={() => generatePDF()}
                className="w-24 bg-blue-900 rounded-lg h-10 bg-opacity-90 border-white border border-opacity-45 text font-serif text-white text-opacity-80 ml-2"
              >
                Report
              </button>
            </div>
          </div>

          <div className="lg:w-[900px] xl:w-[1300px] lg:h-[400px] w-[450px] md:w-[700px] rounded-lg bg-opacity-65 bg-slate-500">
            <div className="">
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
                        Send Order
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

                            <td className="px-6 py-4 whitespace-nowrap">
                              {Employe.Address}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              {Employe.SItems}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                className="bg-cyan-900 rounded-lg px-2 h-7 text-white bg-opacity-95"
                                onClick={() =>
                                  navigate(`/ordersup/${Employe._id}`)
                                }
                              >
                                Send
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                className="bg-green-900 rounded-lg px-2 h-7 text-white bg-opacity-95"
                                onClick={() =>
                                  navigate(`/editsup/${Employe._id}`)
                                }
                              >
                                Edit
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                className="bg-red-900 rounded-lg px-2 h-7 text-white bg-opacity-95"
                                onClick={() => setformId(Employe._id)}
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
                          className="text-center text-gray-500 py-4"
                        >
                          No matching records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title text-gray-700"
                            id="exampleModalLabel"
                          >
                            Confirm Delete
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body text-gray-700">
                          Are you sure you want to delete this supplier?
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={handleDeleteUser}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {showSuccessModal && (
                  <div
                    id="successModal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto h-modal h-full"
                  >
                    <div className="relative w-full h-full max-w-md h-auto">
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button
                          type="button"
                          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                          onClick={closeModal}
                        >
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </button>
                        <div className="p-6 text-center">
                          <svg
                            aria-hidden="true"
                            className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 13h6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h3l2-2h4l2 2h3a2 2 0 012 2v14a2 2 0 01-2 2z"
                            ></path>
                          </svg>
                          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Supplier deleted successfully.
                          </h3>
                          <button
                            data-modal-hide="successModal"
                            type="button"
                            className="btn btn-primary"
                            onClick={closeModal}
                          >
                            OK
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
