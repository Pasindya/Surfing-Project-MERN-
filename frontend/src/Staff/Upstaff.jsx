//Upstaff
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Staffnavi from './Staffnavi'; // Import Staffnavi component

export default function Upstaff() {
    const [inputs, setInputs] = useState({});
    const [loading, setLoading] = useState(true); // To handle loading state
    const [error, setError] = useState(null); // To handle error state
    const [success, setSuccess] = useState(false); // To handle success state
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:5009/staff/${id}`);
                setInputs(response.data.staff);
            } catch (error) {
                setError("Error fetching staff data. Please try again.");
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
                name: inputs.name,
                gmail: inputs.gmail,
                age: parseFloat(inputs.age),
                address: inputs.address,
                experience: parseFloat(inputs.experience),
                password: inputs.password,
                nic: parseFloat(inputs.nic),
                salary: parseFloat(inputs.salary),
                designation: inputs.designation,
            });
            setSuccess(true); // Set success state to true after updating
            setTimeout(() => {
                navigate("/staffdetails"); // Navigate after updating
            }, 1500); // Delay navigation to show success message
        } catch (error) {
            setError("Error updating staff data. Please try again.");
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
         // For the "nic" field, restrict input to numbers and the letter "V"
        if (name === 'nic') {
        const nicRegex = /^[0-9]*[Vv]?$/; // Allow only numbers and optionally 'V' or 'v'
        if (!nicRegex.test(value) || value.length > 12) {
            return; // Do not update if invalid NIC is typed
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
        <div className="flex">
            <Staffnavi /> {/* Include the Staffnavi component */}
            <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen"> {/* Adjust layout to work with Staffnavi */}
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">Update Staff Member</h1>
                    {error && <div className="text-red-500">{error}</div>} {/* Display error if exists */}
                    {success && <div className="text-green-500">Staff member updated successfully!</div>} {/* Display success message */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {['name', 'gmail', 'age', 'address', 'experience', 'password', 'nic', 'salary', 'designation'].map((field) => (
                            <div key={field}>
                                <label htmlFor={field} className="block text-gray-700 capitalize">{field}:</label>
                                <input
                                    type={
                                        field === 'gmail' ? 'email' 
                                        : field === 'age' || field === 'experience' || field === 'nic' || field === 'salary' 
                                        ? 'number' : 'text'
                                    }
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
            </main>
        </div>
    );
}
