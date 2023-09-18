import React, { useState } from 'react';
import Header from './Header';
import backgroundImage from './About_us.jpg';
import backgroundImages from './vegetable_soup.jpg';

// Import small service images
import dineInImage from './dine_in.jpg';
import reserveTableImage from './reserve_table.png';
import orderOnlineImage from './order_online.png';

function AboutUs() {
  const [isAdditionalInfoVisible, setIsAdditionalInfoVisible] = useState(false);

  const toggleAdditionalInfo = () => {
    setIsAdditionalInfoVisible(!isAdditionalInfoVisible);
  };

  const bannerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '50vh', // Set the height for the banner section
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  };

  const contentContainerStyle = {
    display: 'flex',
    flexDirection: 'row', // Arrange items horizontally
    padding: '20px',
    backgroundColor: 'white', // Set background color for the content section
    color: 'black', // Set text color for the content section
    height: '40vh', // Reduce the height of the content section
  };

  const textContainerStyle = {
    flex: 1, // Make the text container take up half of the screen
    padding: '10px', // Add some padding to the text container
    overflowY: 'auto', // Add scrollbars if the content overflows
  };

  const textStyle = {
    fontSize: '24px', // Increase the font size
  };

  const imageContainerStyle = {
    flex: 1, // Make the image container take up half of the screen
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const imageStyle = {
    maxWidth: '100%', // Make sure the image fits within the container
    maxHeight: '100%', // Make sure the image fits within the container
    height: 'auto', // Maintain the aspect ratio of the image
  };

  const footerStyle = {
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    padding: '10px',
  };

  const serviceListStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    listStyle: 'none',
    padding: 0,
  };

  const serviceItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const serviceImageStyle = {
    width: '50px', // Set the width for the service images
    height: '50px', // Set the height for the service images
    marginBottom: '5px', // Add some spacing below the image
  };

  return (
    <div>
      <div className="app__aboutus-banner" style={bannerStyle}>
        <div className="app__aboutus-overlay flex__center">
        </div>
        <h1 className="headtext__cormorant" style={{ color: 'white' }}>About Us</h1>
      </div>

      <div className="app__aboutus-content flex__center" style={contentContainerStyle}>
        <div className="app__aboutus-content_about" style={textContainerStyle}>
          <div className="centered-content">
            <p className="p__opensans" style={textStyle}>
              Aha Restaurant is passionately committed to providing genuine care, authentic cuisine, and impeccable service,
              <br />creating a warm and refined ambiance that fulfills our customers' desires and exceeds their expectations.
            </p>
            {isAdditionalInfoVisible && (
              <div>
                <p>We have been in the business for over 10 years and have served thousands of satisfied customers.</p>
                <p>Our mission is to exceed customer expectations and deliver excellence in everything we do.</p>
              </div>
            )}
            <button type="button" className="custom__button" onClick={toggleAdditionalInfo}>
              {isAdditionalInfoVisible ? 'Read Less' : 'Read More'}
            </button>
          </div>
        </div>
        <div style={imageContainerStyle}>
          {/* Small square image to the right */}
          <img src={backgroundImages} alt="Vegetable Soup" style={imageStyle} />
        </div>
      </div>

      <footer style={footerStyle}>
        <div className="footer-services">
          <h2>Our Services</h2>
          <ul style={serviceListStyle}>
            <li style={serviceItemStyle}>
              <img src={dineInImage} alt="Dine In" style={serviceImageStyle} />
              Dine In
            </li>
            <li style={serviceItemStyle}>
              <img src={reserveTableImage} alt="Reserve Table" style={serviceImageStyle} />
              Reserve Table
            </li>
            <li style={serviceItemStyle}>
              <img src={orderOnlineImage} alt="Order Online" style={serviceImageStyle} />
              Order Online
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default AboutUs;
