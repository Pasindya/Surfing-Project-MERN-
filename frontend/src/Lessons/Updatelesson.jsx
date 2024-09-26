// update lesson

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Lessonnav from './Lessonnav'; // Assuming Lessonnav is in the same directory

export default function Updatelesson() {
    const [inputs, setInputs] = useState({});
    const [loading, setLoading] = useState(true); // Add loading state if needed
    const navigate = useNavigate();
    const { id } = useParams();
    const today = new Date().toISOString().split('T')[0]; // Define today variable

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:5009/lessons/${id}`);
                setInputs(response.data.lesson);
            } catch (err) {
                console.error("Error fetching lesson details: ", err);
            } finally {
                setLoading(false); // Update loading state regardless of success or failure
            }
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        await axios.put(`http://localhost:5009/lessons/${id}`, {
            title: String(inputs.title),
            date: inputs.date,
            time: String(inputs.time),
            location: String(inputs.location),
            description: String(inputs.description),
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Regular expression to allow only alphanumeric characters, spaces, and basic punctuation
        const regex = /^[a-zA-Z0-9\s.,!?'-]*$/;

        // Validate input based on the name of the input field
        if (name === 'location' || name === 'description') {
            if (regex.test(value) || value === '') {
                setInputs((prevState) => ({
                    ...prevState,
                    [name]: value,
                }));
            }
        } else {
            setInputs((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendRequest();
        navigate("/lessondetails");
    };

    return (
        <div className="flex">
            <Lessonnav /> {/* Include the navigation bar */}
            <div className="flex-grow flex flex-col items-center justify-center p-8">
                <h1 className="text-2xl font-bold mb-4">Update Lesson</h1>

                {/* Show loading spinner if data is still being fetched */}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {/* Current Lesson Details */}
                        <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded w-full max-w-md">
                            <h2 className="text-lg font-semibold">Current Lesson Details</h2>
                            <p><strong>Title:</strong> {inputs.title}</p>
                            <p><strong>Date:</strong> {inputs.date}</p>
                            <p><strong>Time:</strong> {inputs.time}</p>
                            <p><strong>Location:</strong> {inputs.location}</p>
                            <p><strong>Description:</strong> {inputs.description}</p>
                        </div>

                        <div className="mt-12 bg-white shadow-lg rounded-lg p-8 border-l-4 border-blue-500 w-full max-w-md">
                            <form onSubmit={handleSubmit}>
                                {/* Lesson Title Dropdown */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium" htmlFor="title">Title</label>
                                    <select
                                        name="title"
                                        value={inputs.title || ''}
                                        onChange={handleChange}
                                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                                        required
                                    >
                                        <option value="" disabled>Select lesson title</option>
                                        <option value="Surf Basics">Surf Basics</option>
                                        <option value="Intermediate Techniques">Intermediate Techniques</option>
                                        <option value="Advanced Surfing">Advanced Surfing</option>
                                        <option value="Surf Safety">Surf Safety</option>
                                        <option value="Wave Riding Techniques">Wave Riding Techniques</option>
                                    </select>
                                </div>

                                {/* Date */}
                                <div className="mb-5">
                                    <label className="block text-gray-700 font-medium" htmlFor="date">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={inputs.date}
                                        onChange={handleChange}
                                        min={today}
                                        className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                        required
                                    />
                                </div>

                                {/* Time */}
                                <div className="mb-5">
                                    <label className="block text-gray-700 font-medium" htmlFor="time">Time</label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={inputs.time}
                                        onChange={handleChange}
                                        className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                        required
                                    />
                                </div>

                                {/* Location */}
                                <div className="mb-5">
                                    <label className="block text-gray-700 font-medium" htmlFor="location">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={inputs.location}
                                        onChange={handleChange}
                                        className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                        placeholder="Enter lesson location"
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div className="mb-5">
                                    <label className="block text-gray-700 font-medium" htmlFor="description">Description</label>
                                    <textarea
                                        name="description"
                                        value={inputs.description}
                                        onChange={handleChange}
                                        className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                        placeholder="Enter lesson description"
                                        rows="5"
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105"
                                >
                                    Update Lesson
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
