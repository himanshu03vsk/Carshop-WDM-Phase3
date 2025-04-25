import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShippingInfo = ({ addresses, onAddressSelect, onNewAddress }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  const handleAddNewAddress = (e) => {
    // Navigate to the account settings page to add a new card
    navigate("/accsetting");
  };

  // Handle the selection of an address from the dropdown
  const handleSelectAddress = (e) => {
    const address = JSON.parse(e.target.value); // parse the JSON string back into an object
    setSelectedAddress(address);
    onAddressSelect(address);

  
  };

  return (
    <div className="billing-info">
      <h2>Shipping Information</h2>
      
      <div>
        <h3>Choose a Shipping Address</h3>
        {addresses.length > 0 ? (
          <select onChange={handleSelectAddress}>
            <option value="">Select Existing Address</option>
            {addresses.map((address, index) => (
              <option key={index} value={JSON.stringify(address)}>
                {/* Render address in a human-readable format */}
                {address.line1}, {address.city}, {address.state_in}, {address.zip_code}
              </option>
            ))}
          </select>
        ) : (
          <p>No addresses available. Please add a new one.</p>
        )}
      </div>

      <div>
        <button onClick={handleAddNewAddress}>Add New Address</button>
      </div>

      <div>
        {selectedAddress && (
          <div>
            <h4>Selected Address:</h4>
            {/* Render full details of the selected address */}
            <p>{selectedAddress.line1}, {selectedAddress.line2}, {selectedAddress.city}, {selectedAddress.state_in} {selectedAddress.zip_code}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingInfo;
