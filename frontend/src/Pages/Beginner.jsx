import React from 'react';
import { Link } from 'react-router-dom';
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';  // Import Footer

export default function Beginner() {
  return (
    <div>
      {/* Header Component */}
      <Headernav />

      {/* Main Content */}
      <div className="p-4 bg-white shadow-md rounded-lg max-w-2xl mx-auto my-8">
        <h2 className="text-3xl font-bold text-center mb-6">Beginner Surfing Package</h2>
        
        <div className="text-gray-700 mb-6">
          <p className="mb-4">
            Our Beginner Surfing Package is designed for those who are new to surfing and eager to dive into the world of waves. Whether you're stepping on a surfboard for the first time or looking to solidify your foundational skills, this package offers a comprehensive introduction to surfing in a supportive and fun environment.
          </p>
          
          <p className="mb-4">
            You'll be guided by experienced and certified instructors who are passionate about teaching and ensuring you have a safe and enjoyable experience. We take you to the best beginner-friendly surf spots where the waves are gentle and perfect for learning. Throughout the course, you'll gain confidence, improve your technique, and have plenty of fun on the water!
          </p>

          <p className="mb-4">
            Our lessons are tailored to your pace, allowing you to progress comfortably. Each session is packed with practical tips, hands-on guidance, and personalized feedback to help you master the basics of surfing. By the end of the course, you'll be riding waves with confidence and looking forward to your next surf adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <img src="surf-lesson.jpg" alt="Surf Lesson" className="w-full h-48 object-cover rounded-md shadow" />
          <img src="beginner-group.jpg" alt="Beginner Group" className="w-full h-48 object-cover rounded-md shadow" />
          <img src="surfboard-rental.jpg" alt="Surfboard Rental" className="w-full h-48 object-cover rounded-md shadow" />
          <img src="beach-scene.jpg" alt="Beach Scene" className="w-full h-48 object-cover rounded-md shadow" />
        </div>

        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>5 Surf Lessons with a Certified Instructor</li>
          <li>Surfboard and Wetsuit Rental</li>
          <li>Access to Beginner-Friendly Surf Spots</li>
          <li>Personalized Feedback and Tips</li>
          <li>Group Size: Up to 6 Students</li>
          <li>Surfing Safety and Ocean Awareness Training</li>
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