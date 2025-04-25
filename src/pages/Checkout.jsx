import React, { useState, useEffect } from "react";
import ShippingInfo from '../components/Shipping';
import PaymentInfo from '../components/PaymentInfo';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);
  const [billingAddress, setBillingAddress] = useState(null);
  const [paymentCard, setPaymentCard] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const fetchAddressAndPayment = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      const [addressResponse, paymentResponse] = await Promise.all([
        fetch(`http://localhost:3000/api/buyer-addresses/${user.email}`),
        fetch(`http://localhost:3000/api/payments/${user.email}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (addressResponse.ok && paymentResponse.ok) {
        const addressData = await addressResponse.json();
        const paymentData = await paymentResponse.json();
        setAddresses(addressData);
        setCards(paymentData.map(card => `Card **** ${card.card_no.slice(-4)}`));
      } else {
        console.error("Failed to fetch address or payment data");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchAddressAndPayment();
  }, []);

  const handleNewAddress = () => {
    const newAddress = prompt("Enter new address:");
    if (newAddress) setAddresses([...addresses, newAddress]);
  };

  const handleNewCard = () => {
    const newCard = prompt("Enter new card number:");
    if (newCard) setCards([...cards, `Card **** ${newCard.slice(-4)}`]);
  };

  const handleMakePayment = async () => {
    if (!billingAddress || !paymentCard) {
      alert("Please complete billing and payment information.");
      return;
    }

    setIsProcessing(true);

    const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
    const token = localStorage.getItem('token');

    try {
      // Step 1: Create the order
      const orderResponse = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          buyer_email: userEmail,
          shipping_address: billingAddress,
          payment_method: paymentCard,
        }),
      });

      if (!orderResponse.ok) throw new Error("Failed to create order");

      const { order_id } = await orderResponse.json();

      // Step 2: Fetch cart items
      const cartResponse = await fetch(`http://localhost:3000/api/carts/${userEmail}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const cartItems = await cartResponse.json();

      if (!cartItems || cartItems.length === 0) {
        alert("Your cart is empty.");
        setIsProcessing(false);
        return;
      }

      // Step 3: Create shipments
      for (const item of cartItems) {
        await fetch('http://localhost:3000/api/shipments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            order_id,
            part_id: item.part_id,
            color: item.color,
            quantity_purchased: item.quantity,
            shipment_cost: item.total_price,
          }),
        });
      }

      // Step 4: Clear the cart
      await fetch(`http://localhost:3000/api/carts/clear/${userEmail}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Order placed successfully!");
      navigate('/accsetting');

    } catch (err) {
      console.error("Checkout Error:", err);
      alert("Something went wrong during checkout.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-page container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Checkout</h1>

      {/* Shipping Info Section */}
      <div className="mb-8">
        <ShippingInfo
          addresses={addresses}
          onAddressSelect={setBillingAddress}
          onNewAddress={handleNewAddress}
        />
      </div>

      {/* Payment Info Section */}
      <div className="mb-8">
        <PaymentInfo
          cards={cards}
          onCardSelect={setPaymentCard}
          onNewCard={handleNewCard}
        />
      </div>

      {/* Payment Button */}
      <div className="flex justify-center">
        <button
          onClick={handleMakePayment}
          disabled={isProcessing}
          className="w-full sm:w-auto bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {isProcessing ? "Processing..." : "Make Payment"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
