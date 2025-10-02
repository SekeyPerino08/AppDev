import React, { useState } from 'react';
import '../styles/App.css';

const Checkout = ({ cart, onCompletePurchase }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'credit_card'
  });

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate purchase
    alert('Purchase completed!');
    onCompletePurchase();
  };

  return (
    <div className="container">
      <h2>Checkout</h2>
      <h3>Total: ${total.toFixed(2)}</h3>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>Address:
          <textarea name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <label>Payment Method:
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </label>
        <button type="submit">Complete Purchase</button>
      </form>
    </div>
  );
};

export default Checkout;
