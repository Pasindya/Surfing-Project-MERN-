import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Headernav from '../Components/Headernav';
import Footer from '../Components/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Home() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
  };

  return (
    <div className="bg-white text-slate-900">
      <Headernav />

      {/* Hero Section with Auto-Slide Background Images */}
      <section className="relative h-screen">
        <Slider {...sliderSettings}>
          <div>
            <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('public/images/ho3.jpg')" }}>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white px-4 sm:px-8">
                  <h1 className="text-4xl sm:text-6xl font-bold mb-4">Welcome to Surf Deck</h1>
                  <p className="text-lg sm:text-xl mb-8">Your ultimate surfing companion at Arugambay</p>
                  <Link to="/packages" className="inline-block bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded">
                    Explore Packages
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/p2.jpg')" }}>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white px-4 sm:px-8">
                  <h1 className="text-4xl sm:text-6xl font-bold mb-4">Surf with the Best</h1>
                  <p className="text-lg sm:text-xl mb-8">Top-rated surf instructors and world-class waves.</p>
                  <Link to="/packages" className="inline-block bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded">
                    Explore Packages
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('public/images/ho1.jpg')" }}>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white px-4 sm:px-8">
                  <h1 className="text-4xl sm:text-6xl font-bold mb-4">Experience the Thrill</h1>
                  <p className="text-lg sm:text-xl mb-8">Join us for an unforgettable adventure.</p>
                  <Link to="/packages" className="inline-block bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded">
                    Explore Packages
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">About Surf Deck</h2>
        <p className="mt-4 text-slate-700 text-sm sm:text-base max-w-3xl mx-auto">
          At Surf Deck, we offer a range of surf lessons and packages designed for all levels. Our expert instructors will guide you through an unforgettable surfing experience in the beautiful waves of Arugambay.
        </p>
        <Link to="/aboutus" className="mt-8 inline-block bg-slate-900 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded">
          Learn More
        </Link>
      </section>

      {/* Packages Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900">Our Surf Packages</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="/images/package1.jpg" alt="Beginner Package" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-slate-900">Beginner Package</h3>
              <p className="mt-2 text-slate-700 text-sm">Perfect for those new to surfing. Learn the basics with our experienced instructors.</p>
              <Link to="/beginner" className="mt-4 inline-block text-blue-600 hover:underline">Learn More</Link>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="/images/package2.jpg" alt="Intermediate Package" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-slate-900">Intermediate Package</h3>
              <p className="mt-2 text-slate-700 text-sm">Take your surfing skills to the next level. Our intermediate package is designed for those with some experience.</p>
              <Link to="/intermediate" className="mt-4 inline-block text-blue-600 hover:underline">Learn More</Link>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="/images/package3.jpeg" alt="Advanced Package" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-slate-900">Advanced Package</h3>
              <p className="mt-2 text-slate-700 text-sm">Challenge yourself with our advanced surf lessons. Ideal for seasoned surfers looking to perfect their techniques.</p>
              <Link to="/advanced" className="mt-4 inline-block text-blue-600 hover:underline">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">Ready to Ride the Waves?</h2>
        <p className="mt-4 text-lg sm:text-xl">Join us at Surf Deck for an unforgettable surfing experience.</p>
        <Link to="/contact" className="mt-8 inline-block bg-white text-blue-600 font-semibold py-2 px-4 rounded">
          Contact Us
        </Link>
      </section>

      <Footer />
    </div>
  );
}