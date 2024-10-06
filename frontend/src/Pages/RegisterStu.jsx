import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Headernav from '../Components/Headernav'; // Importing the header
import Footer from '../Components/Footer'; // Importing the footer
import GoogleButton from 'react-google-button';
import axios from 'axios'; // Assuming you're using axios for API calls

export default function RegisterStu() {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    address: '',
    mobileno: '',
    password: ''
  });

  const [isSuccess, setIsSuccess] = useState(false); // Success state
  const [errors, setErrors] = useState({}); // Error state for validation
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for name (only characters allowed)
    if (name === 'name') {
      const regex = /^[A-Za-z\s]*$/;
      if (regex.test(value)) {
        setInputs(prevState => ({
          ...prevState,
          [name]: value
        }));
      }
      return; // Prevent further input if the value contains invalid characters
    }
    
    // Validation for mobile number (must be exactly 10 digits)
    if (name === 'mobileno') {
      const regex = /^\d{0,10}$/; // Allows only digits and limits input to 10 digits
      if (!regex.test(value)) {
        return; // Prevent further input if more than 10 digits or non-digit is typed
      }
      if (value.length < 10) {
        setErrors(prevState => ({
          ...prevState,
          mobileno: 'Mobile number must be 10 digits.'
        }));
      } else {
        setErrors(prevState => ({
          ...prevState,
          mobileno: null
        }));
      }
    }

    setInputs(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are validation errors
    if (errors.name || errors.mobileno || !inputs.name || !inputs.mobileno) {
      console.error('Please correct the errors before submitting.');
      return;
    }

    try {
      // Assuming you're posting form data to the server
      await axios.post('http://localhost:5009/students', inputs);

      // Set success state to true
      setIsSuccess(true);

      // Set a timeout to redirect after a short delay
      setTimeout(() => {
        navigate('/signin', { state: { userData: inputs } });
      }, 2000); // Adjust time as needed
    } catch (err) {
      console.error('Error adding student:', err);
    }
  };

  useEffect(() => {
    // Adding the chatbot script dynamically
    const script1 = document.createElement('script');
    script1.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "brrFnXT5za7asdHqSc_WS",
        domain: "www.chatbase.co"
      }
    `;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = "https://www.chatbase.co/embed.min.js";
    script2.setAttribute("chatbotId", "brrFnXT5za7asdHqSc_WS");
    script2.setAttribute("domain", "www.chatbase.co");
    script2.setAttribute("defer", true);
    document.body.appendChild(script2);

    // Cleanup function to remove the scripts on component unmount
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Headernav />

      <div className="flex flex-1">
        {/* Left section with image */}
        <div className="hidden lg:flex flex-1 bg-cover bg-center" style={{ backgroundImage: "url('/images/ho2.jpg')" }}>
          <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 w-full h-full">
            <h1 className="text-4xl text-white font-bold mb-4">Sign Up</h1>
            <p className="text-white text-lg">Sign up to unlock exciting experiences with our services.</p>
          </div>
        </div>

        {/* Right section with form */}
        <div className="flex-1 flex flex-col justify-center px-12 py-8 bg-gray-100">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl mb-6 text-center font-bold">Let's Get Started</h3>

            {isSuccess ? (
              <div className="text-center text-green-500 animate-bounce">
                <h2 className="text-3xl font-bold">Registration Successful!</h2>
                <p className="text-lg">Redirecting to your profile...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={inputs.name}
                    onChange={handleChange}
                    placeholder="Amy Jane"
                    className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    required
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={inputs.address}
                    onChange={handleChange}
                    placeholder="123 Main St."
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Mobile</label>
                  <input
                    type="tel"
                    name="mobileno"
                    value={inputs.mobileno}
                    onChange={handleChange}
                    placeholder="+1 234 567 890"
                    className={`w-full p-3 border ${errors.mobileno ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    required
                  />
                  {errors.mobileno && <p className="text-red-500 text-sm">{errors.mobileno}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="flex items-center mb-4">
                  <input type="checkbox" className="mr-2" required />
                  <label className="text-sm">
                    By continuing, you agree to our <a href="#" className="text-blue-500">Terms & Conditions</a> and <a href="#" className="text-blue-500">Privacy Policy</a>.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-teal-600"
                >
                  Register
                </button>
              </form>
            )}

            {!isSuccess && (
              <>
                <div className="text-center my-4">OR</div>

                <div className="flex justify-center">
                  <GoogleButton onClick={() => { /* Handle Google Sign-Up */ }} />
                </div>

                <p className="text-center mt-4">
                  Already have an account? <a href="/Signin" className="text-blue-500">Login now</a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Chatbot scripts will be loaded here */}
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
