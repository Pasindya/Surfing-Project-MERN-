import React from 'react';
import { Link } from 'react-router-dom';
import Headernav from '../Components/Headernav';  // Adjust the path as needed
import Footer from '../Components/Footer';        // Adjust the path as needed

export default function Intermediate() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Headernav />

      <main className="flex-grow p-4 bg-white shadow-md rounded-lg max-w-2xl mx-auto my-8">
        <h2 className="text-3xl font-bold text-center mb-6">Intermediate Surfing Package</h2>

        <div className="text-gray-700 mb-6">
          <p className="mb-4">
            Our Intermediate Surfing Package is perfect for those who have mastered the basics and are ready to take their surfing skills to the next level. This package is designed to help you refine your technique, increase your confidence in more challenging waves, and deepen your understanding of wave dynamics and ocean conditions.
          </p>

          <p className="mb-4">
            Under the guidance of experienced instructors, you'll work on advanced maneuvers, such as turning, carving, and catching bigger waves. Each lesson is tailored to your skill level, ensuring that you are continuously challenged and supported as you progress.
          </p>

          <p className="mb-4">
            The intermediate course also includes training on reading waves, positioning yourself in the lineup, and improving your paddling efficiency. By the end of the course, you'll be more confident in handling a variety of surf conditions and ready to push your limits in the water.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <img src="./images/pack4.jpg" alt="Advanced Surfing" className="w-full h-48 object-cover rounded-md shadow" />
          <img src="./images/package1.jpg" alt="Surf Coaching" className="w-full h-48 object-cover rounded-md shadow" />
          <img src="./images/pck5.jpg" alt="Wave Dynamics" className="w-full h-48 object-cover rounded-md shadow" />
          <img src="/images/les5.jpg" alt="Intermediate Group" className="w-full h-48 object-cover rounded-md shadow" />
        </div>

        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>5 Advanced Surf Lessons with a Certified Instructor</li>
          <li>Surfboard and Wetsuit Rental</li>
          <li>Access to More Challenging Surf Spots</li>
          <li>Advanced Maneuvers Training (Turning, Carving, etc.)</li>
          <li>Wave Reading and Positioning Techniques</li>
          <li>Smaller Group Size for Personalized Coaching (Up to 4 Students)</li>
        </ul>

        <div className="text-center mt-6">
          <Link to="/bookpackage">
            <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition">
              Book Now
            </button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}