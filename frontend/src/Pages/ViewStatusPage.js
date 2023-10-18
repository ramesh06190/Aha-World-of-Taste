import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
} from "@chakra-ui/react";
import { post } from "../api/ApiService";

const ViewStatusPage = () => {
  const location = useLocation();
  const { selectedRow } = location.state;
  const [orderStatus, setOrderStatus] = useState(selectedRow.status);
  const [buttonStates, setButtonStates] = useState({
    acceptDisabled: false,
    preparedDisabled: true,
    outForDeliveryDisabled: true,
    deliveredDisabled: true,
    cancelDisabled: false,
  });

  const handleStatusChange = async (newStatus, disable) => {
    const result = await post("admin/update/order", {
      id: selectedRow.id,
      status: newStatus,
    });
    if (result.status) {
      setOrderStatus(newStatus);
      setButtonStates(disable);
    }
  };

  return (
    <Box minHeight="91.5vh">
      <Box
        bg="#ffffffd4"
        p={4}
        m={4}
        rounded="lg"
        boxShadow="lg"
        w="100%"
        minHeight="45vh"
      >
        <HStack spacing={4} justifyContent={"space-between"} align="start">
          <Heading as="h1" size="xl" mb={4}>
            View Status Page
          </Heading>
          {
            orderStatus === "Pending"?      <Text p="0px 3px"  m=" 0px 10px"backgroundColor={"orange"} borderRadius={"5px"}>{orderStatus}</Text> : <Text p="0px 37px" color={"black"}>{orderStatus}</Text> 
          }
     
        </HStack>
        {selectedRow && (
          <VStack spacing={4} align="start">
            <Heading as="h2" size="lg">
              Order Details
            </Heading>
            <Text>Order ID: {selectedRow.id}</Text>
            <Text>Order Received Time: {selectedRow.createdAt}</Text>
            <Text>Customer Name: {selectedRow.fullName}</Text>
            <Text>Order Rate: {selectedRow.totalOrderPrice}</Text>
            <Text>Order Quantity: {selectedRow.totalOrderQuantity}</Text>

            <Grid templateColumns="repeat(4, 177.5px)" gap={2}>
              {selectedRow?.foodName?.map((foodItem, index) => (
                <Box
                  key={index}
                  borderWidth="1px"
                  p="4"
                  rounded="md"
                  borderColor={"black"}
                >
                  <Text>Food Name: {foodItem.name}</Text>
                  <Text>Quantity: {foodItem.quantity}</Text>
                </Box>
              ))}
            </Grid>

            <HStack spacing={4} align="start">
              <Button
                colorScheme="teal"
                onClick={() =>
                  handleStatusChange("Order Accepted", {
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
                  handleStatusChange("Order Prepared", {
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
                  handleStatusChange("Out for Delivery", {
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
                  handleStatusChange("Delivered", {
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
                  handleStatusChange("Order Canceled", {
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
