import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function Updatestaff() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:5009/staff/${id}`);
                setInputs(response.data.staff);
            } catch (error) {
                console.error("Error fetching staff data:", error);
            }
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        try {
            await axios.put(`http://localhost:5009/staff/${id}`, {
                name: String(inputs.name),
                gmail: String(inputs.gmail),
                age: Number(inputs.age),
                address: String(inputs.address),
                experience: Number(inputs.experience),
                password: String(inputs.password),
            });
        } catch (error) {
            console.error("Error updating staff data:", error);
        }
    };

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendRequest();
        navigate("/staffdetails");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Update Staff Member</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700">Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={inputs.name || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            placeholder="Enter staff name"
                        />
                    </div>
                    <div>
                        <label htmlFor="gmail" className="block text-gray-700">Gmail:</label>
                        <input
                            type="email"
                            name="gmail"
                            id="gmail"
                            value={inputs.gmail || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            placeholder="Enter staff email"
                        />
                    </div>
                    <div>
                        <label htmlFor="age" className="block text-gray-700">Age:</label>
                        <input
                            type="number"
                            name="age"
                            id="age"
                            value={inputs.age || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            placeholder="Enter staff age"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-gray-700">Address:</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={inputs.address || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            placeholder="Enter staff address"
                        />
                    </div>
                    <div>
                        <label htmlFor="experience" className="block text-gray-700">Experience:</label>
                        <input
                            type="number"
                            name="experience"
                            id="experience"
                            value={inputs.experience || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            placeholder="Enter staff experience"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={inputs.password || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            placeholder="Enter new password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}
