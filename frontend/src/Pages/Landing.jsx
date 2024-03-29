import React , {useState , useEffect} from 'react'
import "./Landing.css"
import { foodItems } from './LandingConfig'
import { Link } from 'react-router-dom'
import ReservationComponent from './ReservationComponent'
import { useNavigate, useLocation } from 'react-router-dom';
function Landing() {

  const vegItems = foodItems.filter((item) => item.type === 'Vegetarian');
  const nonVegItems = foodItems.filter(
    (item) => item.type === 'Non-Vegetarian'
  );
  const traditionalItems = foodItems.filter(
    (item) => item.type === 'Traditional'
  );
  const [location, setLocation] = useState(null);
 const navigate = useNavigate()
  const [error, setError] = useState(null);
const menuNav = ()=>{
  navigate("/menuList")
}

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          localStorage.setItem('latitude', latitude);
          localStorage.setItem('longitude', longitude);

          setLocation({ latitude, longitude });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not available in your browser.");
    }
  }, []);

  return (
    <>
      <div className='landing-img-con'>
        <div className="landing-img">
        </div>
        <div className="overlay"></div>
        <div className="content-card">
          <h1>Welcome to Aha restaurant <br /> Authentic Cuisine Palace <br />Dine In - Take Out</h1>
          <div className="btn-wrap">
            <button className='contact' onClick={menuNav}>Pickup / Delivery</button>
        
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
              <h3>Aha Restaurant is passionately committed to providing genuine care, authentic cuisine, and impeccable service, creating a warm and refined ambiance that fulfils our customers' desires and exceeds their expectations.</h3>
            </div>
          </div>
        </div>
      </div>

    </>


  )
}

export default Landing