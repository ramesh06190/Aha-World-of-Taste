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
  Spinner,
  Center,
  // Import Spinner from Chakra UI
} from "@chakra-ui/react";
import "./MenuList.css";
import { get, post } from "../api/ApiService";
import { useCart } from "../Pages/CartContext";

function MenuList() {
  const [selectedTab, setSelectedTab] = useState("All");
  const getuserid = localStorage.getItem("userId");
  const getuserToken = localStorage.getItem("userToken");
  const [category, setCategory] = useState([]);
  const updatedCatogery = [...["All", "Best Seller"], ...category, ...["fav"]];
  const [dish, setDish] = useState([]);
  const { isOpen, setIsOpen } = useContext(WholeContext);
  const { cart, addToCart, incrementCartItem, decrementCartItem } = useCart();
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
      : selectedTab !== "Best Seller"
      ? dish?.filter((item) => item.category === selectedTab)
      : sortDish();
  const filteredDataWithSearchTerm = filteredData.filter(
    (item) =>
      item.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function sortDish() {
    let data = dish;
    data.forEach((item) => {
      const ratings = item.ratings.map((rating) => rating.rating);
      const averageRating =
        ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
      item.averageRating = averageRating;
    });

    // Sort the array based on the average rating in descending order
    data.sort((a, b) => b.averageRating - a.averageRating);
    const filteredData = data.filter((item) => item.averageRating > 0);
    return filteredData;
  }
  console.log(filteredData, "filteredData");
  const headers = {
    token: getuserToken,
  };

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

    const getAllDish = async () => {
      const result = await get("api/all/dish");
      let data = result.data.filter((ele) => ele.disable === false);
      setDish(data);
      setIsLoading(false); // Set loading to false when data is fetched
    };

    getCategory();
    getAllDish();
    setSelectedTab("All");
  }, []);

  return (
    <div className="mybackground-container">
      <input
        type="text"
        placeholder="Search for food"
        value={searchTerm}
        onChange={handleSearchTermChange}
        className="search-input"
      />

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

            {isLoading ? ( // Display a Spinner while loading
              <Center h="80vh">
                <Spinner size="xl" />
              </Center>
            ) : (
              <SimpleGrid columns={2} spacing={4}>
                {filteredDataWithSearchTerm?.map((tab, index) => (
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
                          cart.find((item) => item.id === tab.id).count > 0 ? (
                            <>
                              <div>
                                <Button
                                  size="sm"
                                  backgroundColor="#EFD36D"
                                  onClick={() => decrementCartItem(tab.id)}
                                >
                                  -
                                </Button>
                                {cart.find((item) => item.id === tab.id).count}
                                <Button
                                  size="sm"
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
                            <Button
                              size="sm"
                              backgroundColor="#EFD36D"
                              onClick={() => addToCart(tab)}
                            >
                              Add to Cart
                            </Button>
                          )
                        ) : (
                          <Button
                            size="sm"
                            backgroundColor="#EFD36D"
                            onClick={() => {
                              if (!getuserToken) {
                                setIsOpen(true);
                              } else {
                                addToCart(tab);
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
            )}
          </Tabs>
        </Box>
      </Box>
    </div>
  );
}

export default MenuList;
