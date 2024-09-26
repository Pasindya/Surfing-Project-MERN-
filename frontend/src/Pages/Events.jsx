import React from 'react';
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';

export default function Events() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <Headernav />
      <div className="p-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Event Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Board Surfing  */}
          <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <img
              src="/images/event1.jpg" // Replace with actual image URL
              alt="Surfboard"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h3 className="text-xl font-semibold mt-4">Board Surfing</h3>
            <p className="text-gray-600 mt-2">
            Board surfing is a water sport where a rider, called a surfer, stands or lies on a surfboard
             and rides ocean waves towards the shore. Using balance and skill, surfers navigate the wave, performing 
             turns and maneuvers. It's a popular and iconic activity in coastal regions, celebrated for its connection 
             to nature and the thrill of riding waves.
            </p>
            <div className="mt-4">
              <Link to="/boardsurf">
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => console.log('Board Surfing Equipment Selected')}
              >
                Explore Board Surfing
              </button>
              </Link>
            </div>
          </div>
          {/* Boat Surfing  */}
          <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <img
              src="/images/event2.jpg" // Replace with actual image URL
              alt="Boat"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h3 className="text-xl font-semibold mt-4">Boat Surfing</h3>
            <p className="text-gray-600 mt-2">
            Boat surfing, also known as wakesurfing, is a water sport where a rider surfs the wake created 
            by a moving boat. The surfer uses a smaller board and typically starts by holding onto a rope to get 
            into the wave, then lets go to ride the wave generated by the boat's wake. It combines elements of surfing and 
            wakeboarding, offering a thrilling experience on calm waters.
            </p>
            <div className="mt-4">
            <Link to="/boatsurf">
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => console.log('Boat Surfing Equipment Selected')}
              >
                Explore Boat Surfing
              </button>
              </Link>
            </div>
          </div>
          {/* Wind Surfing  */}
          <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <img
              src="/images/event3.jpg" // Replace with actual image URL
              alt="Windsurf "
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h3 className="text-xl font-semibold mt-4">Wind Surfing</h3>
            <p className="text-gray-600 mt-2">
            Windsurfing is a water sport that combines surfing and sailing.
            It involves standing on a board with an attached sail, using wind power to glide across the water.
             The sport requires balance, agility, and control of both the board and sail.
            </p>
            <div className="mt-4">
            <Link to="/windsurf">
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => console.log('Wind Surfing Equipment Selected')}
              >
                Explore Wind Surfing
              </button>
              </Link>
            </div>
          </div>
          {/* Special Events  */}
          <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <img
              src="/images/event4.jpg" // Replace with actual image URL
              alt="Special Events"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h3 className="text-xl font-semibold mt-4">Special Events</h3>
            <p className="text-gray-600 mt-2">
            There are award ceremonies , level up ceremonies ,
              Batch parties  , beach parties in the surfing school
              They are organize to build the partnerships ,leadership, Unity among the students 
            </p>
            <div className="mt-4">
            <Link to="/specialsurf">
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => console.log('Special Events Equipment Selected')}
              >
                Explore Special Events
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
