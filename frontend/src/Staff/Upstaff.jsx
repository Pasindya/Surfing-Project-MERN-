import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function Upstaff() {
    const [inputs, setInputs] = useState({});
    const [loading, setLoading] = useState(true); // To handle loading state
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:5009/staff/${id}`);
                setInputs(response.data.staff);
            } catch (error) {
                console.error("Error fetching staff data:", error);
            } finally {
                setLoading(false); // Set loading to false after fetch
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
            navigate("/staffdetails"); // Navigate after updating
        } catch (error) {
            console.error("Error updating staff data:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // For the "name" field, restrict input to letters and spaces
        if (name === 'name') {
            const regex = /^[A-Za-z\s]*$/;
            if (!regex.test(value)) {
                return; // Do not update if invalid character is typed
            }
        }

        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendRequest();
    };

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Update Staff Member</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {['name', 'gmail', 'age', 'address', 'experience', 'password'].map((field) => (
                        <div key={field}>
                            <label htmlFor={field} className="block text-gray-700 capitalize">{field}:</label>
                            <input
                                type={field === 'gmail' ? 'email' : field === 'age' || field === 'experience' ? 'number' : 'text'}
                                name={field}
                                id={field}
                                value={inputs[field] || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder={`Enter staff ${field}`}
                            />
                        </div>
                    ))}
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
