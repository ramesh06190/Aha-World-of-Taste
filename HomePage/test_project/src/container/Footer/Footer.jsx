
import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

import { FooterOverlay, Newsletter } from '../../components';
import { images } from '../../constants';
import './Footer.css';

const Footer = () => (
  <div className="app__footer section__padding" id="contacts">
    <FooterOverlay />
    <Newsletter />

    <div className="app__footer-links">
      <div className="app__footer-links_contact">
        <h1 className="app__footer-headtext">Contact Us</h1>
        <p className="p__opensans">678 Avengers Bungalow, MaryVille, Mo, 64468</p>
        <p className="p__opensans">+1 660-344-1130</p>
        <p className="p__opensans">+1 660-525-1110</p>
      </div>

      <div className="app__footer-links_logo">
        <p className="p__opensans"> </p>
        <p className="p__opensans">&quot;The best way to find yourself is to lose yourself in the service of others.&quot;</p>
        <img src={images.spoon} className="spoon__img" style={{ marginTop: 15 }} />
        <div className="app__footer-links_icons">
          <FiFacebook />
          <FiTwitter />
          <FiInstagram />
        </div>
      </div>

      <div className="app__footer-links_work">
        <h1 className="app__footer-headtext">Working Hours</h1>
        <p className="p__opensans">Monday-Friday:</p>
        <p className="p__opensans">10:00 Am - 02:00 Pm</p>
        <p className="p__opensans">Saturday-Sunday:</p>
        <p className="p__opensans">10:00 Am - 03:00 Pm</p>
      </div>
    </div>

    <div className="footer__copyright">
      <p className="p__opensans">2023 AhaWorldOfTaste. All Rights reserved.</p>
    </div>

  </div>
);

export default Footer;