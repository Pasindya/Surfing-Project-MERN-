import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Consolidate imports from 'react-router-dom'
import axios from 'axios'; // Import axios

export default function Oder(props) {
    const { _id, cnumber, mmyy, cvc, name, address, email, pnumber, type } = props.user;
    const navigate = useNavigate(); // Use navigate instead of history

    // Delete user handler
    // const history = useNavigate();
    // const deleteHandler = async () => {
    //     try {
    //         await axios.delete(`http://localhost:5009/users/${_id}`);
    //         navigate("/oderdetail"); // Redirect after successful deletion
    //     } catch (error) {
    //         console.error("Error deleting the user:", error);
    //     }
    // };

    const history = useNavigate();

  const deleteHandler = async () => {
    await axios
      .delete(`http://Localhost:5009/users/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/oderdetail"));
  };

    return (
        <div className="order-container">
            <h1 className="heading">User</h1>
            <div className="order-details">
                
                <p><strong>Card number:</strong> {cnumber}</p>
                <p><strong>MMYY:</strong> {mmyy}</p>
                <p><strong>CVC:</strong> {cvc}</p>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Address:</strong> {address}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone Number:</strong> {pnumber}</p>
                <p><strong>Surfboard Type:</strong> {type}</p>
            </div>

            <div className="button-container">
                <Link to={`/updateoder/${_id}`}>
                    <button className="update-btn">Update</button>
                </Link>
                <button onClick={deleteHandler} className="delete-btn">Delete</button>
            </div>
 
            {/* Internal CSS */}
            <style>
                {`
                    .order-container {
                        max-width: 600px;
                        margin: 40px auto;
                        padding: 20px;
                        background-color: #f4f4f4;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        text-align: center;
                    }

                    .heading {
                        font-size: 2rem;
                        margin-bottom: 20px;
                        color: #333;
                    }

                    .order-details p {
                        font-size: 1.2rem;
                        margin: 10px 0;
                        color: #555;
                    }

                    .button-container {
                        margin-top: 20px;
                    }

                    .button-container button,
                    .button-container .update-btn {
                        padding: 10px 15px;
                        margin: 10px;
                        font-size: 1rem;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: background-color 0.3s;
                    }

                    .update-btn {
                        background-color: #4CAF50;
                        color: white;
                    }

                    .update-btn:hover {
                        background-color: #45a049;
                    }

                    .delete-btn {
                        background-color: #f44336;
                        color: white;
                    }

                    .delete-btn:hover {
                        background-color: #e53935;
                    }

                    .button-container a {
                        text-decoration: none;
                    }
                `}
            </style>
        </div>
    );
}

//<p><strong>ID:</strong> {_id}</p>
