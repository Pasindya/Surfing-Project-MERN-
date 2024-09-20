import React from 'react';
import Headernav from '../Components/Headernav'; // Ensure this path is correct
import Footer from '../Components/Footer';       // Ensure this path is correct

export default function Surfboard() {
  const surfboards = [
    {
      type: 'Shortboard',
      sizeRange: '5’6” - 6’6”',
      description: 'Shortboards are the most common surfboard type, designed for performance surfing. They offer great maneuverability and speed in the waves.',
      price: '$400',
    },
    {
      type: 'Fish',
      sizeRange: '5’2” - 6’4”',
      description: 'Fish surfboards are known for their wide, flat shape and are perfect for smaller, mushy waves. They offer good stability and speed in smaller surf.',
      price: '$350',
    },
    {
      type: 'Funboard',
      sizeRange: '6’6” - 8’0”',
      description: 'Funboards are a great hybrid between shortboards and longboards, offering more stability than shortboards while still being maneuverable.',
      price: '$450',
    },
    {
      type: 'Longboard',
      sizeRange: '8’0” - 10’0”',
      description: 'Longboards are perfect for beginners and experienced surfers alike. Their length provides stability and easier wave catching.',
      price: '$500',
    },
    {
      type: 'Gun',
      sizeRange: '7’0” - 12’0”',
      description: 'Guns are designed for big wave surfing, with a narrow, long shape that allows for speed and control on massive waves.',
      price: '$600',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Include the Headernav component */}
      <Headernav />

      <div className="flex-grow">
        <div className="max-w-6xl mx-auto p-6">
          {/* Page Title */}
          <h1 className="text-4xl font-bold text-center mt-10">Surfboard Sizes, Details & Prices</h1>

          {/* Surfboard List */}
          <div className="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {surfboards.map((board, index) => (
              <div key={index} className="mb-8 p-4 border rounded-lg shadow-lg bg-white flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">{board.type}</h2>
                  <p className="text-slate-600 mt-2">
                    <strong>Size Range:</strong> {board.sizeRange}
                  </p>
                  <p className="text-slate-600 mt-2">
                    <strong>Description:</strong> {board.description}
                  </p>
                  <p className="text-slate-600 mt-2">
                    <strong>Price:</strong> {board.price}
                  </p>
                </div>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Order Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Include the Footer component */}
      <Footer />
    </div>
  );
}
