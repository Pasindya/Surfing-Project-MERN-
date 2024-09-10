import React from 'react';
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';

export default function Events() {
  return (
    <div>
      <Headernav />
      <div className="p-4 bg-white shadow-md rounded-lg max-w-2xl mx-auto my-8">
        <h2 className="text-3xl font-bold text-center mb-6">Events</h2>
        {/* Events content goes here */}
      </div>
      <Footer />
    </div>
  );
}