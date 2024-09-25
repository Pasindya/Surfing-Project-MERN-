import React from 'react';
import Footer from '../Components/Footer';
import Headernav from '../Components/Headernav';


export default function Aboutus() {
  return (
    <div className="bg-white">
    <Headernav/>

      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('public/images/back2.jpg')" }}>
        <img 
          src="public/images/back2.jpg" 
          alt="Surfing at Arugambay" 
          className="absolute inset-0 object-cover w-full h-full" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-60"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-6xl text-white font-bold drop-shadow-lg">About Us</h1>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto py-20 px-5">
        <h2 className="text-5xl font-semibold text-gray-800 mb-12 text-center">Our Journey</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-12 text-center">
          At Arugambay Surf-Deck, our story is one of passion, community, and a deep connection to the ocean. Since our inception, we've been committed to sharing the joy of surfing with everyone who walks through our doors. From humble beginnings to becoming a premier surf school in Arugambay, our journey has been driven by a love for the waves and the people who ride them.
        </p>
        
        {/* Timeline Section */}
        <div className="relative border-l-4 border-blue-500 mb-16">
          <div className="mb-12 ml-10">
            <div className="absolute w-8 h-8 bg-blue-500 rounded-full mt-2 -left-4 border-4 border-white"></div>
            <h3 className="text-3xl font-semibold text-gray-800">Founded in 2010</h3>
            <p className="mt-4 text-lg text-gray-600">We started as a small group of surf enthusiasts teaching locals and tourists on the beautiful beaches of Arugambay.</p>
          </div>
          <div className="mb-12 ml-10">
            <div className="absolute w-8 h-8 bg-blue-500 rounded-full mt-2 -left-4 border-4 border-white"></div>
            <h3 className="text-3xl font-semibold text-gray-800">Expanded Services in 2015</h3>
            <p className="mt-4 text-lg text-gray-600">With growing demand, we expanded our services to include advanced surf coaching, surf camps, and eco-friendly surf tours.</p>
          </div>
          <div className="ml-10">
            <div className="absolute w-8 h-8 bg-blue-500 rounded-full mt-2 -left-4 border-4 border-white"></div>
            <h3 className="text-3xl font-semibold text-gray-800">Recognized Globally in 2020</h3>
            <p className="mt-4 text-lg text-gray-600">Our dedication to excellence earned us global recognition, making us a top destination for surf enthusiasts worldwide.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-5xl font-semibold text-gray-800 mb-12 text-center">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white p-10 rounded-xl shadow-lg transition transform hover:scale-105">
              <p className="text-lg text-gray-700 mb-6">"Surfing at Arugambay Surf-Deck has been a life-changing experience. The instructors are top-notch, and the community is incredibly welcoming. I can't wait to come back!"</p>
              <p className="text-gray-600 font-semibold">- Emily R.</p>
            </div>
            <div className="bg-white p-10 rounded-xl shadow-lg transition transform hover:scale-105">
              <p className="text-lg text-gray-700 mb-6">"The surf camps are well-organized, and the lessons are tailored to individual needs. Highly recommend for anyone looking to improve their surfing skills!"</p>
              <p className="text-gray-600 font-semibold">- Michael T.</p>
            </div>
            <div className="bg-white p-10 rounded-xl shadow-lg transition transform hover:scale-105">
              <p className="text-lg text-gray-700 mb-6">"I've been surfing for years, but the advanced coaching here took my skills to the next level. The team is professional, friendly, and truly passionate about what they do."</p>
              <p className="text-gray-600 font-semibold">- Sarah W.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-500 py-20 text-center text-white">
        <h2 className="text-5xl font-semibold mb-8">Ready to Ride the Waves?</h2>
        <p className="text-lg mb-12">Join our community and start your surfing adventure today!</p>
        <a href="/RegisterStu" className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:-translate-y-1">Get Started</a>
      </div>

      <Footer/>
    </div>
  );
}