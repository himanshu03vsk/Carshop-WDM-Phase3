import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// PaymentInfo Component
const PaymentInfo = ({ cards, onCardSelect, onNewCard }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();


  const handleAddNewCard = () => {
    // Navigate to the account settings page to add a new card
    navigate("/accsetting");
  };


  const handleSelectCard = (card) => {
    setSelectedCard(card);
    onCardSelect(card);
  };

  return (
    <div className="payment-info">
      <h2>Payment Information</h2>

      <div>
        <h3>Choose a Payment Card</h3>
        {cards.length > 0 ? (
          <select onChange={(e) => handleSelectCard(e.target.value)}>
            <option value="">Select Existing Card</option>
            {cards.map((card, index) => (
              <option key={index} value={card}>
                {card}
              </option>
            ))}
          </select>
        ) : (
          <p>No cards available. Please add a new one.</p>
        )}
      </div>

      <div>
        <button onClick={handleAddNewCard}>Add New Card</button>
      </div>

      <div>
        {selectedCard && (
          <p>Selected Card: {selectedCard}</p>
        )}
      </div>
    </div>
  );
};


export default PaymentInfo;