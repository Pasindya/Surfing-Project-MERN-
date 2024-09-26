import React from 'react';

export default function Staffdescription() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Staff Management</h1>
      <p style={styles.description}>
        Managing staff effectively is crucial for the success of any organization. 
        Our staff management system helps you to organize, track, and oversee your team with ease. 
        From adding new members to tracking their performance and keeping records updated, this system 
        offers a seamless experience to help your business run smoothly.
      </p>
      <p style={styles.description}>
        Whether you're overseeing a small team or a large workforce, the right tools 
        can ensure that your staff is managed efficiently, contributing to the overall productivity of your company.
      </p>
    </div>
  );
}

// Inline CSS styles for an attractive layout
const styles = {
  container: {
    backgroundColor: '#f8f9fa', // Light background color
    padding: '20px',
    borderRadius: '10px', // Rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    maxWidth: '800px',
    margin: '40px auto', // Center horizontally with auto margin
    textAlign: 'center', // Center the text
  },
  title: {
    fontSize: '32px',
    color: '#343a40', // Dark grey color
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '18px',
    color: '#6c757d', // Light grey for text
    lineHeight: '1.6',
    marginBottom: '15px',
  },
};
