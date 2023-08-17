// components/CartPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './CartPage.css'; // Import your CSS file

function CartPage({ cartItems }) {
  return (
    <div className="cart-page-container">
      <div className="cart-page-header">
        <h2>Cart Page</h2>
        <Link to="/" className="continue-shopping-link">
          Continue Shopping
        </Link>
      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items-list">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div className="cart-item-details">
                <h4>{item.title}</h4>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartPage;
