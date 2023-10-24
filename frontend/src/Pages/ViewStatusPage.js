import React, { useEffect, useState } from "react";
import { get } from "../api/ApiService";
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
    acceptDisabled: orderStatus !== "Pending" && orderStatus !== "Order Canceled",
    preparedDisabled: orderStatus !== "Order Accepted" && orderStatus !== "Order Canceled",
    outForDeliveryDisabled: orderStatus !== "Order Prepared" && orderStatus !== "Order Canceled",
    deliveredDisabled: orderStatus === "Order Accepted" || orderStatus === "Pending" || orderStatus === "Delivered" || orderStatus === "Order Canceled",
    cancelDisabled: orderStatus === "Delivered" || orderStatus === "Order Canceled",
  });

  



  if (orderStatus === "Order Canceled") {
    buttonStates.acceptDisabled = true;
    buttonStates.preparedDisabled = true;
    buttonStates.outForDeliveryDisabled = true;
    buttonStates.deliveredDisabled = true;
    buttonStates.cancelDisabled = true;
  }



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


  function getStatusStyle(status) {
    switch (status) {
      case 'Pending':
        return { backgroundColor: 'orange' , color: "white" , padding:"2px 8px" , borderRadius:"5px"}; 
      case 'Order Accepted':
        return { backgroundColor: 'green' , color: "white" , padding:"2px 8px" , borderRadius:"5px" }; 
      case 'Order Prepared':
        return { backgroundColor: 'blue' , color: "white" , padding:"2px 8px" , borderRadius:"5px" };
      case 'Out for Delivery':
        return { backgroundColor: 'purple' , color: "white" , padding:"2px 8px" , borderRadius:"5px" }; 
      case 'Delivered':
        return { backgroundColor: 'lime' , color: "black" , padding:"2px 8px" , borderRadius:"5px" }; 
      case 'Order Canceled':
        return { backgroundColor: 'red' , color: "white" , padding:"2px 8px" , borderRadius:"5px"}; 
      default:
        return {}; 
    }
  }

  return (
    <Box minHeight="91.5vh">


      <Box
        bg="#ffffffd4"
        p={4}
        m={4}
        rounded="lg"
        boxShadow="lg"
        w="100%"
        minHeight="38vh"
      >

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

            <HStack spacing={4} align="start" >
              <HStack>
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
              <HStack display="flex" width={500} justifyContent="space-around">
                <HStack>
                  <Heading as="h1" size="xl">
                    Order Status
                  </Heading>
                </HStack>
                <HStack>
                  {/* {
                    orderStatus === "Pending" ? <Text backgroundColor={"orange"} borderRadius={"5px"}>{orderStatus}</Text> : <Text p="0px 37px" color={"black"}>{orderStatus}</Text>
                  }
                  style={getStatusStyle(orderStatus)} */}

                  <Text fontSize="md" mt="2" style={getStatusStyle(orderStatus)}>
              {orderStatus}
            </Text>
                </HStack>
              </HStack>
            </HStack>

          </VStack>

        )}




      </Box>

    </Box>
  );
};

export default ViewStatusPage;
