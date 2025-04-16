import React, { useEffect, useState } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const buyer_email = JSON.parse(localStorage.getItem('user'))?.email;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/orders/${buyer_email}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    if (buyer_email) fetchOrders();
  }, [buyer_email]);

  return (
    <div className="section">
      <h3>Order History</h3>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => {
            const address = JSON.parse(order.shipping_address);
            return (
              <li key={order.order_id} className="mb-6 border-b pb-4">
                <p><strong>Order ID:</strong> {order.order_id}</p>
                <p><strong>Date:</strong> {new Date(order.order_date).toLocaleString()}</p>
                <p><strong>Payment:</strong> {order.payment_method}</p>
                <p><strong>Shipping:</strong> {address.line1}, {address.city}, {address.state_in} {address.zip_code}</p>
                {console.log('Order:', order)}
                {order.Shipments?.length > 0 ? (
  <div className="mt-2 ml-4">
    <p><strong>Items:</strong></p>
    <ul className="list-disc pl-4">
      {order.Shipments.map((shipment, idx) => (
        <li key={idx}>
          <p>• <strong>{shipment.Part.part_name}</strong> — {shipment.color}, Qty: {shipment.quantity_purchased} <br />
          <em>Status:</em> {shipment.shipment_status}</p>
        </li>
      ))}
    </ul>
  </div>
) : (
  <p>No items in this order.</p>
)}

              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
