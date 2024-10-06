import React from 'react';
import { Link } from 'react-router-dom';
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';  // Import Footer

export default function Advanced() {
  return (
    <div>
      {/* Header Component */}
      <Headernav />

      {/* Main Content */}
      <div className="p-4 bg-white shadow-md rounded-lg max-w-2xl mx-auto my-8">
        <h2 className="text-3xl font-bold text-center mb-6">Advanced Surfing Package</h2>

        <div className="text-gray-700 mb-6">
          <p className="mb-4">
            The Advanced Surfing Package is tailored for surfers who are ready to push their limits and tackle more demanding surf conditions. This package is ideal for experienced surfers looking to refine their skills, master complex maneuvers, and confidently surf larger waves.
          </p>

          <p className="mb-4">
            Our expert instructors will work closely with you to perfect your technique, focusing on critical areas such as speed generation, wave selection, and advanced tricks like cutbacks, bottom turns, and aerials. The lessons are conducted in some of the most renowned surf spots, offering the challenge and thrill that advanced surfers crave.
          </p>

          <p className="mb-4">
            You will also receive personalized feedback and video analysis, allowing you to see your progress and areas for improvement. The goal is to take your surfing to the next level, enabling you to handle any surf break with confidence and style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <img src="./images/adv1.jpg" alt="Big Wave Surfing" className="w-full h-48 object-cover rounded-md shadow" />
          <img src="./images/advan.jpg" alt="Advanced Maneuvers" className="w-full h-48 object-cover rounded-md shadow" />
          <img src="./images/les1.jpg" alt="Surf Instructor Coaching" className="w-full h-48 object-cover rounded-md shadow" />
          <img src="./images/about.jpg" alt="Video Analysis" className="w-full h-48 object-cover rounded-md shadow" />
        </div>

        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>5 Expert-Level Surf Lessons with a Professional Coach</li>
          <li>Surfboard and Wetsuit Rental</li>
          <li>Access to Premier Surf Spots for Advanced Surfers</li>
          <li>Advanced Maneuver Training (Cutbacks, Bottom Turns, Aerials)</li>
          <li>Speed Generation and Wave Selection Techniques</li>
          <li>Personalized Video Analysis and Feedback</li>
        </ul>

        <div className="text-center mt-6">
          <Link to="/bookpackage">
            <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition">
              Book Now
            </button>
          </Link>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}