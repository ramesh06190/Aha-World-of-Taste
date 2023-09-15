import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup';
import Home from './Home';
import Login from './Login';
import AdminHome from './AdminHome';

import Menu from './Menu';
import Reservation from './Reservation';
import AboutUs from './AboutUs';


function App() {
  return (
    <BrowserRouter>
    <div>
    
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/menu' element={<Menu />}></Route>
      <Route path='/reservation' element={<Reservation />}></Route>
      <Route path='/about-us' element={<AboutUs />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/admin-home' element={<AdminHome />}></Route>
   

    </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App