import React from 'react';
import Navbar from '../components/Navbar';
import './CartPage.css';

const CartPage = () => {
  // Replace with your cart state and logic
  const cartItems = [];

  return (
    <div>
      <Navbar />
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {/* Map through cart items and display them */}
        </div>
      )}
    </div>
  );
};

export default CartPage;
