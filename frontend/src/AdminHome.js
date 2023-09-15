import React from 'react';
import Header from './Header';
import './Home.css';
import { Link } from 'react-router-dom';
import ManageOrdersIcon from './ManageOrdersIcon'; // Import icons or images for buttons as needed
import ManageReservationsIcon from './ManageReservationsIcon';
import ManageFoodItemsIcon from './ManageFoodItemsIcon';

function AdminHome() {
  return (
    <div className="welcome-container">
       <header className="admin-header">
        <h1 className="admin-welcome">Welcome to Aha Restaurant (Admin)</h1>
        <div className="admin-buttons">
          <Link to="/manage-orders">
            <button className="admin-button">
              <ManageOrdersIcon /> Manage Orders
            </button>
          </Link>
          <Link to="/manage-reservations">
            <button className="admin-button">
              <ManageReservationsIcon /> Manage Reservations
            </button>
          </Link>
          <Link to="/manage-food-items">
            <button className="admin-button">
              <ManageFoodItemsIcon /> Manage Food Items
            </button>
          </Link>
        </div>
      </header>
      <div>
        <h1 className="welcome">Welcome to Aha Restaurant</h1>
      </div>

      <div className="admin-button-stack">
        {/* Manage Orders Button */}
        <Link to="/manage-orders">
          <button className="admin-button">Manage Orders</button>
        </Link>

        {/* Manage Reservations Button */}
        <Link to="/manage-reservations">
          <button className="admin-button">Manage Reservations</button>
        </Link>

        {/* Manage Food Items Button */}
        <button className="admin-button">Manage Food Items</button>

        {/* Sub-buttons for Manage Food Items */}
        <Link to="/view-food-items">
          <button className="admin-sub-button">View Food Items</button>
        </Link>
        <Link to="/add-food-item">
          <button className="admin-sub-button">Add Food Item</button>
        </Link>
        <Link to="/delete-food-item">
          <button className="admin-sub-button">Delete a Food Item</button>
        </Link>
        <Link to="/update-food-item">
          <button className="admin-sub-button">Update a Food Item</button>
        </Link>
      </div>

      {/* "Chat with Us" button at the bottom right */}
      <button className="chat-button">Customer's Chat</button>
    </div>
  );
}

export default AdminHome;
