import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ orderId }) => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {orderId ? (
        <Link to={`/cart/${orderId}`}>Cart</Link>
      ) : (
        <Link to="/cart">Cart</Link>
      )}
    </nav>
  );
};

export default Navbar;
