import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext
import "./nav.module.css"; // Import your custom CSS for the Navbar

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
        <nav className="rounded text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo or Brand */}
                <div className="text-2xl font-semibold">
                    <Link to="/" className="hover:text-purple-100">CarShop</Link>
                </div>

                {/* Navbar Links */}
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/" className="hover:text-gray-400">Home</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-gray-400">About Us</Link>
                    </li>
                    <li>
                        <Link to="/chat-with-seller" className="hover:text-gray-400">Chat with Us</Link>
                    </li>
                    
                    {/* Conditional Rendering based on Token */}
                    {token ? (
                        <li>
                            <button
                                onClick={handleLogout} 
                                className="bg-gray-600 hover:bg-red-700 text-white px-3 mx-2 rounded-md"
                            >
                                Logout
                            </button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className="hover:text-gray-400">Login</Link>
                            </li>
                            <li>
                                <Link to="/register" className="hover:text-gray-400">Register</Link>
                            </li>
                        </>
                    )}
                    
                    <li>
                        <Link to="/prodlist" className="hover:text-gray-400">Product Listings</Link>
                    </li>
                    <li>
                        <Link to="/cart" className="hover:text-gray-400">My Cart</Link>
                    </li>
                    <li>
                        <Link to="/accsetting" className="hover:text-gray-400">My Account</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
