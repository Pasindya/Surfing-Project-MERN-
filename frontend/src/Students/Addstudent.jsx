import React, { useState } from 'react';
import Studentnav from './Studentnav'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Addstudent() {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    address: '',
    mobileno: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5009/students', inputs);
      setInputs({
        name: '',
        email: '',
        address: '',
        mobileno: '',
        password: ''
      });
      navigate('/studentdetails');
    } catch (err) {
      console.error('Error adding student:', err);
    }
  };

  

  return (
    <div className="flex min-h-screen bg-cover bg-center"   style={{ backgroundImage: "url('/images/img2.jpg')" }} >
      {/* Sidebar Navigation */}
      <Studentnav />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 lg:ml-80 lg:p-12">
        {/* Blue gradient header */}
        <header className="bg-blue-800 text-white py-10 px-8 rounded-lg shadow-xl mt-12">
          <h1 className="text-4xl font-extrabold leading-tight mb-4">Add New Student</h1>
          <p className="text-lg">Fill in the details to add a new student to the system.</p>
        </header>

        {/* Form for Adding Student */}
        <div className="mt-12 bg-white shadow-lg rounded-xl p-10 border-l-4 border-blue-900">
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                className="mt-1 p-4 border border-blue-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter student name"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                className="mt-1 p-4 border border-blue-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter email address"
                required
              />
            </div>

            {/* Address */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                value={inputs.address}
                onChange={handleChange}
                className="mt-1 p-4 border border-blue-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter address"
                required
              />
            </div>

            {/* Mobile Number */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="mobileno">Mobile Number</label>
              <input
                type="text"
                name="mobileno"
                value={inputs.mobileno}
                onChange={handleChange}
                className="mt-1 p-4 border border-blue-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter mobile number"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                className="mt-1 p-4 border border-blue-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105"
            >
              Add Student
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
