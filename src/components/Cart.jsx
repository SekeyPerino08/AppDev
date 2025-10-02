import React from 'react';
import '../styles/App.css';

const Cart = ({ cart, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.product.id} className="cart-item">
              <img src={item.product.thumbnail} alt={item.product.title} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
              <div style={{ flex: 1 }}>
                <h4>{item.product.title}</h4>
                <p>${item.product.price}</p>
              </div>
              <div>
                <button onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}>+</button>
                <button onClick={() => onRemoveItem(item.product.id)} style={{ marginLeft: '10px' }}>Remove</button>
              </div>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={onCheckout}>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;
