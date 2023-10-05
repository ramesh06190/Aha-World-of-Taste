import React, { useEffect, useState, createContext } from 'react'
import "./Navbar.css"
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import LoginSignUp from './LoginSignUp'
import { NavLink, Link, useNavigate } from 'react-router-dom'
// import { CartContext } from '../Pages/MenuList'
import { useCart } from "../Pages/CartContext"; // Import the useCart hook

import DumyCardImg from "../assets/LandingImg.png"
import Chat from "../Components/Chat"
import { get } from "../api/ApiService"
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
  Flex,
  Box
} from "@chakra-ui/react"; // Import Chakra UI components
export const WholeContext = createContext();

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [childData, setChildData] = useState(false);
  const [navDish, setNavDish] = useState("")
  const [isUserToken, setUserToken] = useState("")
  const getuserToken = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const {
    cart,
    userr,
    addToCart,
    incrementCartItem,
    decrementCartItem,
  } = useCart()
  const totalItemsInCart = cart.reduce((total, item) => total + item.count, 0);
  const [searchValue, setSearchValue] = useState('');
  const [filteredNavDish, setFilteredNavDish] = useState([]);

  console.log(searchValue, "totalItemsInCart")
  // const  cart  = useContext(CartContext);
  // console.log(cart , "navbarcart")
  const handleOpenModal = () => {
    setIsOpen(true);
  };



  const getAllDish = async () => {
    const result = await get("api/all/dish");
    setNavDish(result.data);
  };
  useEffect(() => {
    getAllDish();

  }, []);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken")
    setUserToken(userToken)
  }, [childData])

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

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    filterNavDish(value);
  };

  const filterNavDish = (value) => {
    const lowerCaseValue = value.toLowerCase();
    const filteredDishes = navDish.filter((dish) =>
      dish.foodName.toLowerCase().includes(lowerCaseValue) ||
      dish.description.toLowerCase().includes(lowerCaseValue)
    );
    setFilteredNavDish(filteredDishes);
  };


  return (
    <WholeContext.Provider value={{ isOpen, setIsOpen }}>
      <div className='landing-container'>
        <div className="nav-container">
          <div className="logo">
            <h1>Logo</h1>
          </div>
          <div className="search">
            <input
              type="text"
              name='search'
              placeholder='Search for foods'
              value={searchValue}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/reservation">Reservation</Link></li>
            <li><Link to="/menuList">Menu</Link></li>
            <li><Link to="/aboutUs">About Us</Link></li>
      
            {isUserToken !== null ? (
              <li>
                {/* Use Popover to display the logout options */}
                <Popover placement="bottom-start">
                  <PopoverTrigger>
                  <Box borderRadius="50%" backgroundColor="gray" width="40px" height="40px" display='flex' justifyContent="center" alignItems="center">{userr?.fullName?.slice(-1)?.toUpperCase()}</Box>
                  </PopoverTrigger>
                  <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                    <PopoverHeader pt={4} fontWeight='bold' border='0'>
                      Profile
                    </PopoverHeader>
                    <PopoverArrow bg='blue.800' />
                    <PopoverCloseButton />
                
                    <PopoverFooter
                      border='0'
                      display='flex'
                      alignItems='center'
                      justifyContent='space-between'
                      pb={4}
                    >
                            <NavLink to={"/"}> <Button backgroundColor='#EFD36D' width="140px" onClick={handleLogOutModal}>
                        Recent Orders 
                      </Button> </NavLink>
                      <NavLink to={"/"}> <Button colorScheme='red' width="140px"  onClick={handleLogOutModal}>
                        Logout 
                      </Button> </NavLink>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              </li>
            ) : (
              <li onClick={handleOpenModal}>Login</li>
            )}
                  <Button onClick={(() => { navigate("/cart") })}>Cart {totalItemsInCart === 0 ? "" : <p>{totalItemsInCart}</p>} </Button>
          </div>
        </div>
        {
          searchValue !== "" ? (
            <div className='search-wrap-con'>
              <h1 className='search-header'>Search resuls for "{searchValue}"</h1>
              <div className='search-conn'>

                <div className='card-containerr'>
                  {filteredNavDish.map((dish) => (
                    <div key={dish.id} className='card'>
                      <img src={dish.image} alt=''></img>
                      <h3>{dish.foodName}</h3>

                      <div className='rate-con'>
                             <div className='dish-rate'>{dish.price}</div>
                        <Flex justify="space-between">


                          {cart.some((item) => item.id === dish.id) ? (
                            // If the item is in the cart and count is greater than 0, show the increment and decrement buttons
                            cart.find((item) => item.id === dish.id).count > 0 ? (
                              <>
                                <div>
                                  <Button
                                    size="sm" // Make the button smaller
                                    backgroundColor="#EFD36D"
                                    onClick={() => decrementCartItem(dish.id)}
                                  >
                                    -
                                  </Button>
                                  {cart.find((item) => item.id === dish.id).count}
                                  <Button
                                    size="sm" // Make the button smaller
                                    backgroundColor="#EFD36D"
                                    onClick={() => {
                                      incrementCartItem(dish.id);
                                    }}
                                  >
                                    +
                                  </Button>
                                </div>
                              </>
                            ) : (
                              // If the count is 0, show the "Add to Cart" button
                              <Button
                                size="sm" // Make the button smaller
                                backgroundColor="#EFD36D"
                                onClick={() => addToCart(dish)}
                              >
                                Add to Cart
                              </Button>
                            )
                          ) : (
                            // Otherwise, show the "Add to Cart" button
                            <Button
                              size="sm"
                              backgroundColor="#EFD36D"
                              onClick={() => {
                                if (!getuserToken) {
                                  // User is not authenticated, show a message or take action
                                  setIsOpen(true); // Open a modal or perform some other action
                                } else {
                                  // User is authenticated, add the item to the cart
                                  addToCart(dish); // Add the item to the cart as usual
                                }
                              }}
                            >
                              Add to Cart
                            </Button>
                          )}
                        </Flex>
                   
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          ) : (
            <Outlet />
          )
        }


        <Footer />
        <div className='chatbtn'>
          <Chat />
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
