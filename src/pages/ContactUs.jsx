import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./contactUs.css";
// About Page
const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const containerStyle = {
    width: '600px',
    height: '400px'
  };

  const center = {
    lat: 32.7357, 
    lng: -97.1081 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here (e.g., send data to server)
    console.log("Form data submitted:", formData);
  };

  return (
    <div>
    <div className="main">
      
      <section className="contact-info">
        <h2>Contact Us</h2>
        <h3>We're here to help</h3>

        <div className="contact-detail">
          <h3>Phone Number</h3>
          <h4>(817) xxx-xxxx</h4>
        </div>

        <div className="contact-detail">
          <h3>E-Mail</h3>
          <h4>contact@carshop.com</h4>
        </div>

        <div className="contact-detail">
          <h3>Address</h3>
          <h4>416 Yates ST, Arlington, TX 76010</h4>
        </div>
      </section>

      <section className="map-section">
        <h2>Find Us on the Map</h2>
        <LoadScript googleMapsApiKey="AIzaSyC_uSLzJkD-58lga1hRprISlHPr1Q8vjGs">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </section>
      </div>

      <section className="contact-form">
        <h3>Send us a Message</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="phone"
            id="phone"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Message Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default About;