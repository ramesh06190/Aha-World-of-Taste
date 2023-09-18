import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for routing
import './Header.css'; // Import your CSS file for styling
import logoImage from './AhaLogo2.jpg';

function AdminHeader() {
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
            <li><Link to="/admin-home">Home</Link></li>
            <li><Link to="//manage-orders">Manage Orders</Link></li>
            <li><Link to="/manage-reservations">Manage Reservations</Link></li>
            <li><Link to="/login">LogOut</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AdminHeader;
