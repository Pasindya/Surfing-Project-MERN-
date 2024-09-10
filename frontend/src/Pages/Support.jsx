import React from 'react';
import Headernav from '../Components/Headernav';  // Assuming these paths are correct
import Footer from '../Components/Footer';

export default function Support() {
  return (
    <div className="bg-white">
      <Headernav />
      
      <div className="max-w-7xl mx-auto py-20 px-5">
        <h1 className="text-4xl font-bold text-center mb-10">Support</h1>
        <p className="text-lg text-gray-700 text-center">
          Need assistance? We're here to help! Reach out to us with any questions or concerns, and our team will get back to you as soon as possible.
        </p>
      </div>
      
      <Footer />
    </div>
  );
}
