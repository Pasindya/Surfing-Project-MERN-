//Staffnavi
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import { FaHome, FaPlusCircle, FaListAlt, FaSignOutAlt } from 'react-icons/fa'; // Import icons

export default function Staffnavi() {
  return (
    <nav style={styles.navContainer}>
      <h3 style={styles.navHeader}>Staff Dashboard</h3>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/adminhome" style={styles.navLink}>
            <FaHome style={styles.icon} /> Home
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/staffdetails" style={styles.navLink}>
            <FaListAlt style={styles.icon} /> Staff Details
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/addstaff" style={styles.navLink}> {/* Link to Addstaff page */}
            <FaPlusCircle style={styles.icon} /> Add Staff
          </Link>
        </li>
        <li style={styles.navItem}>
          <button onClick={() => alert("Logging out...")} style={styles.logoutButton}>
            <FaSignOutAlt style={styles.icon} /> Log Out
          </button>
        </li>
      </ul>
    </nav>
  );
}

// Inline CSS styles for the navigation component
const styles = {
  navContainer: {
    backgroundColor: '#343a40',
    color: '#fff',
    padding: '20px',
    height: '100vh',
    width: '250px',
    position: 'fixed',
    top: 0,
    left: 0,
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
  },
  navHeader: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#f8f9fa',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  navItem: {
    margin: '20px 0',
  },
  navLink: {
    textDecoration: 'none',
    color: '#f8f9fa',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  logoutButton: {
    background: 'none',
    border: 'none',
    color: '#f8f9fa',
    cursor: 'pointer',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  icon: {
    marginRight: '10px',
  },
};
