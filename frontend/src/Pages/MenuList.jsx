import React, { useState, useEffect, useContext } from "react";
import { WholeContext } from '../Components/Navbar';
import { FaHeart } from "react-icons/fa";
import {
  Box,
  VStack,
  Tabs,
  Text,
  IconButton,
  Flex,
  SimpleGrid,
  Button
} from "@chakra-ui/react";
import "./MenuList.css";
import { get, post } from "../api/ApiService";
import { useCart } from "../Pages/CartContext"; // Import the useCart hook

function MenuList() {
  const [selectedTab, setSelectedTab] = useState("All");
  const getuserid = localStorage.getItem("userId");
  const getuserToken = localStorage.getItem("userToken");
  const [category, setCategory] = useState([]);
  const [dish, setDish] = useState([]);
  const { isOpen, setIsOpen } = useContext(WholeContext);
  const { cart, addToCart, removeFromCart, incrementCartItem, decrementCartItem } = useCart(); // Use the cart state and functions
  const totalItemsInCart = cart.reduce((total, item) => total + item.count, 0);
  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  const filteredData =
    selectedTab === "All"
      ? dish
      : dish?.filter((item) => item.category === selectedTab);

  const headers = {
    token: getuserToken,
  };

  const handleLikeClick = async (id) => {
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
          if (!result.success) {
            // Revert the local state if the API request fails
            setDish((prevDish) =>
              prevDish.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      likes: item.likes.filter((userId) => userId !== getuserid),
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
        {category?.map((tab, index) => (
          <div style={{ textAlign: 'start' }} key={index}>
            <div
              className="menu-custom-tab"
              borderRadius="0"
              style={tab === selectedTab ? { backgroundColor: '#EFD36D', boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)" } : { backgroundColor: '' }}
              colorScheme="gray"
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </div>
          </div>
        ))}
      </VStack>

      <div className="menuList-img">
        <Box flex="1" p={4}>
          <Tabs isFitted variant="enclosed" index={selectedTab}>
            <h1>{selectedTab}</h1>

            <SimpleGrid columns={2} spacing={4}>
              {filteredData?.map((tab, index) => (
                <Box key={index} p={4} borderWidth="1px" borderRadius="lg">
                  <Flex justify="space-between">
                    <Box>
                      <h2>{tab.foodName}</h2>
                      <Text>{tab.description}</Text>
                    </Box>
                  
                  </Flex>
                  <Box>
                <Flex justify="space-between">
                  <IconButton
                        icon={<FaHeart />}
                        color={tab.likes.includes(getuserid) ? "red.500" : "gray.300"}
                        aria-label="Like"
                        onClick={() => handleLikeClick(tab.id)}
                      />

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
                          onClick={() => addToCart(tab)}
                        >
                          Add to Cart
                        </Button>
                      )}

</Flex>
                    </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Tabs>
        </Box>
      </div>
    </Box>
  );
}

export default MenuList;











