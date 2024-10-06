import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Paymentlog() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'ayanima' && password === 'ayani') {
      alert('Login successful!');
      setError('');
      navigate('/admin/payments/report'); // Redirect to the payment page
    } else {
      setError('Invalid credentials');
    }
  };

  const handlePrevious = () => {
    // Navigate to the previous page
    navigate(-1);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left side for image */}
      <div style={{ flex: 1, backgroundImage: 'url(./images/finan.jpg)', backgroundSize: 'cover' }}></div>

      {/* Right side for login form with black transparent background */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Black transparent background
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: '300px',
            padding: '20px',
            backgroundColor: 'white', // White background for the form
            borderRadius: '10px',
            textAlign: 'center',
            color: 'black', // Black text color
          }}
        >
          <h2>Finance Manager Login</h2>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Login
          </button>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

          {/* "Previous" button */}
          <button
            type="button"
            onClick={handlePrevious}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#555',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              marginTop: '15px',
            }}
          >
            Previous
          </button>
        </form>
      </div>
    </div>
  );
}
