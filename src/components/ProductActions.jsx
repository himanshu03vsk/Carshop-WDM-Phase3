import React, { useState, useEffect } from 'react';

const ProductActions = ({ product }) => {
  const [quantity, setQuantity] = useState(1); // Quantity is updated via input
  const [colors, setColors] = useState([]); // Colors are used in the dropdown
  const [selectedColor, setSelectedColor] = useState('');  // State for the selected color
  const [buttonState, setButtonState] = useState('Add to Cart'); // State for the button

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Make sure you send the correct product ID or product object
        const response = await fetch(`http://localhost:3000/api/parts/color/${product}`);
        const data = await response.json();
        // console.log(data);

        // Assuming the API returns an array of colors like { color: 'Black' }
        setColors(data.colors || []);  // Set the colors to state

        // Optionally set the default color if it's available
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0].color);  // Set the default color to the first color in the list
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };

    fetchProductDetails();
  }, [product]);  // Re-run the effect when the `product` changes

  // Function to handle adding the product to the cart
  const handleAddToCart = () => { // Function is invoked on button click
    if (selectedColor && quantity > 0) {
      // Make an API call to add the product to the cart
      const updateCart = async () => {
        const buyer_email = JSON.parse(localStorage.getItem('user')).email; // Extract email from user object
        console.log('Adding to cart:', {
          part_id: product,
          color: selectedColor,
          quantity: quantity,
          buyer_email: buyer_email,  // Use extracted email
        });
        try {
          const response = await fetch(`http://localhost:3000/api/carts/${buyer_email}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${localStorage.getItem('token')}`,  // Include token for authentication
            },
            body: JSON.stringify({
              buyer_email: buyer_email,  // Get the email from local storage
              part_id: product,
              color: selectedColor,
              quantity: quantity,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to add product to cart');
          }

          const result = await response.json();
          console.log('Cart updated successfully:', result);
        } catch (err) {
          console.error('Error updating or creating cart:', err);
        }
      };

      updateCart();
      console.log(`Added ${quantity} of ${selectedColor} to the cart.`);
      setButtonState('Added to Cart');
      
      // Disable the button temporarily
      document.querySelector('.crt-btn').disabled = true;
      // Add logic to actually add the product to the cart (e.g., storing in localStorage or redux)
    } else {
      console.log('Please select a color');
    }
  };

  return (
    <div className="prod-actions">
      <div className="act-btn">
        {/* Color selection dropdown */}
        <label htmlFor="color-select">Select Color:</label>
        <select
          id="color-select"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}  // Update selected color
        >
          {colors.length > 0 ? (
            colors.map((color, index) => (
              <option key={index} value={color.color}>
                {color.color}
              </option>
            ))
          ) : (
            <option disabled>No colors available</option>
          )}
        </select>
      </div>

      <div className="act-btn">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          min="1"
          max="5"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}  // Update quantity
          className="product-action-input"
        />
      </div>

      <button className="act-btn crt-btn" onClick={handleAddToCart}>
        {buttonState}
      </button>
    </div>
  );
};

export default ProductActions;
