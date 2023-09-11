import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for routing
import './Header.css'; // Import your CSS file for styling
import logoImage from './AhaLogo2.jpg';

function Header() {
  return (
    <header className="header">
      <div className="container">
      <div className="logo">
        <Link to="/">
          <img src={logoImage} width = '50px' alt='Restaurant Logo' />
          </Link>
        </div>
        <nav className="navbar">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reservation">Reservation</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
