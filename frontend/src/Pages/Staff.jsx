import React from 'react';
import Headernav from '../Components/Headernav';  // Adjust the path as needed
import Footer from '../Components/Footer';        // Adjust the path as needed

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

export default function Staff() {
  return (
    <div className="flex flex-col min-h-screen">
      <Headernav />

      <main className="flex-grow p-6 bg-gray-100">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Staff
        </h1>

        {/* Staff Content */}
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-semibold mb-4">Staff Information</h2>
          <p className="text-gray-700 mb-6">
            This page provides information about our team members, their roles, and their contributions to the company. We value our team and their efforts in making our organization successful.
          </p>

          {/* Staff Details */}
          {staffMembers.map((member, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-700 font-semibold">{member.role}</p>
              <p className="text-gray-700 mt-2">{member.contributions}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}