import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cat from "../../public/images/piccc.jpg";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';



export default function Schedul() {
  const [publishError, setPublishError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const [Info, setInfo] = useState([]);
  console.log(Info);
  const [DId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");

  console.log();

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`http://localhost:5009/api/suplier/getAll`);
        const data = await res.json();
        console.log(data);

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

  //search
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilter([...Info]);
    } else {
      // If there's a query, filter the data
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
  
    // Add title
    doc.text("Supplier Report", 10, 10);
  
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
      sItems: emp.SItems
    }));
  
    // Add table to the PDF
    doc.autoTable({
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
          cellWidth: 'auto', // Automatically adjust column width
          minCellWidth: 20, // Minimum width before wrapping
          halign: 'left', // Horizontal alignment
        }
      }
    });
  
    // Save the PDF
    doc.save("supplierReport.pdf");
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };


  return (

    <div> <Headernav/>
    <div className="h-[600px] relative">
      <img src={Cat} alt="" className="w-full h-full object-cover" />

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div>
          <div className=" flex justify-center items-center">
            <div>
              <h1 className="text-4xl font-serif opacity-70 text-gray-800">
                Supplier Management
              </h1>
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center mt-2 ">
              <form>
                <div className="opacity-50">
                  <input
                    type="text"
                    placeholder="Search... "
                    className=" w-[350px] h-10 rounded-full shadow-xl border border-white bg-opacity-10"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className=" mb-1 mt-4  ">
          <Link to={`/add`}>
            <button className="w-36 bg-blue-900 rounded-lg  h-10 bg-opacity-90 border-white border border-opacity-45 text font-serif text-white text-opacity-80">
              New Supplier
            </button>
            </Link>
            <button
              onClick={() => generatePDF()}
              className="w-24 bg-blue-900 rounded-lg  h-10 bg-opacity-90 border-white border border-opacity-45 text font-serif text-white text-opacity-80 ml-2"
            >
              Report
            </button>
          </div>
        </div>
       
        <div className=" lg:w-[900px] xl:w-[1300px] lg:h-[400px] w-[450px]  md:w-[700px] rounded-lg bg-opacity-65  bg-slate-500">
   
          <div className="">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full border border-white border-opacity-50 divide-y divide-black shadow-md">
                <thead className="bg-none divide-x divide-black">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs bg-blue-900 bg-opacity-90 text-white font-medium text-opacity-80   uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium   bg-blue-900 bg-opacity-90 text-white text-opacity-80   uppercase">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium  bg-blue-900 bg-opacity-90 text-white text-opacity-80   uppercase">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium  bg-blue-900 bg-opacity-90 text-white text-opacity-80   uppercase">
                      Supply Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium  bg-blue-900 bg-opacity-90 text-white text-opacity-80   uppercase">
                      Send Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium  bg-blue-900 bg-opacity-90 text-white text-opacity-80    uppercase">
                      Edit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium bg-blue-900 bg-opacity-90 text-white text-opacity-80   uppercase">
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
                          className=" dark:border-gray-700 dark:bg-white"
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

                          <td className="px-6 py-4  break-words max-w-[300px]">
                            {Employe.SItems}
                          </td>
                          
                          <td className=" whitespace-nowrap">
                            <Link to={`/order`}>
                              <button className="w-24 bg-blue-600 rounded-lg  hover:opacity-80 h-10 bg-opacity-70 border-white border border-opacity-45 text font-serif text-white text-opacity-80 ml-2">
                                Order
                              </button>
                            </Link>
                          </td>

                          <td className="  whitespace-nowrap">
                            <Link to={`/update/${Employe._id}`}>
                              <button className="w-24 bg-green-500 hover:opacity-80 rounded-lg  h-10 bg-opacity-70 border-white border border-opacity-45 text font-serif text-white text-opacity-80 ">
                                Edit
                              </button>
                            </Link>
                          </td>
                          <td className="px-2 py-4 whitespace-nowrap">
                            <span
                              onClick={() => {
                                setformId(Employe._id);
                                handleDeleteUser();
                              }}
                            >
                              <button className="w-24 bg-red-600 hover:opacity-80 rounded-lg  h-10 bg-opacity-70 border-white border border-opacity-45 text font-serif text-white text-opacity-80 ">
                                Delete
                              </button>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-serif absolute ml-[540px] opacity-60 mt-14 ">
                        You have no Supplier yet
                      </p>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        
        </div>
       
       

      </div>

      {showSuccessModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Success!
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Supplier is successfully deleted.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeModal}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-14 mt-5"></div>
    </div>
    <Footer/>
    </div>
  );
}
