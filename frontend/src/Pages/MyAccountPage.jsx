import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { get, post } from "../api/ApiService";
import DeleteImg from "../assets/deleteimg.png";
import { StarIcon } from "@chakra-ui/icons";
import { Icon, Textarea, flexbox } from "@chakra-ui/react";
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
  Radio,
} from "@chakra-ui/react";
const MyAccountPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const getuserToken = localStorage.getItem("userToken");
  const getUserId = localStorage.getItem("userId");
  const [orders, setOrders] = useState([]);
  const toast = useToast();
  const [firstName, setFirstName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [isLoadingOrders, setIsLoadingOrders] = useState(true); // Loader for Orders tab
  const [isLoadingAddress, setIsLoadingAddress] = useState(true);
  const [Reviewsucess, setReviewSucess] = useState(false);
  const [foodRatings, setFoodRatings] = useState({});
  const [orderRating, setOrderRating] = useState(0);
  const [order, setOrder] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [isAddingAddress, setIsAddingAddress] = useState(true);
  const [updateAddress, setupdateAddress] = useState(false);
  const [getAddressId, setGetAddressId] = useState("");

  console.log(getAddressId, "getAddressId");
  function convertUTCtoCustomFormat(utcTimestamp) {
    const date = new Date(utcTimestamp);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  const handleSave = async () => {
    const result = await post(
      "user/update/review",
      {
        id: updateOrder.id,
        status: true,
        review: textValue,
        rating: orderRating,
      },
      headers
    );
    console.log(result);
    if (result.status) {
      GetDetails();
      toast({
        title: "Thanks for your feed back",
        description: "We value your comments",
        status: "success",
        ...defaultToastConfig,
      });
      setReviewSucess(true);

      setIsReviewDrawerOpen(false);
    }
  };

  const myEditFun = (val) => {
    navigate("/EditUserDetailPage", { state: { myVal: val } });
  };

  const DeleteRes = async (id) => {
    const result = await post(
      "user/delete/reservation",
      {
        id: id,
      },
      headers
    );
    if (result.status) {
      toast({
        title: "Reservation Deleted Successfully",
        status: "success",
        ...defaultToastConfig,
      });
      GetReservationDetail();
    }
  };

  useEffect(() => {
    GetReservationDetail();
  }, []);

  const openAddModal = () => {
    setIsAddingAddress(true);
    setEditingAddress([]);
    openModal();
    setupdateAddress(false);
  };

  const openEditModal = (address, addressId) => {
    const getDefaultAddressData = () => {
      return {
        houseFloor: address.houseFloor,
        buildingBlock: address.buildingBlock,
        landmarkArea: address.landmarkArea,
        addressType: address.addressType,
      };
    };

    setGetAddressId(addressId);
    setIsAddingAddress(false);
    setEditingAddress(getDefaultAddressData);
    openModal();
    setupdateAddress(true);
  };

  const GetReservationDetail = async () => {
    const result = await get("user/all/reservation");
    if (result.status) {
      setOrder(result.data.filter((val) => val.userId === getUserId));
    }
  };

  const handleStarOrder = (star) => {
    setOrderRating(star);
  };
  const handleStarClick = async (food, star) => {
    console.log(updateOrder, "here");
    let data = updateOrder;
    data.review.forEach((item) => {
      if (item.id === food.id) {
        item.value = star;
      }
    });
    const result = await post(
      "api/update/rating",
      {
        id: food.id,
        rating: star,
        reviewerId: food.userId,
      },
      headers
    );
    if (result.status) {
      setFoodRatings({
        ...foodRatings,
        [food.name]: star,
      });
    }
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
  function getStatusStylenew(status) {
    switch (status) {
      case "Pending":
        return {
          backgroundColor: "orange",
          color: "white",
          padding: "2px 8px",
          borderRadius: "5px",
        };
      case "Approved":
        return {
          backgroundColor: "green",
          color: "white",
          padding: "2px 8px",
          borderRadius: "5px",
        };

      case "Rejected":
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
    duration: 3000,
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
  console.log(addressData, "addressData");
  const [savedAddresses, setSavedAddresses] = useState([]);
  console.log(savedAddresses, "savedAddresses");
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
        let reviewArray = [];
        order.order.forEach((ele) => {
          if (ele.review) {
            reviewArray.push({ ...ele.review, userId: order.userId });
          }
        });
        return {
          id: order.id,
          rate: order.order.reduce((totalPrice, dish) => {
            return totalPrice + dish.price * dish.count;
          }, 0),
          quantity: order.order.reduce(
            (totalQuantity, dish) => totalQuantity + dish.count,
            0
          ),
          foodName: order.order.map((dish) => dish.foodName).join(", "),
          orderedTime: order.createdAt,
          status: order.status,
          reviewStatus: order?.reviewStatus,
          review: reviewArray,
        };
      });

      const reversedMappedOrders = mappedOrders.slice().reverse();
      setOrders(reversedMappedOrders);
      setIsLoadingOrders(false);
      setIsLoadingAddress(false);
      setSavedAddresses(result?.data?.user?.addresses);
      setFirstName(result?.data?.user?.fullName);
      setMobile(result?.data?.user?.mobile);
      setEmail(result?.data?.user?.email);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isAddingAddress) {
      setAddressData({
        ...addressData,
        [name]: value,
      });
    } else {
      setEditingAddress({
        ...editingAddress,
        [name]: value,
      });
    }
  };

  const updateProfile = async () => {
    const result = await post(
      "user/update/details",
      {
        fullName: firstName,
        mobile: mobile,
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

  const cancelOrder = async (id) => {
    const result = await post(
      "user/delete/order",
      {
        id: id,
      },
      headers
    );
    if (result.status) {
      GetDetails();
    }
  };

  const updateNewAddress = async () => {
    const result = await post(
      "user/edit/address",
      {
        id: getAddressId,
        ...editingAddress,
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
  const [updateOrder, setUpdateOrder] = useState([]);

  const openReviewDrawer = (review, order) => {
    setUpdateOrder(order);
    setReviewedFood(review);
    setFoodRatings(review);
    setIsReviewDrawerOpen(true);
  };

  const tabData = [
    { label: "Orders", content: "" },
    { label: "Reservations", content: "Content for Tab 3" },
    { label: "Address", content: "Content for Tab 2" },
    { label: "Profile", content: "Content for Tab 3" },
  ];
  const [editingAddress, setEditingAddress] = useState([]);
  console.log(editingAddress, "editingAddress");




  return (
    <Box bg="gray.200" p={4} minHeight="85vh">
      <Tabs isFitted orientation="vertical" colorScheme="teal" size="lg">
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
          {isLoadingOrders ? (
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
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text fontSize="md" mt="2">
                          Ordered Date:{" "}
                          {convertUTCtoCustomFormat(order.orderedTime)}
                        </Text>
                        {!order.reviewStatus && order.status == "Delivered" ? (
                          <Button
                            onClick={() =>
                              openReviewDrawer(order.review, order)
                            }
                          >
                            Review
                          </Button>
                        ) : (
                          ""
                        )}

                        {order.status == "Out for Delivery" ? (
                          <Button onClick={() => navigate("/track")}>
                            track
                          </Button>
                        ) : (
                          ""
                        )}
{
  !order.status == "Delivered" || "Rejected" ? <Button onClick={() => cancelOrder(order.id)}>
  Cancel Order
</Button> : ""
}
                     
                      </Box>
                    </Box>
                  ))
                )}
              </Box>
            </TabPanel>
          )}
          {isLoadingOrders ? (
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
                {order.length === 0 ? (
                  <Box
                    h="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    minHeight={"80vh"}
                  >
                    <Text fontSize="lg">No Reservation to display</Text>
                  </Box>
                ) : (
                  order.map((order) => (
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
                        <Text fontSize="lg">{order.size}</Text>
                        <Text
                          fontSize="md"
                          mt="2"
                          style={getStatusStylenew(order.status)}
                        >
                          {order.status}
                        </Text>
                      </Box>
                      <Text fontSize="md" mt="2">
                        Name: {order.firstName} {order.lastName}
                      </Text>
                      <Text fontSize="md" mt="2">
                        Reservation ID: {order.id}
                      </Text>
                      <Text fontSize="md" mt="2">
                        Reservation Date: {order.date}
                      </Text>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text fontSize="md" mt="2">
                          Reservation Time: {order.time}
                        </Text>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text fontSize="md" mt="2"></Text>

                        <Box>
                      
                          {
                            order.status === "Pending" ?
                        <>
                            <Button
                            m={"0px 7px"}
                            isDisabled={!order.status === "Pending"}
                            onClick={() => myEditFun(order)}
                          >
                            Edit
                          </Button>
                            <Button
                              onClick={() => DeleteRes(order.id)}
                              m={"0px 7px"}
                            >
                              Cancel Reservation
                            </Button> 
                        </>: ""
                          }

                        </Box>
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
                  <Button
                    variant="outline"
                    float="right"
                    onClick={openAddModal}
                  >
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
                          value={
                            addressData.houseFloor ||
                            (editingAddress ? editingAddress.houseFloor : "")
                          }
                          onChange={handleInputChange}
                          margin={"8px 0px"}
                        />
                        <Input
                          name="buildingBlock"
                          placeholder="Building & Block No.*"
                          value={
                            addressData.buildingBlock ||
                            (editingAddress ? editingAddress.buildingBlock : "")
                          }
                          margin={"8px 0px"}
                          onChange={handleInputChange}
                        />
                        <Input
                          name="landmarkArea"
                          margin={"8px 0px"}
                          placeholder="Landmark & Area Name (Optional)"
                          value={
                            addressData.landmarkArea ||
                            (editingAddress ? editingAddress.landmarkArea : "")
                          }
                          onChange={handleInputChange}
                        />
                        <Select
                          name="addressType"
                          margin={"8px 0px"}
                          placeholder="Select Address Type"
                          value={
                            addressData.addressType ||
                            (editingAddress
                              ? editingAddress.addressType
                              : "home")
                          }
                          onChange={handleInputChange}
                        >
                          <option value="home">Home</option>
                          <option value="office">Office</option>
                          <option value="other">Other</option>
                        </Select>
                      </ModalBody>

                      <ModalFooter>
                        {updateAddress ? (
                          <Button
                            color="black"
                            backgroundColor={"#EFD36D"}
                            mr={3}
                            onClick={updateNewAddress}
                          >
                            Update
                          </Button>
                        ) : (
                          <Button
                            color="black"
                            backgroundColor={"#EFD36D"}
                            mr={3}
                            onClick={saveAddress}
                          >
                            Save
                          </Button>
                        )}

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

                          <Button
                            className="addressEdit"
                            m={"0px 8px"}
                            onClick={() => openEditModal(address, address.id)}
                          >
                            Edit
                          </Button>
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
                <FormLabel>Mobile</FormLabel>
                <Input
                  placeholder="Enter your first name"
                  width="99%"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
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

      <Drawer
        isOpen={isReviewDrawerOpen}
        placement="bottom"
        onClose={() => setIsReviewDrawerOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Review Food Items</DrawerHeader>
          <DrawerBody>
            {reviewedFood.map((food, index) => (
              <Box key={index} p={2}>
                <Text>{food.name}</Text>
                <Box display="flex" justifyContent="space-between">
                  <Text display="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon
                        key={star}
                        as={StarIcon}
                        boxSize="16px"
                        color={
                          star <= foodRatings[food.name]
                            ? "yellow.500"
                            : "gray.500"
                        }
                        ml="2px"
                        onClick={() => handleStarClick(food, star)}
                      />
                    ))}
                  </Text>
                  <Radio value={`notInterested-${index}`}>
                    Not Interested to review
                  </Radio>
                </Box>
              </Box>
            ))}

            <Box
              borderBottom="1px solid #ddd"
              paddingBottom="20px"
              paddingTop="20px"
            >
              <Text>Rate our restaurant</Text>
              <Box display="flex" justifyContent="space-between">
                <Text display="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon
                      key={star}
                      as={StarIcon}
                      boxSize="16px"
                      color={star <= orderRating ? "yellow.500" : "gray.500"}
                      ml="2px"
                      onClick={() => handleStarOrder(star)}
                    />
                  ))}
                </Text>
              </Box>
              <Text>Write review</Text>
              <Textarea
                value={textValue}
                onChange={(event) => {
                  const newText = event.target.value;
                  setTextValue(newText);
                }}
                placeholder="Write a review..."
              />
            </Box>
            <Box display="flex" justifyContent="end">
              <Button
                onClick={() => handleSave()}
                padding="1px 60px"
                margin="15px 0px 10px 0px"
              >
                Save
              </Button>
            </Box>
            {reviewedFood.length === 0 && <Text>No food items to review.</Text>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MyAccountPage;
