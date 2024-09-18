import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Staffnavi from './Staffnavi'; // Import the navigation bar

export default function Viewstaff() {
  return (
    <div style={styles.pageContainer}>
      <Staffnavi /> {/* Add navigation bar */}
      <div style={styles.contentContainer}>
        <h1 style={styles.heading}>Staff Management</h1>
        <p style={styles.description}>
          Managing staff efficiently is key to ensuring smooth operations in any organization. 
          Our staff management system helps streamline staff details, allowing you to manage staff members 
          with ease, including viewing their profiles, updating information, and removing inactive staff.
        </p>
        <p style={styles.description}>
          Use the navigation on the left to access various staff-related functions and manage staff details effectively.
        </p>
        {/* Removed View Staff Details button */}
      </div>
    </div>
  );
}

// Inline CSS for layout and styling
const styles = {
  pageContainer: {
    display: 'flex', // Use flex to arrange the nav and content side by side
    minHeight: '100vh', // Full viewport height
  },
  contentContainer: {
    padding: '30px',
    backgroundColor: '#ffffff', // Light background color for contrast
    borderRadius: '10px',
    maxWidth: '800px',
    margin: '40px auto', // Center the content
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    textAlign: 'center',
    flexGrow: 1, // Take up remaining space next to the navigation bar
  },
  heading: {
    fontSize: '36px',
    color: '#343a40', // Dark grey for the heading
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '18px',
    color: '#6c757d', // Light grey for the description
    lineHeight: '1.6',
    marginBottom: '30px',
  },
};
