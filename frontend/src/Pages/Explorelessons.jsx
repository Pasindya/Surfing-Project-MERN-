import React from 'react';
import Slider from 'react-slick';
import Headernav from '../Components/Headernav'; // Adjust the path as necessary
import Footer from '../Components/Footer'; // Adjust the path as necessary

// Placeholder images for each lesson type
const surfImage = 'public/images/surf.jpeg';
const yogaImage = 'public/images/yoga.jpg';
const safetyImage = 'public/images/safety.jpg';

// Reusable card component for lessons
const LessonCard = ({ image, title, description, details }) => {
  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl transform transition-transform duration-300 hover:scale-105 hover:shadow-3xl">
      <img src={image} alt={title} className="w-full h-72 object-cover rounded-t-lg" />
      <div className="p-6">
        <h3 className="text-3xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <p className="text-gray-700 mb-4">{details}</p> {/* More details about the lesson */}
      </div>
    </div>
  );
};

export default function ExploreLessons() {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
  };

  // Inline styles
  const sliderContainerStyle = {
    height: '500px', // Increased height
    overflow: 'hidden', // Hide overflow if needed
    padding: '0 10px', // Padding for better spacing
  };

  const slickSlideStyle = {
    display: 'flex', // Center the card in the slide
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  };

  return (
    <div>
      <Headernav />
      <div className="min-h-screen bg-gradient-to-b from-teal-400 to-blue-400 py-16">
        <h1 className="text-center text-5xl font-extrabold text-white mb-12">Explore Lessons</h1>

        <div className="max-w-6xl mx-auto">
          <div style={sliderContainerStyle}>
            <Slider {...settings}>
              {/* Surf Lessons Card */}
              <div style={slickSlideStyle}>
                <LessonCard
                  image={surfImage}
                  title="Surf Lessons"
                  description="Catch the waves with expert guidance."
                  details="Our surf lessons help you improve your skills, whether you're a beginner or advanced rider. You will learn techniques for balance, paddling, and wave riding in a fun and safe environment."
                />
              </div>

              {/* Yoga Lessons Card */}
              <div style={slickSlideStyle}>
                <LessonCard
                  image={yogaImage}
                  title="Yoga Lessons"
                  description="Join our beachside yoga sessions to find balance and peace."
                  details="Perfect for all levels, you’ll stretch and strengthen your body in a serene environment. Our experienced instructors will guide you through various poses and breathing techniques to enhance your well-being."
                />
              </div>

              {/* Safety Lessons Card */}
              <div style={slickSlideStyle}>
                <LessonCard
                  image={safetyImage}
                  title="Safety Lessons"
                  description="Stay safe in the water with our essential safety lessons."
                  details="Learn about rip currents, first aid, and how to stay protected while enjoying the ocean. Our instructors will provide crucial knowledge to help you and your loved ones stay safe during your water activities."
                />
              </div>
            </Slider>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
