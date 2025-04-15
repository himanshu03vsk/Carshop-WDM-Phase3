import React, { useState } from "react";
import ShippingInfo from '../components/Shipping'; // BillingInfo Component
import PaymentInfo from '../components/PaymentInfo'; // PaymentInfo Component
// import { head } from "../../backend/routes/buyerAddressRoutes";
// BillingInfo Component







// Main CheckoutPage Component
const CheckoutPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);
  
  const [billingAddress, setBillingAddress] = useState(null);
  const [paymentCard, setPaymentCard] = useState(null);

  const fetchAddressAndPayment = async () => {
    try {
      console.log("before fetching data")
      const addressResponse = await fetch(`http://localhost:3000/api/buyer-addresses/${JSON.parse(localStorage.getItem('user'))['email']}`);
      const paymentResponse = await fetch(`http://localhost:3000/api/payments/${JSON.parse(localStorage.getItem('user'))['email']}`,
     { headers : { 'Content-Type': 'application/json', 
      Authorization: `Bearer ${localStorage.getItem('token')}`
      }   
     })
    

      console.log("after fetching data")


      if (addressResponse.ok && paymentResponse.ok) {
        const addressData = await addressResponse.json();
        const paymentData = await paymentResponse.json();
      console.log('data', addressData, paymentData);
        setAddresses(addressData);
        setCards(paymentData.map(card => `Card **** ${card.card_no.slice(-4)}`));
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchAddressAndPayment();
  }, []);
  const handleNewAddress = () => {
    const newAddress = prompt("Enter new address:");
    setAddresses([...addresses, newAddress]);
  };

  const handleNewCard = () => {
    const newCard = prompt("Enter new card number:");
    setCards([...cards, `Card **** ${newCard.slice(-4)}`]);
  };

  const handleMakePayment = () => {
    if (!billingAddress || !paymentCard) {
      alert("Please complete billing and payment information.");
      return;
    }

    alert(`Payment Successful! Billing Address: ${billingAddress}, Card: ${paymentCard}`);
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <ShippingInfo
        addresses={addresses}
        onAddressSelect={setBillingAddress}
        onNewAddress={handleNewAddress}
      />

      <PaymentInfo
        cards={cards}
        onCardSelect={setPaymentCard}
        onNewCard={handleNewCard}
      />

      <div>
        <button onClick={handleMakePayment}>Make Payment</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
