import React from 'react';

import { images } from '../../constants';
import { SubHeading} from '../../components';

import './Header.css';

const Header = () => (
  <div className="app__header app__wrapper section__padding" id="home">
    <div className="app__wrapper_info">
      <SubHeading title="Chase the new flavour" />
      <h1 className="app__header-h1">Aha World Of Taste</h1>
      <p className="p__opensans" style={{ margin: '2rem 0' }}>Unforgettable memories are forged and cherished when loved ones gather around the table, creating a tapestry of shared experiences, heartfelt connections, and nourishment for both body and soul.</p>
      <button type="button" className="custom__button">Pickup/Delivery</button>
    </div>

    <div className="app__wrapper_img">
      <img src={images.welcome} alt="header_img" />
    </div>
  </div>
);

export default Header;
