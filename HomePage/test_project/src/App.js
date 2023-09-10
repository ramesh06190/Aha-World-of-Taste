import React from 'react';

import { AboutUs,  FindUs, Footer, Gallery, Header, Intro, Laurels, Reservation, SpecialMenu, LoginPage } from './container';
import { Navbar } from './components';
import './App.css';

const App = () => (
  <div>
    <Navbar />
    <Header />
    <AboutUs />
    <SpecialMenu />
    <Reservation />
    <Intro />
    <Laurels />
    <Gallery />
    <FindUs />
    <Footer />
  </div>
);

export default App;
