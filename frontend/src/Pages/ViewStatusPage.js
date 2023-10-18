import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Box,
    Button,
    Heading,
    Text,
    VStack,
    HStack,
    Grid
} from '@chakra-ui/react';

const ViewStatusPage = () => {
    const location = useLocation();
    const { selectedRow } = location.state;
    console.log(selectedRow, "iugog")
    const [orderStatus, setOrderStatus] = useState(selectedRow.status);
    const [buttonStates, setButtonStates] = useState({
        acceptDisabled: false,
        preparedDisabled: true,
        outForDeliveryDisabled: true,
        deliveredDisabled: true,
        cancelDisabled: false,
    });



    const handleStatusChange = (newStatus, disable) => {
        setOrderStatus(newStatus);
        setButtonStates(disable);
    };

    return (
     <Box  minHeight="91.5vh">
           <Box
            bg="#ffffffd4"
            p={4}
            m={4}
            rounded="lg"
            boxShadow="lg"
            w="100%"
            minHeight="50vh"
        >
            <HStack spacing={4} justifyContent={'space-between'} align="start">
                <Heading as="h1" size="xl" mb={4}>
                    View Status Page
                </Heading>
                <Text p="0px 37px">{orderStatus}</Text>
            </HStack>
            {selectedRow && (
                <VStack spacing={4} align="start">
                    <Heading as="h2" size="lg">
                        Order Details
                    </Heading>
                    <Text>Order ID: {selectedRow.orderID}</Text>
                    <Text>Order Received Time: {selectedRow.orderReceivedTime}</Text>
                    <Text>Customer Name: {selectedRow.customerName}</Text>
                    <Text>Order Rate: {selectedRow.orderRate}</Text>
                    <Text>Order Quantity: {selectedRow.orderQuantity}</Text>

                    {/* <HStack spacing={4} align="start">
            {selectedRow?.foodName?.map((foodItem, index) => (
              <Box key={index} borderWidth="1px" p="4" rounded="md" w="250px">
                <Text>Food Name: {foodItem.name}</Text>
                <Text>Quantity: {foodItem.quantity}</Text>
              </Box>
            ))}
          </HStack> */}

                    <Grid templateColumns="repeat(4, 177.5px)" gap={2}>
                        {selectedRow?.foodName?.map((foodItem, index) => (
                            <Box key={index} borderWidth="1px" p="4" rounded="md" borderColor={"black"}>
                                <Text>Food Name: {foodItem.name}</Text>
                                <Text>Quantity: {foodItem.quantity}</Text>
                            </Box>
                        ))}
                    </Grid>

                    <HStack spacing={4} align="start">
                        <Button
                            colorScheme="teal"
                            onClick={() =>
                                handleStatusChange('Order Accepted', {
                                    ...buttonStates,
                                    acceptDisabled: true,
                                    preparedDisabled: false,
                                })
                            }
                            isDisabled={buttonStates.acceptDisabled}
                            w="100%" // Set button width to 100%
                        >
                            Accept Order
                        </Button>

                        <Button
                            colorScheme="blue"
                            onClick={() =>
                                handleStatusChange('Order Prepared', {
                                    ...buttonStates,
                                    preparedDisabled: true,
                                    outForDeliveryDisabled: false,
                                })
                            }
                            isDisabled={buttonStates.preparedDisabled}
                            w="100%" // Set button width to 100%
                        >
                            Order Prepared
                        </Button>

                        <Button
                            colorScheme="orange"
                            onClick={() =>
                                handleStatusChange('Out for Delivery', {
                                    ...buttonStates,
                                    outForDeliveryDisabled: true,
                                    deliveredDisabled: false,
                                })
                            }
                            isDisabled={buttonStates.outForDeliveryDisabled}
                            w="100%" // Set button width to 100%
                        >
                            Out for Delivery
                        </Button>

                        <Button
                            colorScheme="green"
                            onClick={() =>
                                handleStatusChange('Delivered', {
                                    ...buttonStates,
                                    deliveredDisabled: true,
                                    cancelDisabled: true,
                                })
                            }
                            isDisabled={buttonStates.deliveredDisabled}
                            w="100%" // Set button width to 100%
                        >
                            Delivered
                        </Button>

                        <Button
                            colorScheme="red"
                            onClick={() =>
                                handleStatusChange('Order Canceled', {
                                    ...buttonStates,
                                    acceptDisabled: true,
                                    preparedDisabled: true,
                                    outForDeliveryDisabled: true,
                                    deliveredDisabled: true,
                                    cancelDisabled: true,
                                })
                            }
                            isDisabled={buttonStates.cancelDisabled}
                            w="100%" // Set button width to 100%
                        >
                            Cancel Order
                        </Button>
                    </HStack>
                </VStack>
            )}
        </Box>
     </Box>
    );
};

export default ViewStatusPage;
