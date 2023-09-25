import React, { useEffect, useState , createContext } from 'react'
import "./Navbar.css"
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

import { NavLink  , useNavigate} from 'react-router-dom'

import { useCart } from "../Pages/CartContext"; // Import the useCart hook

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

function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [childData, setChildData] = useState(false);
const [isUserToken , setUserToken] = useState("")
const navigate = useNavigate();
const { cart } = useCart(); // Use the cart state and functions
const totalItemsInCart = cart.reduce((total, item) => total + item.count, 0);
console.log(totalItemsInCart , "totalItemsInCart")


  useEffect (()=>{
    const userToken = localStorage.getItem("userToken")
    setUserToken(userToken)
  } , [childData])

 

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
          <h1>Admin Dashboard</h1>
        </div>
    
        <div className="nav-list">
        <li>
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
       
    
        </div>
      </div>
      <Outlet />
      <Footer />

 
  
    </div>
    </WholeContext.Provider>
  )
}

export default AdminNavbar;
