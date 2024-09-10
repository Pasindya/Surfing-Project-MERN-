import React from 'react';
import Headernav from '../Components/Headernav';  // Adjust the path as needed
import Footer from '../Components/Footer';        // Adjust the path as needed

export default function Supplier() {
  return (
    <div className="flex flex-col min-h-screen">
      <Headernav />

      <main className="flex-grow p-6 bg-gray-100">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Supplier
        </h1>

        {/* Supplier Content */}
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-semibold mb-4">Supplier Information</h2>
          <p className="text-gray-700 mb-6">
            Here you can find information about our suppliers, including details on their products, services, and contact information. 
            We work with trusted partners to ensure the highest quality for our customers.
          </p>

          {/* Supplier Details */}
          <div className="mb-4">
            <h3 className="text-2xl font-semibold mb-2">Supplier Name</h3>
            <p className="text-gray-700">Supplier details and description go here.</p>
          </div>

          <div className="mb-4">
            <h3 className="text-2xl font-semibold mb-2">Contact Information</h3>
            <p className="text-gray-700">Phone: 123-456-7890</p>
            <p className="text-gray-700">Email: supplier@example.com</p>
            <p className="text-gray-700">Address: 123 Supplier St, City, Country</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}