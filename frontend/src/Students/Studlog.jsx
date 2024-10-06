import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure to import useNavigate for navigation
import sampleImage from '/images/regist.jpg'; // Replace with your actual image path

export default function Studlog() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const containerStyle = {
    display: 'flex',
    height: '100vh', // Full viewport height
  };

  const imageSideStyle = {
    flex: 1, // Takes half of the width
    position: 'relative',
  };

  const backgroundImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Cover the entire section
  };

  const formSideStyle = {
    flex: 1, // Takes half of the width
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  };

  const formOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Black transparent overlay
  };

  const formStyle = {
    backgroundColor: 'white', // White background for the form
    color: 'black',
    padding: '20px',
    borderRadius: '8px',
    width: '80%', // Adjust as necessary
    maxWidth: '400px', // Max width for the form
    textAlign: 'center',
    position: 'relative', // Ensure it's positioned above the overlay
    zIndex: 1, // Ensure it sits above the overlay
  };

  const formGroupStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff', // Button color
    color: 'white',
    cursor: 'pointer',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3', // Darker button on hover
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Check credentials
    if (username === 'wishmi' && password === 'wish') {
      navigate('/viewstudent'); // Navigate to the student detail page
    } else {
      alert('Invalid username or password'); // Alert for invalid credentials
    }
  };

  const handlePrevious = () => {
    // Use window.history.back() to navigate to the previous page
    window.history.back();
  };

  return (
    <div style={containerStyle}>
      <div style={imageSideStyle}>
        <img src={sampleImage} alt="Background" style={backgroundImageStyle} />
      </div>
      <div style={formSideStyle}>
        <div style={formOverlayStyle} />
        <div style={formStyle}>
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div style={formGroupStyle}>
              <label htmlFor="username" style={labelStyle}>Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="password" style={labelStyle}>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <button
              type="submit"
              style={buttonStyle}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
            >
              Login
            </button>
            <button
              type="button"
              onClick={handlePrevious}
              style={{ ...buttonStyle, marginTop: '10px', backgroundColor: '#6c757d' }} // Grey button for 'Previous'
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5a6268'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
            >
              Previous
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
