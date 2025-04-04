import React from "react";
import { useNavigate } from "react-router";

const Home = () => {
    // const navigate = useNavigate();   //it is a hook, think of it as a routers that we can use to route it to different routes
    return ( //returns the html as component
        <div>
            <h2>Home Page</h2>
            <p>This is the home page y'all</p>
            {/* <button onClick={() => navigate('/contact')}>About Us</button> */}
            {/* make this redirect to something */}
        </div>
    );
};

export default Home;