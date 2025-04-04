import React from "react";
import { Link } from "react-router";
import style from './nav.module.css';



const Navbar = () => {
    return (
        <nav>

            <ul>
                <li><Link to="/">Home</Link></li>


                <li><Link to="/contact">About Us</Link></li>


                <li><Link to="/logout">Logout</Link></li>


                <li><Link to="/prodlist">Product Listings</Link></li>


                <li><Link to="/cart">My Cart</Link></li>


                <li> <Link to="/accsetting">My Account</Link></li>

            </ul>

        </nav>
    );
};

export default Navbar;