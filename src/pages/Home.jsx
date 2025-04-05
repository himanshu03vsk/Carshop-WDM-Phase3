import React from "react";
import { useNavigate } from "react-router"; // Import the correct hook from React Router
import  "./Home.css"; // Import CSS module

const Home = () => {
    const navigate = useNavigate(); // Using the useNavigate hook for programmatic routing

    return (
        <div className="container"> {/* Use CSS module for className */}
            <img 
                className="image item"
                src="/cover.jpg" 
                alt="Car parts ecommerce platform cover" 
            />
            <div className="item entry">
                <p className="para">
                    Our Car Parts Ecommerce Platform is a one-stop online shop that provides a wide range of high-quality car parts and accessories for every vehicle, whether you’re a car owner, mechanic, or automotive enthusiast. From essential replacement components like brakes, filters, and batteries to specialized performance parts, we offer products for a variety of makes and models. The platform is designed with user convenience in mind, featuring an intuitive interface that makes it easy to search and find the exact parts you need. With secure payment options, fast shipping, and expert customer support, we ensure that your experience is smooth and reliable. Competitive pricing, combined with top-notch products, makes our platform the ideal destination for all your automotive needs, helping you keep your vehicle in peak condition without breaking the bank.
                </p>
                
                {/* Button to navigate using useNavigate hook */}
                <button type="button" id="start-button" onClick={() => navigate("/prodlist")} >
                    Start Exploring <img id="arrow" src="/arrow-rt.svg" alt="Go to product list" />
                </button>
            </div>
        </div>
    );
};

export default Home;