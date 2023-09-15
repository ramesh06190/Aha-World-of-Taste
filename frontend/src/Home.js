import React from 'react';
import Header from './Header'; // Import your header component
import './Home.css'; // Import the CSS file for this component
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="welcome-container">
      <Header /> {/* Include the header component */}
      <div>
        <h1 className='welcome'>Welcome to Aha Restaurant</h1> {/* Added heading */}
      </div>
      {/* "Pickup/Delivery" button at the middle of the page */}
      <Link to="/menu">
      <button className="pickup-delivery-button" >Pickup/Delivery</button>
      </Link>
      {/* "Chat with Us" button at the bottom right */}
      <button className="chat-button">Chat with Us</button>
      {/* Other content for the Home page */}
    </div>
  );
}

export default Home;
