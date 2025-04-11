import React, { useState, useEffect, useRef } from "react";
import './cart.css';

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [quantities, setQuantities] = useState({});
    const [saving, setSaving] = useState({});  // New state to manage saving status

    const getKey = (item) => `${item.part_id}_${item.color}`;

    useEffect(() => {
        const fetchCartItems = async () => {
            const buyer_email = JSON.parse(localStorage.getItem('user')).email;
            try {
                const response = await fetch(`http://localhost:3000/api/carts/${buyer_email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch cart items');

                const data = await response.json();

                const enrichedItems = await Promise.all(
                    data.map(async (item) => {
                        const partRes = await fetch(`http://localhost:3000/api/parts/${item.part_id}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        });
                        if (!partRes.ok) throw new Error('Failed to fetch part details');
                        const partData = await partRes.json();

                        return {
                            ...item,
                            ...partData,
                        };
                    })
                );

                const initialQuantities = {};
                enrichedItems.forEach((item) => {
                    const key = getKey(item);
                    initialQuantities[key] = item.quantity;
                });

                setCartItems(enrichedItems);
                setQuantities(initialQuantities);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    useEffect(() => {
        const newTotal = cartItems.reduce((acc, item) => {
            const key = getKey(item);
            const qty = quantities[key] || 0;
            return acc + item.price * qty;
        }, 0);
        setTotal(newTotal);
    }, [quantities, cartItems]);

    const handleRemove = async (itemToRemove) => {
        const key = getKey(itemToRemove);

        setCartItems((prevItems) =>
            prevItems.filter((item) => getKey(item) !== key)
        );

        setQuantities((prevQuantities) => {
            const updated = { ...prevQuantities };
            delete updated[key];
            return updated;
        });

        try {
            await fetch(`http://localhost:3000/api/carts/${itemToRemove.buyer_email}/${itemToRemove.part_id}/${itemToRemove.color}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert('Item has been deleted successfully.');
        } catch (error) {
            console.error('Error removing item from backend:', error);
        }
    };

    // Function to handle saving the quantity
    const handleSaveQuantity = async (item) => {
        const key = getKey(item);
        const updatedQty = quantities[key];

        setSaving((prev) => ({ ...prev, [key]: true }));

        try {
            await fetch(`http://localhost:3000/api/carts/updateCartItem/${item.buyer_email}/${item.part_id}/${item.color}?quantity=${updatedQty}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            console.log(`Quantity updated for ${key}: ${updatedQty}`);
        } catch (error) {
            console.error('Error updating quantity:', error);
        } finally {
            setSaving((prev) => ({ ...prev, [key]: false }));
        }
    };

    return (
        <div>
            {cartItems.map((item) => {
                const key = getKey(item);
                return (
                    <div key={key} className="card">
                        <h3>{item.part_name}</h3>
                        <p>Price: ${item.price}</p>

                        <label htmlFor={`quantity-${key}`}>Quantity:</label>
                        <input
                            type="number"
                            id={`quantity-${key}`}
                            min="1"
                            max={item.quantity}
                            value={quantities[key] ?? item.quantity}
                            onChange={(e) =>
                                setQuantities((prev) => ({
                                    ...prev,
                                    [key]: parseInt(e.target.value) || 1,
                                }))
                            }
                            className="product-action-input"
                        />

                        <p>Color: {item.color}</p>
                        <p>Subtotal: ${item.price * (quantities[key] ?? item.quantity)}</p>

                        <button
                            onClick={() => handleSaveQuantity(item)}
                            disabled={saving[key]}
                            className="save-button"
                        >
                            {saving[key] ? 'Saving...' : 'Save'}
                        </button>

                        <button
                            className="remove-button"
                            onClick={() => handleRemove(item)}
                        >
                            Remove
                        </button>
                    </div>
                );
            })}

            <hr />
            <h2>Grand Total: ${total.toFixed(2)}</h2>
            <button
                onClick={() => {
                    const updatedCart = cartItems.map((item) => {
                        const key = getKey(item);
                        return {
                            ...item,
                            quantity: quantities[key],
                        };
                    });
                    localStorage.setItem('cartData', JSON.stringify(updatedCart));
                    window.location.href = '/checkout';
                }}
                className="checkout-button"
            >
                Proceed to Checkout
            </button>
        </div>
    );
};

export default ShoppingCart;
