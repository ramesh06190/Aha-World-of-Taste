import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdRestaurantMenu } from 'react-icons/md';

import images from '../../constants/images';

import './Navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <nav className='app__navbar'>
      <div className='app__navbar-logo'>
        <img src={images.gericht} alt="app logo"></img>
      </div>
      <ul className='app__navbar-links'>
        <li className='p__opensans'><a href="#home">Home</a></li>
        <li className='p__opensans'><a href="#about">About</a></li>
        <li className='p__opensans'><a href="#menu">Menu</a></li>
        <li className='p__opensans'><a href="#reservation">Book Table</a></li>
        <li className='p__opensans'><a href="#awards">Awards</a></li>
        <li className='p__opensans'><a href="#contacts">contacts</a></li>
      </ul>
      <div className='app__navbar-login'>
        <a href="#login" className='p__opensans'>Login / Register</a>
        
      </div>
      <div className='app__navbar-smallscren'>
        <GiHamburgerMenu color='#fff' fontSize={27} onClick={() => setToggleMenu(true)} />

        {toggleMenu && (
          <div className='app__navbar-smallscreen_overlay flex__center slide-bottom'>
            <MdRestaurantMenu fontSize={27} className='overlay__close' onClick={() => setToggleMenu(false)} />
            <ul className='app__navbar-smallscreen_links'>
              <li className='p__opensans'><a href="#home">Home</a></li>
              <li className='p__opensans'><a href="#about">About</a></li>
              <li className='p__opensans'><a href="#menu">Menu</a></li>
              <li className='p__opensans'><a href="#reservation">Book Table</a></li>
              <li className='p__opensans'><a href="#awards">Awards</a></li>
              <li className='p__opensans'><a href="#contacts">contacts</a></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar;
