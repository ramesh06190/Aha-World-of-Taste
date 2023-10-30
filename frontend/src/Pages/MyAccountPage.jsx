import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { get, post } from "../api/ApiService";
import DeleteImg from "../assets/deleteimg.png";
import { StarIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Button,
  FormLabel,
  FormControl,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Select,
  ModalFooter,
  List,
  ListItem,
  IconButton,
  ListIcon,
  Spinner,
  Center,
  useToast,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";

const MyAccountPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const getuserToken = localStorage.getItem("userToken");
  const [orders, setOrders] = useState([]);
  const toast = useToast();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoadingOrders, setIsLoadingOrders] = useState(true); // Loader for Orders tab
  const [isLoadingAddress, setIsLoadingAddress] = useState(true);
  const [foodRatings, setFoodRatings] = useState({});

  const handleStarClick = (foodName, star) => {
    setFoodRatings({
      ...foodRatings,
      [foodName]: star,
    });
  };
  
  const handleTabChange = (index) => {
    setSelectedTab(index);
  };
  const navigate = useNavigate();
  const handleLogOutModal = () => {
    navigate("/");
    localStorage.clear();
    window.location.reload();
  };
  const headers = {
    token: getuserToken,
  };

  
  function getStatusStyle(status) {
    switch (status) {
      case "Pending":
        return {
          backgroundColor: "orange",
          color: "white",
          padding: "2px 8px",
          borderRadius: "5px",
        };
      case "Order Accepted":
        return {
          backgroundColor: "green",
          color: "white",
          padding: "2px 8px",
          borderRadius: "5px",
        };
      case "Order Prepared":
        return {
          backgroundColor: "blue",
          color: "white",
          padding: "2px 8px",
          borderRadius: "5px",
        };
      case "Out for Delivery":
        return {
          backgroundColor: "purple",
          color: "white",
          padding: "2px 8px",
          borderRadius: "5px",
        };
      case "Delivered":
        return {
          backgroundColor: "lime",
          color: "black",
          padding: "2px 8px",
          borderRadius: "5px",
        };
      case "Order Canceled":
        return {
          backgroundColor: "red",
          color: "white",
          padding: "2px 8px",
          borderRadius: "5px",
        };
      default:
        return {};
    }
  }
  const defaultToastConfig = {
    duration: 2000,
    isClosable: true,
    position: "top",
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressData, setAddressData] = useState({
    houseFloor: "",
    buildingBlock: "",
    landmarkArea: "",
    addressType: "home",
  });
  const [savedAddresses, setSavedAddresses] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    GetDetails();
  }, []);
  const GetDetails = async () => {
    const result = await get("user/my/order", {}, headers);
    if (result.status) {
      const mappedOrders = result?.data?.orders?.map((order) => {
        return {
          id: order.id,
          rate: order.order.reduce((totalPrice, dish) => {
            console.log(dish.price, dish.count, "dish ere");
            return totalPrice + dish.price * dish.count;
          }, 0),
          quantity: order.order.reduce(
            (totalQuantity, dish) => totalQuantity + dish.count,
            0
          ),
          foodName: order.order.map((dish) => dish.foodName).join(", "),
          orderedTime: order.createdAt,
          status: order.status,
        };
      });
      setOrders(mappedOrders);
      setIsLoadingOrders(false);
      setIsLoadingAddress(false);
      setSavedAddresses(result?.data?.user?.addresses);
      setFirstName(result?.data?.user?.fullName);
      setEmail(result?.data?.user?.email);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
  };
  const updateProfile = async () => {
    const result = await post(
      "user/update/details",
      {
        fullName: firstName,
      },
      headers
    );
    if (result.status) {
      GetDetails();
      toast({
        title: "profile Updated Sucessfully",
        status: "success",
        ...defaultToastConfig,
      });
    } else {
      toast({
        title: "profile not Updated Sucessfully",

        status: "error",
        ...defaultToastConfig,
      });
    }
  };
  const saveAddress = async () => {
    const result = await post(
      "user/add/address",
      {
        ...addressData,
      },
      headers
    );
    if (result.status) {
      GetDetails();
      setAddressData({
        houseFloor: "",
        buildingBlock: "",
        landmarkArea: "",
        addressType: "home",
      });
    }
    closeModal();
  };

  const [isReviewDrawerOpen, setIsReviewDrawerOpen] = useState(false);
  const [reviewedFood, setReviewedFood] = useState([]);

  const openReviewDrawer = () => {
    const dummyFoodData = [
      { name: "Food Item 1", rating: 0 },
      { name: "Food Item 2", rating: 0 },
    ];
    setReviewedFood(dummyFoodData)
    const initialRatings = {};
    dummyFoodData.forEach((food) => {
      initialRatings[food.name] = food.rating;
    });
  
    setFoodRatings(initialRatings);
    setIsReviewDrawerOpen(true);
  };
  

  const tabData = [
    { label: "Orders", content: "" },
    { label: "Address", content: "Content for Tab 2" },
    { label: "Profile", content: "Content for Tab 3" },
  ];

  return (
    <Box bg="gray.200" p={4} minHeight="85vh">
      <Tabs
        isFitted
        orientation="vertical"
        // variant="solid-rounded"
        colorScheme="teal"
        size="lg"
      >
        <TabList width="25%" height="0px">
          {tabData.map((tab, index) => (
            <Tab
              width="90%"
              key={index}
              margin="1px 12px 1px 0px"
              onClick={() => handleTabChange(index)}
              bg={selectedTab === index ? "#EFD36D" : "gray.200"}
              _hover={{ bg: "#EFD36D", color: "white" }}
              color={selectedTab === index ? "white" : "Black"}
            >
              {tab.label}
            </Tab>
          ))}
          <NavLink to={"/"}>
            {" "}
            <Button colorScheme="red" width="90%" onClick={handleLogOutModal}>
              Logout
            </Button>{" "}
          </NavLink>
        </TabList>
        <TabPanels>
          {isLoadingOrders ? ( // Display loader while data is loading
            <TabPanel key={1} p={4} bg="white" boxShadow="lg">
              <Center h="80vh">
                <Spinner size="xl" />
              </Center>
            </TabPanel>
          ) : (
            <TabPanel
              key={1}
              p={4}
              bg="white"
              boxShadow="lg"
              borderRadius={"5px"}
            >
              <Box minHeight={"86vh"}>
                {orders.length === 0 ? (
                  <Box
                    h="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    minHeight={"80vh"}
                  >
                    <Text fontSize="lg">No orders to display</Text>
                  </Box>
                ) : (
                  orders.map((order) => (
                    <Box
                      key={order.id}
                      w="100%"
                      borderWidth="1px"
                      borderColor="gray.300"
                      p="4"
                      mb="4"
                      borderRadius="md"
                      display="flex"
                      flexDirection="column"
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text fontSize="lg">{order.foodName}</Text>
                        <Text
                          fontSize="md"
                          mt="2"
                          style={getStatusStyle(order.status)}
                        >
                          {order.status}
                        </Text>
                      </Box>
                      <Text fontSize="md" mt="2">
                        Rate: ${order.rate}
                      </Text>
                      <Text fontSize="md" mt="2">
                        Order ID: {order.id}
                      </Text>
                      <Box display="flex"
                        justifyContent="space-between"
                        alignItems="center">
                        <Text fontSize="md" mt="2">
                          Ordered Time: {order.orderedTime}
                        </Text>
                        <Button onClick={openReviewDrawer}>Review</Button>
                      </Box>
                    </Box>
                  ))
                )}
              </Box>
            </TabPanel>
          )}

          {isLoadingAddress ? (
            <TabPanel key={1} p={4} bg="white" boxShadow="lg">
              <Center h="80vh">
                <Spinner size="xl" />
              </Center>
            </TabPanel>
          ) : (
            <TabPanel
              key={2}
              p={4}
              bg="white"
              boxShadow="lg"
              borderRadius={"5px"}
            >
              <Box minHeight="86vh">
                <Box p={4}>
                  <Text fontSize="2xl" fontWeight="bold">
                    All Saved Addresses
                  </Text>
                  <Button variant="outline" float="right" onClick={openModal}>
                    Add New Address
                  </Button>

                  <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Enter Location Information</ModalHeader>
                      <ModalBody>
                        <Input
                          name="houseFloor"
                          placeholder="House No. & Floor*"
                          value={addressData.houseFloor}
                          onChange={handleInputChange}
                        />
                        <Input
                          name="buildingBlock"
                          placeholder="Building & Block No.*"
                          value={addressData.buildingBlock}
                          onChange={handleInputChange}
                        />
                        <Input
                          name="landmarkArea"
                          placeholder="Landmark & Area Name (Optional)"
                          value={addressData.landmarkArea}
                          onChange={handleInputChange}
                        />
                        <Select
                          name="addressType"
                          placeholder="Select Address Type"
                          value={addressData.addressType}
                          onChange={handleInputChange}
                        >
                          <option value="home">Home</option>
                          <option value="office">Office</option>
                          <option value="other">Other</option>
                        </Select>
                      </ModalBody>
                      <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={saveAddress}>
                          Save
                        </Button>
                        <Button onClick={closeModal}>Close</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>

                  <List mt={4} marginTop={"100px"}>
                    {savedAddresses.length === 0 ? (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        minHeight={"60vh"}
                      >
                        <Text fontSize="lg">No addresses to display</Text>
                      </Box>
                    ) : (
                      savedAddresses.map((address, index) => (
                        <ListItem
                          key={index}
                          display="flex"
                          alignItems="center"
                          p={2}
                          m={"15px 2px"}
                          border={"1px"}
                          borderColor="black"
                          borderRadius={5}
                        >
                          <ListIcon color="green.500" />
                          <Box flex="1">
                            <Text fontWeight="bold">
                              Address Type: {address.addressType}
                            </Text>
                            <Text>
                              {address.houseFloor},{address.buildingBlock},{" "}
                              {address.landmarkArea}{" "}
                            </Text>
                          </Box>
                          <div
                            className="addressDel"
                            onClick={async () => {
                              const result = await post(
                                "user/delete/address",
                                {
                                  id: address.id,
                                },
                                headers
                              );
                              if (result.status) {
                                GetDetails();
                              }
                            }}
                          >
                            <img src={DeleteImg} alt="" />
                          </div>
                        </ListItem>
                      ))
                    )}
                  </List>
                </Box>
              </Box>
            </TabPanel>
          )}

          <TabPanel
            key={3}
            p={4}
            bg="white"
            boxShadow="lg"
            borderRadius={"5px"}
          >
            <Box height="85vh" width="100%" margin="10px">
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  placeholder="Enter your first name"
                  width="99%"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  margin="10px 0px"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Enter your email"
                  width="99%"
                  value={email}
                  margin="10px 0"
                  isDisabled
                />
              </FormControl>

              <Button
                backgroundColor="#EFD36D"
                color="black"
                marginTop="10px"
                onClick={updateProfile}
              >
                Update
              </Button>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Drawer isOpen={isReviewDrawerOpen} placement="bottom" onClose={() => setIsReviewDrawerOpen(false)}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Review Food Items</DrawerHeader>
          <DrawerBody>
            {reviewedFood.map((food, index) => (
              <Box key={index} p={2} borderBottom="1px solid #ddd">
                <Text>{food.name}</Text>
                <Text display="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon
                    key={star}
                    as={StarIcon}
                    boxSize="16px" // Set the size of the star
                    color={
                      star <= foodRatings[food.name]
                        ? "yellow.500"
                        : "gray.500"
                    } // Set the star color based on the rating
                    ml="2px"
                    onClick={() => handleStarClick(food.name, star)}
                    />
                  ))}
                </Text>
              </Box>
            ))}
            {reviewedFood.length === 0 && <Text>No food items to review.</Text>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MyAccountPage;
