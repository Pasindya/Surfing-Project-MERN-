import React, { useState } from 'react';
import emailjs from '@emailjs/browser'; // Importing emailjs
import Headernav from '../Components/Headernav'; // Importing the header
import Footer from '../Components/Footer'; // Importing the footer

export default function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Initialize EmailJS (you can also do this globally in index.js or App.js)
  emailjs.init('zL4bk_4bCRr_ysSIV'); // Replace with your public user ID

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Set up the data to send via EmailJS
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };

    // Send email using emailjs
    emailjs.send(
      'service_406pbee', // Replace with your service ID
      'template_gqpwdey', // Replace with your template ID
      templateParams,
      'zL4bk_4bCRr_ysSIV' // Replace with your public user ID
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert('Your message was sent successfully!');
    }, (err) => {
      console.error('FAILED...', err);
      alert(`Failed to send message. Error: ${err.text}`);
    });

    // Clear form fields after submission
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Navigation */}
      <Headernav />

      {/* Main content with form */}
      <div className="flex flex-1 h-screen">
        {/* Left section with image */}
        <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: "url('public/images/contact.png')" }}>
          {/* You can add content or leave it empty */}
        </div>

        {/* Right section with form */}
        <div className="flex-1 flex flex-col justify-center px-12 py-8 bg-gray-100">
          <div className="max-w-sm mx-auto">
            <h3 className="text-xl mb-4 text-center font-bold">Contact Us</h3>
            <p className="mb-4 text-center">We'd love to hear from you! Please fill out the form below.</p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
                required
              />
              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
                rows="5"
                required
              />

              <button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-gray-900"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
