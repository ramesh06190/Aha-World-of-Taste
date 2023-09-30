import React, { useEffect, useState , createContext } from 'react'
import "./Navbar.css"
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import LoginSignUp from './LoginSignUp'
import { NavLink , Link , useNavigate} from 'react-router-dom'
// import { CartContext } from '../Pages/MenuList'
import { useCart } from "../Pages/CartContext"; // Import the useCart hook
// import Chat from "../assets/chat2_116191.png"
import Chat from "../Components/Chat"
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,

} from "@chakra-ui/react"; // Import Chakra UI components
export const WholeContext = createContext();

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [childData, setChildData] = useState(false);
const [isUserToken , setUserToken] = useState("")
const navigate = useNavigate();
const { cart } = useCart(); // Use the cart state and functions
const totalItemsInCart = cart.reduce((total, item) => total + item.count, 0);
console.log(totalItemsInCart , "totalItemsInCart")
// const  cart  = useContext(CartContext);
// console.log(cart , "navbarcart")
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  useEffect (()=>{
    const userToken = localStorage.getItem("userToken")
    setUserToken(userToken)
  } , [childData])

  const handleCloseModal = () => {
    setIsOpen(false);
 
  };

  const receiveDataFromChild = (data) => {
    setChildData(data);
  };

  const handleLogOutModal = () => {
    setChildData(false);
    navigate("/")
    localStorage.clear();
    window.location.reload();
   
  };



  return (
    <WholeContext.Provider value={{ isOpen, setIsOpen }}>
    <div className='landing-container'>
      <div className="nav-container">
        <div className="logo">
          <h1>Logo</h1>
        </div>
        <div className="search">
          <input type="text" name='search' placeholder='search for foods' />
        </div>
        <div className="nav-list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menuList">Menu</Link></li>
          <li>Reservation</li>
          <li>About Us</li>
          <Button onClick={(()=>{navigate("/cart")})}>Cart {totalItemsInCart === 0 ? "" : <p>{totalItemsInCart }</p>} </Button>
          {isUserToken !== null ? (
            <li>
              {/* Use Popover to display the logout options */}
              <Popover placement="bottom-start">
                <PopoverTrigger>
                  <Button>Logout</Button>
                </PopoverTrigger>
                <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                  <PopoverHeader pt={4} fontWeight='bold' border='0'>
                    Logout Options
                  </PopoverHeader>
                  <PopoverArrow bg='blue.800' />
                  <PopoverCloseButton />
                  <PopoverBody>
                    Are you sure you want to logout?
                  </PopoverBody>
                  <PopoverFooter
                    border='0'
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    pb={4}
                  >
                   <NavLink to={"/"}> <Button colorScheme='red' onClick={handleLogOutModal}>
                      Logout button
                    </Button> </NavLink>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            </li>
          ) : (
            <li onClick={handleOpenModal}>Login</li>
          )}
        </div>
      </div>
      <Outlet />
      <Footer />
      <div className='chatbtn'>
    <Chat/>
      </div>
      {isOpen ? (
        <div>
          <LoginSignUp onClick={handleCloseModal} IsOpen={isOpen} sendDataToParent={receiveDataFromChild} />
        </div>
      ) : (
        ""
      )}
    </div>
    </WholeContext.Provider>
  )
}

export default Navbar;
