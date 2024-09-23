import React from 'react';
import Headernav from '../Components/Headernav'; // Adjust the path as needed
import Footer from '../Components/Footer';       // Adjust the path as needed

// Sample data for staff members
const staffMembers = [
  {
    name: 'John Doe',
    role: 'Lead Instructor',
    contributions: 'John has been leading our surf classes for over 10 years. His expertise and enthusiasm are unmatched.',
  },
  {
    name: 'Jane Smith',
    role: 'Marketing Manager',
    contributions: 'Jane handles all our marketing and outreach programs. Her innovative strategies have greatly increased our visibility.',
  },
  {
    name: 'Emily Johnson',
    role: 'Customer Support',
    contributions: 'Emily ensures that our customers receive top-notch support and assistance. Her dedication is key to our high customer satisfaction.',
  },
];

export default function Staffpage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Headernav />

      {/* Hero Section */}
      <section 
        className="h-64 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/baywactch.png)',
          backgroundSize: 'cover',        // Ensures image covers the container
          backgroundPosition: 'center 20%',   // Moves the image slightly lower
          backgroundRepeat: 'no-repeat',  // Prevents image repetition
        }}
      >
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">Meet Our Team</h1>
      </section>

      <main className="flex-grow p-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center my-12 text-gray-800">
          Our Dedicated Staff
        </h2>

        {/* Staff Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {staffMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105 hover:shadow-xl">
              <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-500 mb-2">{member.role}</p>
              <p className="text-gray-700 mt-2">{member.contributions}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
