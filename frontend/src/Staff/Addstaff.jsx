import React, { useState } from 'react';
import axios from 'axios';
import Staffnavi from './Staffnavi'; // Ensure this path is correct

const URL = "http://localhost:5009/staff";

export default function Addstaff() {
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    age: "",
    address: "",
    experience: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For the "name" field, restrict input to letters and spaces
    if (name === 'name') {
      const regex = /^[A-Za-z\s]*$/;
      if (!regex.test(value)) {
        return; // Do not update if invalid character is typed
      }
    }
    
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(URL, {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        age: Number(inputs.age),
        address: String(inputs.address),
        experience: Number(inputs.experience),
        password: String(inputs.password),
      });
      alert("Staff member added successfully!");
      // Redirect or clear form as needed
    } catch (error) {
      setError("Failed to add staff member.");
      console.error('Error submitting staff data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Staffnavi /> {/* Include the Staffnavi component */}
      <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Add Staff Member</h1>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={inputs.name}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              placeholder="Enter staff name"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium" htmlFor="gmail">Gmail</label>
            <input
              type="email"
              id="gmail"
              name="gmail"
              onChange={handleChange}
              value={inputs.gmail}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              placeholder="Enter staff Gmail"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium" htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              onChange={handleChange}
              value={inputs.age}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              placeholder="Enter staff age"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={handleChange}
              value={inputs.address}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              placeholder="Enter staff address"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium" htmlFor="experience">Experience</label>
            <input
              type="text"
              id="experience"
              name="experience"
              onChange={handleChange}
              value={inputs.experience}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              placeholder="Enter staff experience"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={inputs.password}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              placeholder="Enter staff password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}
