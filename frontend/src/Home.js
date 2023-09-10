// Home.js
import React from 'react';
import Header from './Header'; // Import your header component

function Home() {
  return (
    <div class = "welcome-container">
      <Header /> {/* Include the header component */}
      <h1>Welcome to Our Restaurant</h1>
      {/* Other content for the Home page */}
    </div>
  );
}

export default Home;
