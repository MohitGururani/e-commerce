// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import your CSS file

function Header() {
  return (
    <header className="app-header">
      <h1>E-Commerce Website</h1>
      <nav>
        <Link to="/cart">View Cart</Link>
      </nav>
    </header>
  );
}

export default Header;
