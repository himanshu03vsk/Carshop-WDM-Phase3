import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext
import style from './nav.module.css';

const Navbar = () => {
    const { logout } = useAuth(); // Get the logout function from context
    const navigate = useNavigate(); // To navigate after logout

    // Handle Logout
    const handleLogout = () => {
        logout(); // Log out the user (clear context and localStorage)
        navigate('/login'); // Redirect to the login page (or any page you want after logout)
    };

    const token = localStorage.getItem('token'); // Get token from localStorage

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/contact">About Us</Link></li>

                {/* If token exists, show the Logout button */}
                {token ? (
                    <li><button onClick={handleLogout}>Logout</button></li>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}

                {/* If token doesn't exist, show the Register button */}
                {!token && (
                    <li><Link to="/register">Register</Link></li>
                )}

                <li><Link to="/prodlist">Product Listings</Link></li>
                <li><Link to="/cart">My Cart</Link></li>
                <li><Link to="/accsetting">My Account</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
