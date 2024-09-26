import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios to fetch students
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';
import GoogleButton from 'react-google-button';

const STUDENTS_URL = "http://localhost:5009/students"; // Ensure this URL is correct

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [students, setStudents] = useState([]); // State to store fetched students
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Fetch students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(STUDENTS_URL);
        setStudents(response.data.students || []);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignin = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const foundStudent = students.find(student => student.email === email && student.password === password);
      if (foundStudent) {
        navigate('/packages'); // Redirect if credentials match
      } else {
        setErrors({ form: "Invalid email or password." });
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Headernav />
      <div className="flex flex-1 h-screen">
        <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: "url('public/images/about.jpg')" }} />
        <div className="flex-1 flex flex-col justify-center px-12 py-8 bg-gray-100">
          <div className="max-w-sm mx-auto">
            <h3 className="text-xl mb-4 text-center font-bold">Login</h3>
            <p className="mb-4 text-center">Welcome back! Please enter your details.</p>

            {errors.form && <p className="text-red-500 text-sm mb-4">{errors.form}</p>} {/* Form error message */}

            <form onSubmit={handleSignin}>
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md mb-4`}
                required
              />
              {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email}</p>}

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md mb-4`}
                required
              />
              {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}

              <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-gray-900 mb-4">
                Log in
              </button>
            </form>

            <div className="text-center text-gray-500 my-4">OR</div>

            <div className="flex justify-center">
              <GoogleButton onClick={() => { /* Handle Google Sign-In */ }} />
            </div>

            <p className="text-center mt-4">
              Don't have an account? <a href="/RegisterStu" className="text-blue-500">Sign up for free</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
