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
    Input
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

    const tabData = [
        { label: 'Orders', content: '' },
        { label: 'Address', content: 'Content for Tab 2' },
        { label: 'Profile', content: 'Content for Tab 3' },
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
                        <Box height="85vh" display="flex" justifyContent="center" alignItems="center">
                            <Text>No Orders for now</Text>
                        </Box>

                    </TabPanel>
                    <TabPanel key={2} p={4} bg="white" boxShadow="lg">
                        <Box height="85vh" display="flex" justifyContent="center" alignItems="center">
                            <Text>No Saved Address</Text>
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
