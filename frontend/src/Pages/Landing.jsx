import React from 'react'
import "./Landing.css"
import { Button, Select } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { foodItems } from './LandingConfig'
import { Link } from 'react-router-dom'

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
          <h1>Welcome to Aha restaurant <br /> Authentic Cuisine Palace <br />Dine In - Take Out - Catering</h1>
          <div className="btn-wrap">
            <button className='contact'>Contact Us </button>
            <button className='call'>Call Us</button>
          </div>
        </div>
      </div>
      <div className="reservation-section">
        <h1>Reserve a Table</h1>
        <h4>To help us find the best table for you, select the preferred party size, date, and time of your reservation.</h4>
        <div className="reserve-input-wrap">
          < div className='label-wrap'>
            <p>Party Size</p>
            <Select placeholder='Select option' focusBorderColor='black' borderRadius="2px">
              <option value='option1'>Guest 1</option>
              <option value='option2'>Guest 2</option>
              <option value='option3'>Guest 3</option>
            </Select>
          </div>
          < div className='label-wrap'>
            <p>Date</p>
            <Input
              focusBorderColor='black' borderRadius="2px"
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
            />
          </div>
          <div className='label-wrap'>
            <p>Time</p>
            <Select placeholder=' Select your comfortable Time' focusBorderColor='black' borderRadius="2px">
              <option value='option1'>Time 1</option>
              <option value='option2'>Time 2</option>
              <option value='option3'>Time 3</option>
            </Select>
          </div>
          <div className="label-wrap-btn">
            <div>
              <Button borderRadius="2px" colorScheme='gray' >Find A Table</Button>
            </div>
          </div>
        </div>
      </div>
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