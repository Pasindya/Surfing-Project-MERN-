import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import girl from "../../public/images/img.jpg";
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';

export default function SupplierAdd() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [validation, setValidation] = useState(null);
  const [validationfund, setFundValidation] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [nameError, setNameError] = useState(null); // State for name validation

  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Handle name input change with validation
  const handleNameChange = (e) => {
    const name = e.target.value;
    const namePattern = /^[A-Za-z\s]*$/; // Allow only letters and spaces

    // Prevent default if input doesn't match the pattern
    if (!namePattern.test(name)) {
      setNameError("Name should contain only letters and spaces.");
      setFormData({ ...formData, name: name.replace(/[^A-Za-z\s]/g, '') }); // Remove invalid characters
    } else {
      setFormData({ ...formData, name }); // Update form data if valid
      setNameError(null); // Clear error message if valid
    }
  };

  // Handle date input change with validation
  const handleDateChange = (e) => {
    const date = e.target.value.trim();
    // Set formData directly since input type is date
    setFormData({ ...formData, Reqdata: date });
    setDateError(null); // Clear error message if valid
  };

  // Validation for quantity input
  const handleQuantityChange = (e) => {
    const quantity = e.target.value.trim();
    const quantityPattern = /^[1-9]\d*$/;

    if (quantity === "") {
      setValidation(null);
    } else if (!quantityPattern.test(quantity)) {
      setValidation("Quantity must be a positive integer.");
    } else {
      setFormData({ ...formData, Quantity: quantity });
      setValidation(null); // Clear error message if valid
    }
  };

  // Validation for available fund input
  const handleFundChange = (e) => {
    const fund = e.target.value.trim();
    const fundPattern = /^[1-9]\d*$/;

    if (fund === "") {
      setFundValidation(null);
    } else if (!fundPattern.test(fund)) {
      setFundValidation("Fund must be a positive number.");
    } else {
      setFormData({ ...formData, fund });
      setFundValidation(null); // Clear error message if valid
    }
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
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        alert("Submission successful");
        navigate("/");
      }
    } catch (error) {
      setPublishError("Something went wrong");
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
                      {/* Name field with validation */}
                      <div>
                        <h3 className="font-semibold text-gray-700 ml-1">Equipment Name</h3>
                        <input
                          className="bg-slate-100 bg-opacity-40 border-white border-opacity-50 p-3 rounded-lg w-[460px] h-11"
                          type="text"
                          placeholder="Enter equipment name"
                          id="name"
                          onChange={handleNameChange}
                        />
                        {nameError && <p className="mt-0 text-red-500">{nameError}</p>}
                      </div>

                      {/* Date field with date picker */}
                      <div>
                        <h3 className="font-semibold text-gray-700 ml-1">Required Date</h3>
                        <input
                          className="bg-slate-100 bg-opacity-40 border-white p-3 border-opacity-50 rounded-lg w-[460px] h-11"
                          type="date"
                          id="Reqdata"
                          onChange={handleDateChange}
                        />
                        {dateError && <p className="mt-0 text-red-500">{dateError}</p>}
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-700 ml-1">Maintenance Task</h3>
                        <textarea
                          className="bg-slate-100 bg-opacity-40 border-white border-opacity-50 p-3 rounded-lg w-[460px] h-28"
                          placeholder="Describe the task"
                          id="Task"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="flex justify-center items-center gap-4">
                        {/* Quantity field with validation */}
                        <div>
                          <h3 className="font-semibold text-gray-950 text-opacity-65 ml-1">Item Quantity</h3>
                          <input
                            className="bg-slate-100 bg-opacity-60 border-white border-opacity-50 p-3 rounded-lg w-[200px] h-10"
                            type="text"
                            id="Quantity"
                            onChange={handleQuantityChange}
                          />
                          {validation && <p className="mt-0 text-red-500">{validation}</p>}
                        </div>

                        {/* Fund field with validation */}
                        <div>
                          <h3 className="font-semibold text-gray-950 text-opacity-65 ml-1">Available Fund</h3>
                          <input
                            className="bg-slate-100 bg-opacity-60 border-black p-3 rounded-lg w-[200px] h-10"
                            type="text"
                            id="fund"
                            onChange={handleFundChange}
                          />
                          {validationfund && <p className="mt-0 text-red-500">{validationfund}</p>}
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

                    {publishError && (
                      <p className="mt-0 text-red-600 absolute bg-slate-100 bg-opacity-50 w-300 h-12 ml-[-50px] rounded-lg text-center">
                        {publishError}
                      </p>
                    )}
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
