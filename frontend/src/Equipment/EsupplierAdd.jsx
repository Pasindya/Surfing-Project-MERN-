import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import girl from "../../public/images/img.jpg";
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';

export default function SupplierAdd() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // Function to get today's date in 'YYYY-MM-DD' format
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Handle name input change with validation to restrict numbers and special characters
  const handleNameChange = (e) => {
    const name = e.target.value.replace(/[^A-Za-z\s]/g, ''); // Only allow letters and spaces
    setFormData({ ...formData, name }); // Update form data with restricted value
  };

  // Validation for quantity input (restricting to numbers)
  const handleQuantityChange = (e) => {
    const quantity = e.target.value.replace(/\D/g, ''); // Only allow numbers
    setFormData({ ...formData, Quantity: quantity });
  };

  // Validation for available fund input (restricting to numbers)
  const handleFundChange = (e) => {
    const fund = e.target.value.replace(/\D/g, ''); // Only allow numbers
    setFormData({ ...formData, fund });
  };

  // Handle date input change
  const handleDateChange = (e) => {
    const date = e.target.value.trim();
    setFormData({ ...formData, Reqdata: date });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5009/api/equiment/Ecreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Submission successful");
        navigate("/");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <Headernav />
      <div className="min-h-screen">
        <img src={girl} alt="" className="w-full h-[700px] opacity-95 object-cover" />
        <div className="absolute transform -translate-x-0 translate-y-0 top-1 flex justify-center items-center">
          <div>
            <div className="lg:mt-20 mt-[270px] md:mt-20 lg:ml-[450px] md:ml-[240px] ml-[4px]">
              <div className="flex justify-center items-center">
                <div>
                  <h1 className="text-4xl font-serif opacity-70 text-gray-800">Request Form</h1>
                  <div className="flex justify-center items-center">
                    <Link to={`/Etable`}>
                      <button className="text-md font-serif underline text-gray-800">Back</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bg-white bg-opacity-10 w-[480px] md:w-[550px] lg:w-[550px] border h-[550px] mt-2 max-w-3xl mx-auto rounded-3xl border-opacity-70">
                <div className="flex justify-center items-center">
                  <div className="mt-2">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                      {/* Name field */}
                      <div>
                        <h3 className="font-semibold text-gray-700 ml-1">Equipment Name</h3>
                        <input
                          className="bg-slate-100 bg-opacity-40 border-white border-opacity-50 p-3 rounded-lg w-[460px] h-11"
                          type="text"
                          placeholder="Enter equipment name"
                          id="name"
                          onChange={handleNameChange}
                          value={formData.name || ""}
                        />
                      </div>

                      {/* Date field with date picker */}
                      <div>
                        <h3 className="font-semibold text-gray-700 ml-1">Required Date</h3>
                        <input
                          className="bg-slate-100 bg-opacity-40 border-white p-3 border-opacity-50 rounded-lg w-[460px] h-11"
                          type="date"
                          id="Reqdata"
                          min={getTodayDate()} // Restrict past dates
                          onChange={handleDateChange}
                          value={formData.Reqdata || ""}
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-700 ml-1">Maintenance Task</h3>
                        <textarea
                          className="bg-slate-100 bg-opacity-40 border-white border-opacity-50 p-3 rounded-lg w-[460px] h-28"
                          placeholder="Describe the task"
                          id="Task"
                          onChange={handleDateChange}
                        />
                      </div>

                      <div className="flex justify-center items-center gap-4">
                        {/* Quantity field */}
                        <div>
                          <h3 className="font-semibold text-gray-950 text-opacity-65 ml-1">Item Quantity</h3>
                          <input
                            className="bg-slate-100 bg-opacity-60 border-white border-opacity-50 p-3 rounded-lg w-[200px] h-10"
                            type="text"
                            id="Quantity"
                            onChange={handleQuantityChange}
                            value={formData.Quantity || ""}
                          />
                        </div>

                        {/* Fund field */}
                        <div>
                          <h3 className="font-semibold text-gray-950 text-opacity-65 ml-1">Available Fund</h3>
                          <input
                            className="bg-slate-100 bg-opacity-60 border-black p-3 rounded-lg w-[200px] h-10"
                            type="text"
                            id="fund"
                            onChange={handleFundChange}
                            value={formData.fund || ""}
                          />
                        </div>
                      </div>

                      <button
                        className="bg-blue-700 mt-6 bg-opacity-80 border-white border border-opacity-50 text-white p-3 rounded-lg w-[460px] h-[45px] hover:opacity-90"
                        type="submit"
                      >
                        <div className="flex items-center justify-center">
                          <div className="font-serif text-xl opacity-75 uppercase">Submit</div>
                        </div>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
