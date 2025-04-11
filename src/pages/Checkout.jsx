import React, { useState, useEffect } from 'react';

const Checkout = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        selectedCard: '',
    });

    const [cards, setCards] = useState([]);

    useEffect(() => {
        // Fetch card information from the database
        const fetchCards = async () => {
            try {
                const response = await fetch('/api/cards'); // Replace with your API endpoint
                const data = await response.json();
                setCards(data);
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };

        fetchCards();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add logic to process the checkout
    };

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit}>
                <h2>Billing Information</h2>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>State:</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Zip Code:</label>
                    <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                    />
                </div>

                <h2>Payment Information</h2>
                <div>
                    <label>Select Card:</label>
                    <select
                        name="selectedCard"
                        value={formData.selectedCard}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Select a card
                        </option>
                        {cards.map((card) => (
                            <option key={card.id} value={card.id}>
                                {`**** **** **** ${card.last4} (Exp: ${card.expiryDate})`}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default Checkout;