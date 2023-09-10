import React from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Reservation.css';


const Reservation = () => (
  <div className="app__bg app__wrapper section__padding" id='reservation'>
    <div className="app__wrapper_img app__wrapper_img-reverse">
      <img src={images.chef} alt="chef_image" />
    </div>
    <div className="app__wrapper_info">
      <SubHeading title="Reservation" />
      <h1 className="headtext__cormorant">Reserve Table</h1>

      <div className="app__chef-content">
        <div className="app__chef-content_quote">
          <img src={images.quote} alt="quote_image" />
          <p className="p__opensans">Book your table and savor an unforgettable dining experience that delights the senses and creates lasting memories.</p>
        </div>
      </div>

      <div className="app__chef-sign">
        <button type="button" className="custom__button">Click here to Reserve</button>
      </div>
    </div>
  </div>
);

export default Reservation;