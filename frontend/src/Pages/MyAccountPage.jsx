import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'

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
    ListIcon
} from '@chakra-ui/react';

const MyAccountPage = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (index) => {
        setSelectedTab(index);
    };
    const navigate = useNavigate();
    const handleLogOutModal = () => {
        // setChildData(false);
        navigate("/")
        localStorage.clear();
        window.location.reload();

    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addressData, setAddressData] = useState({
      houseFloor: '',
      buildingBlock: '',
      landmarkArea: '',
      addressType: 'home',
    });
    const [savedAddresses, setSavedAddresses] = useState([]);
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setAddressData({
        ...addressData,
        [name]: value,
      });
    };
  
    const saveAddress = () => {
      const newAddress = `${addressData.houseFloor}, ${addressData.buildingBlock}, ${addressData.landmarkArea}, ${addressData.addressType}`;
      setSavedAddresses([...savedAddresses, newAddress]);
      setAddressData({
        houseFloor: '',
        buildingBlock: '',
        landmarkArea: '',
        addressType: 'home',
      });
      closeModal();
    };

    const tabData = [
        { label: 'Orders', content: '' },
        { label: 'Address', content: 'Content for Tab 2' },
        { label: 'Profile', content: 'Content for Tab 3' },
    ];

    const orders = [
        {
            id: 1,
            foodName: "Pizza",
            rate: 12.99,
            orderId: "ABC123",
            orderedTime: "2023-10-15 14:30",
            status: "Pending",
        },
        {
            id: 2,
            foodName: "Burger",
            rate: 6.99,
            orderId: "XYZ789",
            orderedTime: "2023-10-15 15:45",
            status: "Delivered",
        },
        {
            id: 3,
            foodName: "Salad",
            rate: 8.99,
            orderId: "DEF456",
            orderedTime: "2023-10-15 16:15",
            status: "Cancelled",
        },
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
                            bg={selectedTab === index ? '#EFD36D' : 'gray.200'}
                            _hover={{ bg: '#EFD36D', color: 'white' }}
                            color={selectedTab === index ? 'white' : 'Black'}
                        >
                            {tab.label}
                        </Tab>

                    ))}
                    <NavLink to={"/"}> <Button colorScheme='red' width="90%" onClick={handleLogOutModal}>
                        Logout
                    </Button> </NavLink>
                </TabList>
                <TabPanels>

                    <TabPanel key={1} p={4} bg="white" boxShadow="lg">
                        <Box minHeight={"86vh"}>
                            {orders.map((order) => (
                                <Box
                                    key={order.id}
                                    w="100%"
                                    h="150px"
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

                                        >
                                            {order.status}
                                        </Text>
                                    </Box>
                                    <Text fontSize="md" mt="2">
                                        Rate: ${order.rate}
                                    </Text>
                                    <Text fontSize="md" mt="2">
                                        Order ID: {order.orderId}
                                    </Text>
                                    <Text fontSize="md" mt="2">
                                        Ordered Time: {order.orderedTime}
                                    </Text>
                                </Box>
                            ))}
                        </Box>
                    </TabPanel>

                    <TabPanel key={2} p={4} bg="white" boxShadow="lg">
                        <Box height="86vh" >
                        <Box p={4}>
        <Text fontSize="2xl" fontWeight="bold">All Saved Addresses</Text>
        <Button
          variant="outline"
          float="right"
          onClick={openModal}
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
          {savedAddresses.map((address, index) => (
            <ListItem key={index} display="flex" alignItems="center" p={2} m={"15px 2px"} border={"1px" } borderColor="black" borderRadius={5}>
              <ListIcon  color="green.500" />
              <Box flex="1">
                <Text fontWeight="bold">Address Type: {addressData.addressType}</Text>
                <Text>{address}</Text>
              </Box>
              <IconButton
                colorScheme="red"
                aria-label="Delete"
                // icon={<CloseIcon />}
                onClick={() => {
                  const newAddresses = savedAddresses.filter((_, i) => i !== index);
                  setSavedAddresses(newAddresses);
                }}
              />
            </ListItem>

            
          ))}

          
        </List>
      </Box>
                        </Box>

                    </TabPanel>
                    <TabPanel key={3} p={4} bg="white" boxShadow="lg">
                        <Box height="85vh" width="100%" margin="10px">
                            <FormControl>
                                <FormLabel>First Name</FormLabel>
                                <Input placeholder="Enter your first name" width="99%" margin="10px 0px" />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input placeholder="Enter your email" width="99%" margin="10px 0" isDisabled />
                            </FormControl>

                            <Button backgroundColor="#EFD36D" color="black" marginTop="10px">
                                Update
                            </Button>
                        </Box>
                    </TabPanel>

                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default MyAccountPage;
