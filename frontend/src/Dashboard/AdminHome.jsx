import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { FaBook, FaCalendarAlt, FaUser, FaClipboardList, FaCogs, FaChalkboardTeacher, FaWaveSquare, FaRegChartBar } from 'react-icons/fa';

export default function AdminHome() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Add your logout logic here
    console.log('User logged out');
    // After logout, redirect to the home page
    navigate('/'); // Redirect to the home page
  };

  return (
    <div className="admin-home-container bg-gray-100 min-h-screen p-6">
      <header className="admin-home-header bg-blue-700 text-white p-6 rounded-lg shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Surfing School Admin Dashboard</h1>
          <p className="text-lg mt-2">Manage all aspects of the surfing school from here</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </header>

      <section className="admin-home-overview p-6 bg-white rounded-lg shadow-md mt-8">
        <h2 className="text-3xl font-semibold text-blue-700">Overview</h2>
        <p className="mt-2 text-gray-700">Welcome back! Here are your quick links to manage the surfing school effectively.</p>
        
        <div className="stats mt-6 grid grid-cols-3 gap-6">
          <div className="stat bg-blue-100 p-6 rounded-lg shadow-sm flex items-center">
            <FaUser className="text-blue-600 text-4xl mr-4" />
            <div>
              <h3 className="text-xl font-bold text-blue-700">Total Students</h3>
              <p className="text-3xl font-semibold">150</p>
            </div>
          </div>
          <div className="stat bg-blue-100 p-6 rounded-lg shadow-sm flex items-center">
            <FaBook className="text-blue-600 text-4xl mr-4" />
            <div>
              <h3 className="text-xl font-bold text-blue-700">Total Lessons</h3>
              <p className="text-3xl font-semibold">45</p>
            </div>
          </div>
          <div className="stat bg-blue-100 p-6 rounded-lg shadow-sm flex items-center">
            <FaCalendarAlt className="text-blue-600 text-4xl mr-4" />
            <div>
              <h3 className="text-xl font-bold text-blue-700">Upcoming Events</h3>
              <p className="text-3xl font-semibold">3</p>
            </div>
          </div>
        </div>
      </section>

      <section className="admin-home-actions p-6 bg-white rounded-lg shadow-md mt-8">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">Admin Actions</h2>
        <div className="grid grid-cols-2 gap-6">
          <Link to="/viewlesson" className="btn bg-blue-600 text-white p-6 rounded-lg shadow-md flex items-center hover:bg-blue-700 transition">
            <FaBook className="text-2xl mr-3" />
            Manage Lessons
          </Link>
          <Link to="/viewbooking" className="btn bg-blue-600 text-white p-6 rounded-lg shadow-md flex items-center hover:bg-blue-700 transition">
            <FaClipboardList className="text-2xl mr-3" />
            Manage Bookings
          </Link>
          <Link to="/manage-students" className="btn bg-blue-600 text-white p-6 rounded-lg shadow-md flex items-center hover:bg-blue-700 transition">
            <FaUser className="text-2xl mr-3" />
            Manage Students
          </Link>
          <Link to="/manage-events" className="btn bg-blue-600 text-white p-6 rounded-lg shadow-md flex items-center hover:bg-blue-700 transition">
            <FaCalendarAlt className="text-2xl mr-3" />
            Manage Events
          </Link>
          <Link to="/manage-equipments" className="btn bg-blue-600 text-white p-6 rounded-lg shadow-md flex items-center hover:bg-blue-700 transition">
            <FaWaveSquare className="text-2xl mr-3" />
            Manage Equipments
          </Link>
          <Link to="/viewstaff" className="btn bg-blue-600 text-white p-6 rounded-lg shadow-md flex items-center hover:bg-blue-700 transition">
            <FaChalkboardTeacher className="text-2xl mr-3" />
            Manage Instructors
          </Link>
          <Link to="/view-reports" className="btn bg-blue-600 text-white p-6 rounded-lg shadow-md flex items-center hover:bg-blue-700 transition">
            <FaRegChartBar className="text-2xl mr-3" />
            View Reports
          </Link>
          <Link to="/settings" className="btn bg-blue-600 text-white p-6 rounded-lg shadow-md flex items-center hover:bg-blue-700 transition">
            <FaCogs className="text-2xl mr-3" />
            Settings
          </Link>
        </div>
      </section>
    </div>
  );
}
