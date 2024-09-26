import React from 'react';
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
      <Footer />
    </div>
  );
}
