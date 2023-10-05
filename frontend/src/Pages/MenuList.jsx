import React, { useState, useEffect, useContext } from "react";
import { WholeContext } from "../Components/Navbar";
import { FaHeart } from "react-icons/fa";
import DumyCardImg from "../assets/LandingImg.png";
import {
  Box,
  VStack,
  Tabs,
  Text,
  IconButton,
  Flex,
  SimpleGrid,
  Button,
  Image,
} from "@chakra-ui/react";
import "./MenuList.css";
import { get, post } from "../api/ApiService";
import { useCart } from "../Pages/CartContext"; // Import the useCart hook

function MenuList() {
  const [selectedTab, setSelectedTab] = useState("All");
  const getuserid = localStorage.getItem("userId");
  const getuserToken = localStorage.getItem("userToken");
  const [category, setCategory] = useState([]);
  const updatedCatogery = [...["All"], ...category, ...["fav"]];

  const [dish, setDish] = useState([]);
  // console.log(dish, "uohoioi");
  const { isOpen, setIsOpen } = useContext(WholeContext);
  const { cart, addToCart, incrementCartItem, decrementCartItem } = useCart(); // Use the cart state and functions
  console.log(cart, "uohoioi");
  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  const favDish = (dish, userId) => {
    let arr = [];
    dish.forEach((item) => {
      if (item.likes.includes(userId)) {
        arr.push(item);
      }
    });
    return arr;
  };

  const filteredData =
    selectedTab === "All"
      ? dish
      : selectedTab === "fav"
      ? favDish(dish, getuserid)
      : dish?.filter((item) => item.category === selectedTab);

  // if(selectedTab === "fav"){
  //  dish?.map((val)=>val)
  // }

  const headers = {
    token: getuserToken,
  };

  console.log(filteredData, "oihhi");

  const handleLikeClick = async (id) => {
    if (!getuserToken) {
      setIsOpen(true);
    }
    // Optimistically update the local state
    setDish((prevDish) =>
      prevDish.map((item) =>
        item.id === id
          ? {
              ...item,
              likes: item.likes.includes(getuserid)
                ? item.likes.filter((userId) => userId !== getuserid)
                : [...item.likes, getuserid],
            }
          : item
      )
    );

    // Send the API request in the background
    if (getuserToken) {
      post("api/like", { dishId: id }, headers)
        .then((result) => {
          console.log(result, "oihohoip");
          if (!result.success) {
            // Revert the local state if the API request fails
            setDish((prevDish) =>
              prevDish.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      likes: item.likes.filter(
                        (userId) => userId !== getuserid
                      ),
                    }
                  : item
              )
            );
          }
        })
        .catch((error) => {
          console.error("Error sending like API request:", error);
        });
    } else {
      // Handle the case where the user is not authenticated
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      const result = await get("api/all/category");
      setCategory(result.data);
    };
    getCategory();

    getAllDish();
    setSelectedTab("Best Seller");
  }, []);

  const getAllDish = async () => {
    const result = await get("api/all/dish");
    setDish(result.data);
  };

  return (
    <Box display="flex">
      <VStack w="20%" p={4} spacing={4} align="stretch">
        {updatedCatogery?.map((tab, index) => (
          <div style={{ textAlign: "start" }} key={index}>
            <div
              className="menu-custom-tab"
              borderRadius="0"
              style={
                tab === selectedTab
                  ? {
                      backgroundColor: "#EFD36D",
                      boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                    }
                  : { backgroundColor: "" }
              }
              colorScheme="gray"
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </div>
          </div>
        ))}
      </VStack>

      <Box flex="1" p={4}>
        <Tabs isFitted variant="enclosed" index={selectedTab}>
          <h1 className="menuList-img">{selectedTab}</h1>

          <SimpleGrid columns={2} spacing={4}>
            {filteredData?.map((tab, index) => (
              <Box
                key={index}
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                boxShadow="lg"
              >
                <Flex justify="space-between" align="center">
                  <Image
                    src={tab.image}
                    alt="Item Image"
                    boxSize="100%"
                    objectFit="cover"
                    height="200px"
                    borderRadius="8px"
                  />
                </Flex>
                <div className="name-rate-wrap">
                  <div className="card-title">
                    <h2>{tab.foodName}</h2>
                  </div>
                  <div className="card-price">
                    <h5>{tab.price}</h5>
                  </div>
                </div>
                <Box mt={4}>
                  <Text>{tab.description}</Text>
                </Box>
                <div className="heart-wrap">
                  <Flex justify="space-between" mt={4} alignItems="center">
                    {cart.some((item) => item.id === tab.id) ? (
                      // If the item is in the cart and count is greater than 0, show the increment and decrement buttons
                      cart.find((item) => item.id === tab.id).count > 0 ? (
                        <>
                          <div>
                            <Button
                              size="sm" // Make the button smaller
                              backgroundColor="#EFD36D"
                              onClick={() => decrementCartItem(tab.id)}
                            >
                              -
                            </Button>
                            {cart.find((item) => item.id === tab.id).count}
                            <Button
                              size="sm" // Make the button smaller
                              backgroundColor="#EFD36D"
                              onClick={() => {
                                incrementCartItem(tab.id);
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
                          onClick={() => addToCart(tab)}
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
                            addToCart(tab); // Add the item to the cart as usual
                          }
                        }}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </Flex>
                  <IconButton
                    icon={<FaHeart />}
                    color={
                      getuserToken && tab.likes.includes(getuserid)
                        ? "red.500"
                        : "gray.300"
                    }
                    aria-label="Like"
                    marginTop="8px"
                    onClick={() => handleLikeClick(tab.id)}
                  />
                </div>
              </Box>
            ))}
          </SimpleGrid>
        </Tabs>
      </Box>
    </Box>
  );
}

export default MenuList;
