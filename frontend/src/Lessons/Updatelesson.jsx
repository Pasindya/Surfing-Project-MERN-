import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Lessonnav from './Lessonnav'; // Correct import for Lessonnav component

export default function Updatelesson() {
    const [inputs, setInputs] = useState({});
    const [showSuccess, setShowSuccess] = useState(false); // State to handle success animation
    const [loading, setLoading] = useState(true); // State to handle loading state
    const navigate = useNavigate();
    const { id } = useParams();
    
    const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:5009/lessons/${id}`);
                setInputs(response.data);
                setLoading(false); // Data has been fetched, update loading state
            } catch (err) {
                console.error("Error fetching lesson details: ", err);
                setLoading(false); // Set loading to false in case of error
            }
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        try {
            await axios.put(`http://localhost:5009/lessons/${id}`, {
                title: String(inputs.title),
                date: String(inputs.date),
                time: String(inputs.time),
                location: String(inputs.location),
                description: String(inputs.description),
            });
            setShowSuccess(true); // Show success animation
            setTimeout(() => navigate(`/viewlesson`), 2000); // Redirect to view lesson page after 2 seconds
        } catch (err) {
            console.error("Error updating lesson: ", err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendRequest();
    };

    return (
        <div className="flex">
            <Lessonnav /> {/* Include Navigation Bar */}

            <div className="flex-1 min-h-screen bg-gray-100 p-8 lg:ml-64 flex flex-col lg:flex-row">
                {/* Form Section */}
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md mx-auto lg:mr-8 flex-1">
                    <h1 className="text-3xl font-bold mb-6 text-center">Update Lesson</h1>

                    <form onSubmit={handleSubmit}>
                        {/* Lesson Title */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium" htmlFor="title">Title</label>
                            <input
                                type="text"
                                value={inputs.title || ''}
                                name="title"
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                                placeholder="Enter lesson title"
                                required
                            />
                        </div>

                        {/* Date */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium" htmlFor="date">Date</label>
                            <input
                                type="date"
                                value={inputs.date || ''}
                                name="date"
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                                min={currentDate} // Restrict to upcoming dates only
                                required
                            />
                        </div>

                        {/* Time */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium" htmlFor="time">Time</label>
                            <input
                                type="time"
                                name="time"
                                value={inputs.time || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                                required
                            />
                        </div>

                        {/* Location */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium" htmlFor="location">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={inputs.location || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                                placeholder="Enter location"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium" htmlFor="description">Description</label>
                            <textarea
                                name="description"
                                value={inputs.description || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                                placeholder="Enter lesson description"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                        >
                            Update Lesson
                        </button>
                    </form>

                    {/* Success Animation */}
                    {showSuccess && (
                        <div className="mt-4 p-4 text-green-700 bg-green-100 rounded-md text-center">
                            <p>Lesson Updated Successfully!</p>
                        </div>
                    )}
                </div>

                {/* Display Previous Details */}
                {!loading && (
                    <div className="bg-white p-8 rounded shadow-md w-full max-w-md mx-auto mt-8 lg:mt-0 flex-1">
                        <h2 className="text-2xl font-bold mb-4 text-center">Current Lesson Details</h2>
                        <div>
                            <p><strong>Title:</strong> {inputs.title || 'N/A'}</p>
                            <p><strong>Date:</strong> {inputs.date || 'N/A'}</p>
                            <p><strong>Time:</strong> {inputs.time || 'N/A'}</p>
                            <p><strong>Location:</strong> {inputs.location || 'N/A'}</p>
                            <p><strong>Description:</strong> {inputs.description || 'N/A'}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
