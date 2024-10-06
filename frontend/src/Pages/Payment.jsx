import React from 'react';
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';
import { Link, useNavigate } from 'react-router-dom';

export default function PaymentDashboard() {
  const navigate = useNavigate();

  // Function to handle button clicks
  const handlePaymentClick = (type) => {
    navigate(`/payment?type=${type}`);
  };

  return (
    <div className="min-h-screen" style={{ 
      backgroundImage: 'url(/images/beach1.jpg)', // High-quality beach background
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
      <div className="bg-gradient-to-t from-blue-900/60 via-blue-800/30 to-transparent min-h-screen"> {/* Subtle gradient overlay */}
        <Headernav />

        {/* Payment Dashboard Title */}
        <h2 className="text-5xl md:text-6xl font-extrabold text-center my-10 text-black drop-shadow-lg">
          Payment Dashboard
        </h2>

        {/* Main Content Wrapper */}
        <div className="bg-white/40 shadow-2xl rounded-xl max-w-7xl mx-auto p-10 md:p-16 mb-16 backdrop-blur-lg border border-white border-opacity-30">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

            {/* Equipment Payment */}
            <div className="text-center p-8 bg-white/70 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-500">
              <p className="text-2xl font-semibold text-blue-700 mb-4">Equipment Payment</p>
              <p className="text-sm text-gray-800 mb-6">Easily pay for your surfing equipment, from boards to wetsuits, 
                and get geared up for your next adventure.</p>
              <img
                src="/images/equ1.jpg"
                alt="Equipment Payment"
                className="rounded-lg w-56 h-56 object-cover mx-auto mb-6 shadow-lg"
              />
              <Link to="/paymentpage">
              <button
                className="w-full py-3 text-white font-semibold bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full shadow-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 ease-out transform hover:scale-105"
                onClick={() => handlePaymentClick('equipment')}
              >
                Go to Payment
              </button>
              </Link>
            </div>

            {/* Event Payment */}
            <div className="text-center p-8 bg-white/70 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-500">
              <p className="text-2xl font-semibold text-pink-600 mb-4">Event Payment</p>
              <p className="text-sm text-gray-800 mb-6">Make payments for upcoming surfing events and competitions. 
                Don’t miss your chance to participate in the best experiences.</p>
              <img
                src="/images/event1.jpg"
                alt="Event Payment"
                className="rounded-lg w-56 h-56 object-cover mx-auto mb-6 shadow-lg"
              />
               <Link to="/paymentpage">
              <button
                className="w-full py-3 text-white font-semibold bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full shadow-lg hover:from-teal-600 
                hover:to-cyan-700 transition-all duration-300 ease-out transform hover:scale-105"
                onClick={() => handlePaymentClick('event')}
              >
                Go to Payments
              </button>
              </Link>
            </div>

             {/* Package Payment */}
             <div className="text-center p-8 bg-white/70 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-500">
              <p className="text-2xl font-semibold text-cyan-700 mb-4">Package Payment</p>
              <p className="text-sm text-gray-800 mb-6">Quickly settle payments for your surfing packages, you're booking 
              beginner lessons, advanced training.</p>
              <img
                src="/images/pack4.jpg"
                alt="Equipment Payment"
                className="rounded-lg w-56 h-56 object-cover mx-auto mb-6 shadow-lg"
              />
              <Link to="/paymentpage">
              <button
                className="w-full py-3 text-white font-semibold bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full shadow-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 ease-out transform hover:scale-105"
                onClick={() => handlePaymentClick('equipment')}
              >
                Go to Payment
              </button>
              </Link>
            </div>

            {/* Other Payment */}
            <div className="text-center p-8 bg-white/50 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-500">
              <p className="text-2xl font-semibold text-green-800 mb-4">Other Payment</p>
              <p className="text-sm text-gray-800 mb-6">Handle all miscellaneous payments related to your surfing experience, 
                from special bookings to equipment rentals.</p>
              <img
                src="/images/other1.webp"
                alt="Other Payment"
                className="rounded-lg w-56 h-56 object-cover mx-auto mb-6 shadow-lg"
              />
              <Link to="/paymentpage">
              <button
                className="w-full py-3 text-white font-semibold bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full shadow-lg hover:from-teal-600 
                hover:to-cyan-700 transition-all duration-300 ease-out transform hover:scale-105"
                onClick={() => handlePaymentClick('other')}
              >
                Go to Payment
              </button>
              </Link>
            </div>

          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
