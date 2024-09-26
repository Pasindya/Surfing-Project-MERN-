
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import girl from "../../public/images/image.jpg";

export default function supplierAdd() {
  const [formData, setFormData] = useState({});
  
    const [publishError, setPublishError] = useState(null);
    console.log(formData);
    const { upId } = useParams();
  
    const navigate = useNavigate();

 
  
  useEffect(() => {
    try {
      const fetchE = async () => {
        const res = await fetch(
          `http://localhost:5009/api/equiment/getAll?upId=${upId}`
        );
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          const selectedE = data.equipment.find(
            (Employe) => Employe._id === upId
          );
          if (selectedE) {
            setFormData(selectedE);
          }
        }
      };
      fetchE();
    } catch (error) {
      console.log(error.message);
    }
  }, [upId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5009/api/equiment/Euip/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        
        alert("sucsses ")
        navigate("/Etable");
        
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };





  return (

    <div>
        <Headernav/>
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
                

                <h1 className="text-4xl font-serif opacity-80 text-gray-800">
                  Update Requst Form 
                </h1>
                <div className="flex justify-center items-center">
                <Link to={`/Etable`}>
                <button className="text-md hover:text-white  font-serif underline text-gray-800">
                  Back
                </button>
              </Link>
                </div>
              </div>
            </div>
            <div className="bg-white bg-opacity-10 w-[480px]  md:w-[550px] lg:w-[550px] border h-[550px] mt-2 max-w-3xl mx-auto rounded-3xl border-opacity-70 ">
              <div className="flex justify-center items-center   ">
                <div className="mt-2">
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                      <h3 className="font-semibold text-gray-700 ml-1">
                        Equipment Name
                      </h3>
                      <input
                        className=" bg-slate-100 bg-opacity-40 border-white border-opacity-50  p-3 rounded-lg w-[460px] h-11"
                        type=""
                        placeholder=""
                        id="name"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        value={formData.name}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 ml-1">
                        Required Date
                      </h3>
                      <input
                        className=" bg-slate-100 bg-opacity-40 border-white p-3 border-opacity-50 rounded-lg w-[460px] h-11"
                        type=""
                        placeholder=""
                        id="Reqdata"
                        maxLength={10}
                        onChange={(e) => setFormData({ ...formData, Reqdata: e.target.value })}
                        value={formData.Reqdata}
                      />
                       <p className="mt-0 text-red-950 h-0     rounded-lg text-center ">
                       Please Enter the this format (mm/dd/yy)
                    </p>
                    </div>
                    <div className="mt-2">
                      <h3 className="font-semibold text-gray-700 ml-1">
                        Maintenance Task
                      </h3>
                      <textarea
                        className=" bg-slate-100 bg-opacity-40 border-white border-opacity-50  p-3 rounded-lg w-[460px] h-28"
                        type=""
                        placeholder=""
                        id="Task"
                        onChange={(e) => setFormData({ ...formData, Task: e.target.value })}
                        value={formData.Task}
                      />
                    </div>
                    <div className="flex justify-center items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-950 text-opacity-65 ml-1">
                        Item Quantity
                      </h3>
                      <input
                        className=" bg-slate-100 bg-opacity-40 border-white border-opacity-50  p-3 rounded-lg w-[200px] h-10"
                        type=""
                        placeholder=""
                        id="Quantity"
                        onChange={(e) => setFormData({ ...formData, Quantity: e.target.value })}
                        value={formData.Quantity}
                      />
                      <p className="mt-0 text-red-950 h-0     rounded-lg text-center ">
                        Enter the positve number
                    </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-950 text-opacity-65 ml-1">
                        Available Fund
                      </h3>
                      <input
                        className=" bg-slate-100 bg-opacity-40 border-white border-opacity-50  p-3 rounded-lg w-[200px] h-10"
                        type=""
                        placeholder=""
                        id="fund"
                        onChange={(e) => setFormData({ ...formData, fund: e.target.value })}
                        value={formData.fund}
                      />
                       <p className="mt-0 text-red-950 h-0     rounded-lg text-center ">
                        Enter the positve number
                    </p>
                    </div>

                    </div>
                    
                    <button
                      className=" bg-blue-700 mt-6 bg-opacity-80 border-white border border-opacity-50 text-white p-3 rounded-lg w-[460px] h-[45px] hover:opacity-90"
                      type="submit"
                     
                    >
                     
                          <div className="flex items-center justify-center">
                            <div className="font-serif text-xl opacity-75 uppercase">
                              Update
                            </div>
                          </div>
                        
                    </button>
                  </form>

                  {publishError && (
                    <p className="mt-0 text-red-600 absolute bg-slate-100 bg-opacity-50  w-300 h-12 ml-[-50px] rounded-lg text-center ">
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
