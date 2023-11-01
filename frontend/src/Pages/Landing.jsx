import React from 'react'
import "./Landing.css"
import { foodItems } from './LandingConfig'
import { Link } from 'react-router-dom'
import ReservationComponent from './ReservationComponent'
function Landing() {

  const vegItems = foodItems.filter((item) => item.type === 'Vegetarian');
  const nonVegItems = foodItems.filter(
    (item) => item.type === 'Non-Vegetarian'
  );
  const traditionalItems = foodItems.filter(
    (item) => item.type === 'Traditional'
  );
  return (
    <>
      <div className='landing-img-con'>
        <div className="landing-img">
        </div>
        <div className="overlay"></div>
        <div className="content-card">
          <h1>Welcome to Aha restaurant <br /> Authentic Cuisine Palace <br />Dine In - Take Out</h1>
          <div className="btn-wrap">
            <button className='contact'>Contact Us </button>
            <button className='call'>Call Us</button>
          </div>
        </div>
      </div>
  <ReservationComponent/>
      <div className="menu-section">
        <div className="menu-section-wrap">
          <div className="menu-content">


            <div className="menu-card">
              <h1>Vegetarian</h1>
              {
                vegItems.map((val) => {
                  return (<div className="menu-item-wrap">
                    <div className="item-wrap">
                      <div className="item-name">
                        {val.name}
                      </div>
                      <div className="item-rate"> {val.price}</div>
                    </div>
                    <div className="discription">{val.description}</div>
                  </div>)
                })
              }
            </div>



          </div>
          <div className="menu-content">
            <div className="menu-card">
              <h1>Non Veg</h1>
              {
                nonVegItems.map((val) => {
                  return (<div className="menu-item-wrap">
                    <div className="item-wrap">
                      <div className="item-name">
                        {val.name}
                      </div>
                      <div className="item-rate"> {val.price}</div>
                    </div>
                    <div className="discription">{val.description}</div>
                  </div>)
                })
              }
            </div>



          </div>
          <div className="menu-content">
            <div className="menu-card">
              <h1>Traditional</h1>
              {
                traditionalItems.map((val) => {
                  return (<div className="menu-item-wrap">
                    <div className="item-wrap">
                      <div className="item-name">
                        {val.name}
                      </div>
                      <div className="item-rate"> {val.price}</div>
                    </div>
                    <div className="discription">{val.description}</div>
                  </div>)
                })
              }
            </div>


          </div>

        </div>

        <div className="view-full-btn">
          <button > <Link to="/menuList" relative="path">
            View Full menu
          </Link></button>
        </div>
      </div>
      <div className="about-us">
        <div className="abt-us-img">
          <div className="abt-us-content">


            <div className='abt-text'>
              <h1>About US</h1>
              <h3>Aha Restaurant is passionately committed to pr
                oviding genuine care, authentic cuisine, and impeccable se
                rvice, creating a warm and refined ambiance that fulfils our
                customers' desires and exceeds their expectations.</h3>
            </div>
          </div>
        </div>
      </div>

    </>


  )
}

export default Landing