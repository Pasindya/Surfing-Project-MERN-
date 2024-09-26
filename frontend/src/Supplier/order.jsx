
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import girl from "../../public/images/imgg.jpg";

import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';

export default function Order() {
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const [validation, setValidation] = useState(null);
  
    const navigate = useNavigate();
  
    const handlchange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch("http://localhost:5009/api/suplier/Ocreate", {
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
          console.log("sussessfull");
          alert('successfull')
          navigate("/")
         
        }
      } catch (error) {
        setPublishError("Something went wrong");
      }
    };


    //validation
    const handleQuantityChange = (e) => {
        const quntity = e.target.value.trim();
        const quantityPattern = /^[1-9]\d*$/; // Pattern for positive integers

        if (quntity === "") {
            setValidation(null);
        } else if (!quantityPattern.test(quntity)) {
            if (isNaN(quntity)) {
                setValidation("Quantity must be a number");
            } else {
                setValidation("Quantity must be a positive integer");
            }
        } else {
            setFormData({ ...formData, quntity });
            setValidation(null);
        }
    };

  return (
   <div> <Headernav/>
    <div className="  min-h-screen ">
      <img
        src={girl}
        alt=""
        className="w-full h-[700px] opacity-95 object-cover "
      />

      <div className="absolute transform -translate-x-0 translate-y-0 top-1  flex justify-center items-center">
        <div className="">
          <div className=" lg:mt-20 mt-[270px]  md:mt-20 lg:ml-[450px] md:ml-[240px] ml-[4px] ">
            <div className=" flex justify-center items-center">
              <div>
                

                <h1 className="text-4xl font-serif opacity-70 text-gray-800">
                  Order Request
                </h1>
                <div className="flex justify-center items-center">
                <Link to={`/table`}>
                <button className="text-md hover:text-white  font-serif underline text-gray-800">
                  Back
                </button>
              </Link>
                </div>
              </div>
            </div>
            <div className="bg-blue-500 bg-opacity-10 w-[480px]  md:w-[550px] lg:w-[550px] border h-[500px] mt-2 max-w-3xl mx-auto rounded-3xl border-opacity-70 ">
              <div className="flex justify-center items-center   ">
                <div className="mt-2">
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                   
                    <div>
                      <h3 className="font-semibold text-gray-700 ml-1">
                        Item Name
                      </h3>
                      <input
                        className=" bg-slate-100 bg-opacity-40 border-white p-3 border-opacity-50 rounded-lg w-[460px] h-11"
                        type=""
                        placeholder=""
                        id="Iname"
                        onChange={handlchange}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 ml-1">
                        Quantity
                      </h3>
                      <input
                        className=" bg-slate-100 bg-opacity-40 border-white border-opacity-50  p-3 rounded-lg w-[460px] h-10"
                        type=""
                        placeholder=""
                        id="quntity"
                        onChange={handleQuantityChange}
                      />
                       {validation && (
                    <p className="mt-0 text-white h-0     rounded-lg text-center ">
                      {validation}
                    </p>
                     )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-950 text-opacity-65 ml-1">
                        Description
                      </h3>
                      <textarea
                        className=" bg-slate-100 bg-opacity-40 border-white border-opacity-50  p-3 rounded-lg w-[460px] h-40"
                        type=""
                        placeholder=""
                        id="description"
                        onChange={handlchange}
                      />
                    </div>
                    <button
                      className=" bg-blue-950 mt-6 bg-opacity-80 border-white border border-opacity-50 text-white p-3 rounded-lg w-[460px] h-[45px] hover:opacity-90"
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
                    <p className="mt-0 text-red-600 absolute bg-slate-100 bg-opacity-50  w-300 h-12  ml-10 rounded-lg text-center ">
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
    <Footer/>
    </div>
  );
}
