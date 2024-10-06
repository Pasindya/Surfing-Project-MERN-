import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import girl from "../../public/images/imgg.jpg";
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';


export default function SupplierAdd() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [validation, setValidation] = useState(null);

  const navigate = useNavigate();

  // Function to handle change for text inputs
  const handleChange = (e) => {
    const { id, value } = e.target;

    // Name validation: Only allow letters and spaces, block numbers
    if (id === "name") {
      const namePattern = /^[A-Za-z\s]*$/;
      if (!namePattern.test(value)) {
        setValidation("Name can only contain letters");
        return;
      }
    }

    // Update form data
    setFormData({ ...formData, [id]: value.trim() });
    setValidation(null); // Clear validation messages
  };

  // Function to handle contact number changes
  const handleContactChange = (e) => {
    const contact = e.target.value.trim();
    const contactPattern = /^[0-9]*$/;

    // Block letters and allow only numbers
    if (!contactPattern.test(contact)) {
      setValidation("Contact number must be numeric only");
    } else if (contact.length > 10) {
      setValidation("Contact number must be 10 digits long");
    } else {
      setFormData({ ...formData, contact });
      setValidation(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5009/api/suplier/Pcreate", {
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
        console.log("successful");
        alert("successful");
        navigate('/table');
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div>
      <Headernav />
      <div className="min-h-screen">
        <img
          src={girl}
          alt=""
          className="w-full h-[700px] opacity-95 object-cover"
        />

        <div className="absolute transform -translate-x-0 translate-y-0 top-1 flex justify-center items-center">
          <div className="">
            <div className="lg:mt-20 mt-[270px] md:mt-20 lg:ml-[450px] md:ml-[240px] ml-[4px]">
              <div className="flex justify-center items-center">
                <div>
                  <h1 className="text-4xl font-serif opacity-70 text-gray-800">
                    New Supplier
                  </h1>
                  <div className="flex justify-center items-center">
                    <Link to={`/table`}>
                      <button className="text-md font-serif underline text-gray-800">
                        Back
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bg-blue-500 bg-opacity-10 w-[480px] md:w-[550px] lg:w-[550px] border h-[600px] mt-2 max-w-3xl mx-auto rounded-3xl border-opacity-70">
                <div className="flex justify-center items-center">
                  <div className="mt-2">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                      <div>
                        <h3 className="font-semibold text-gray-700 ml-1">
                          Supplier Name
                        </h3>
                        <input
                          className="bg-slate-100 bg-opacity-40 border-white border-opacity-50 p-3 rounded-lg w-[460px] h-11"
                          type="text"
                          placeholder=""
                          id="name"
                          onChange={handleChange}
                          onKeyPress={(e) => {
                            if (!/^[A-Za-z\s]*$/.test(e.key)) {
                              e.preventDefault(); // Prevent numbers or symbols
                            }
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-700 ml-1">
                          Contact Number
                        </h3>
                        <input
                          className="bg-slate-100 bg-opacity-40 border-white p-3 border-opacity-50 rounded-lg w-[460px] h-11"
                          type="text"
                          placeholder=""
                          id="contact"
                          maxLength={10}
                          onChange={handleContactChange}
                          onKeyPress={(e) => {
                            if (!/^[0-9]*$/.test(e.key)) {
                              e.preventDefault(); // Prevent letters
                            }
                          }}
                        />
                        {validation && (
                          <p className="mt-0 text-white h-0 rounded-lg text-center">
                            {validation}
                          </p>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-700 ml-1">
                          Address
                        </h3>
                        <textarea
                          className="bg-slate-100 bg-opacity-40 border-white border-opacity-50 p-3 rounded-lg w-[460px] h-28"
                          placeholder=""
                          id="Address"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-950 text-opacity-65 ml-1">
                          Supply Items
                        </h3>
                        <textarea
                          className="bg-slate-100 bg-opacity-40 border-white border-opacity-50 p-3 rounded-lg w-[460px] h-28"
                          placeholder="Do you want to order multiple items? You can separate them by commas."
                          id="SItems"
                          onChange={handleChange}
                        />
                      </div>
                      <button
                        className="bg-blue-950 mt-6 bg-opacity-80 border-white border border-opacity-50 text-white p-3 rounded-lg w-[460px] h-[45px] hover:opacity-90"
                        type="submit"
                      >
                        <div className="flex items-center justify-center">
                          <div className="font-serif text-xl opacity-75 uppercase">
                            Submit
                          </div>
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
