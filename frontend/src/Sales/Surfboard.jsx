import React from 'react';
Sales
import { useNavigate } from 'react-router-dom';
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';

export default function Surfboard() {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const surfboards = [
    {
      type: 'Shortboard',
      price: 299.99,
      description: 'A short and agile board, perfect for fast waves.',
      imageUrl: '../../public/images/Shortboard.jpg', // Replace with actual image URL
    },
    {
      type: 'Longboard',
      price: 399.99,
      description: 'A classic longboard for a smooth ride and cruising.',
      imageUrl: '../../public/images/Longboard.jpeg', // Replace with actual image URL
    },
    {
      type: 'Fish',
      price: 349.99,
      description: 'A versatile board that works well in various conditions.',
      imageUrl: '../../public/images/Fish.jpeg', // Replace with actual image URL
    },
    {
      type: 'Funboard',
      price: 329.99,
      description: 'A great option for beginners and those who want to have fun.',
      imageUrl: '../../public/images/Funboard.jpg', // Replace with actual image URL
    },
  ];

  const handleOrderNow = (surfboard) => {
    // Navigate to the Addoder page and pass the selected surfboard as state
    navigate('/addoder', { state: { surfboard } });
  };

  return (
    <div>
      <Headernav />
      <main style={{ padding: '20px', backgroundColor: '#f0f4f8' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2.5rem', color: '#333' }}>
          Surfboard Collection
        </h1>
        <div className="surfboard-list">
          {surfboards.map((surfboard, index) => (
            <div className="surfboard-card" key={index}>
              <img
                src={surfboard.imageUrl}
                alt={`${surfboard.type} image`}
                className="surfboard-image"
              />
              <h3>{surfboard.type}</h3>
              <p className="price">${surfboard.price.toFixed(2)}</p>
              <p>{surfboard.description}</p>
              <button className="btn order-now-btn" onClick={() => handleOrderNow(surfboard)}>
                Order Now
              </button>
            </div>
          ))}
        </div>

        <style>
          {`
            .surfboard-list {
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
              gap: 40px;
            }
            .surfboard-card {
              background: linear-gradient(145deg, #ffffff, #e6e8eb);
              border-radius: 15px;
              box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
              padding: 30px;
              text-align: center;
              width: 250px;
              transition: transform 0.3s, box-shadow 0.3s;
            }
            .surfboard-card:hover {
              transform: translateY(-10px);
              box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.2);
            }
            .surfboard-card h3 {
              font-size: 1.5rem;
              margin-bottom: 10px;
              color: #007bff;
            }
            .surfboard-card img {
              width: 100%;
              height: auto;
              border-radius: 10px;
              margin-bottom: 15px;
            }
            .price {
              font-size: 1.25rem;
              color: #ff6347;
              font-weight: bold;
            }
            .btn {
              padding: 10px 20px;
              border: none;
              border-radius: 25px;
              cursor: pointer;
              margin-top: 15px;
              background-color: #007bff;
              color: white;
              font-size: 1rem;
              transition: background-color 0.3s, transform 0.3s;
            }
            .btn:hover {
              background-color: #0056b3;
              transform: scale(1.05);
            }
          `}
        </style>
      </main>

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
main
      <Footer />
    </div>
  );
}
