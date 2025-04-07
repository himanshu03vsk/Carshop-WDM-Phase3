import React from "react";
import { Link } from "react-router-dom";
import style from './nav.module.css';



const Navbar = () => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    return (
        <nav>

            <ul>
                <li><Link to="/">Home</Link></li>


                <li><Link to="/contact">About Us</Link></li>

                {/* If token exists, show the Logout button */}
                {token ? (
                    <li><Link to="/logout">Logout</Link></li>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}

                {/* If token doesn't exist, show the Register button */}
                {!token && (
                    <li><Link to="/register">Register</Link></li>
                )}


                <li><Link to="/prodlist">Product Listings</Link></li>


                <li><Link to="/cart">My Cart</Link></li>


                <li> <Link to="/accsetting">My Account</Link></li>

            </ul>

        </nav>
    );
};

export default Navbar;