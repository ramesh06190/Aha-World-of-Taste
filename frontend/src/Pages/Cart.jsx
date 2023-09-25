import React, { useState } from "react";
import { useCart } from "../Pages/CartContext";
import {
  Box,
  Text,
  Button,
  Flex,
  VStack,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./Cart.css";

function CartPage() {
  const { cart, incrementCartItem, decrementCartItem, removeFromCart } = useCart();
  const [address, setAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState("pickup");
  const deliveryCharges = 5.99;

  const calculateTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.count;
    });
    return total;
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleDeliveryOptionChange = (option) => {
    setDeliveryOption(option);
  };

  const handleCheckout = () => {
    alert(
      `Delivery Option: ${
        deliveryOption === "pickup" ? "Pickup" : "Delivery"
      }\nAddress: ${address}\nTotal Price: ${
        calculateTotalPrice() + (deliveryOption === "delivery" ? deliveryCharges : 0)
      }`
    );
  };

  return (
    <div className="cart-container">
      <div className="cart-con-card">
        <Box p={4}>
          <VStack spacing={4} align="stretch">
            <Text fontSize="xl" fontWeight="bold" textAlign="left">
              Order Summary
            </Text>
            <Flex align="stretch">
              <Button
                colorScheme={deliveryOption === "pickup" ? "#EFD36D" : "gray"}
                variant="outline"
                width="50%"
                onClick={() => handleDeliveryOptionChange("pickup")}
              >
                Pickup
              </Button>
              <Button
                width="50%"
                ml={4}
                colorScheme={deliveryOption === "delivery" ? "#EFD36D" : "gray"}
                variant="outline"
                onClick={() => handleDeliveryOptionChange("delivery")}
              >
                Delivery
              </Button>
            </Flex>
            {cart.map((item) => (
              <Box
                key={item.id}
                borderWidth="1px"
                borderRadius="lg"
                borderColor="black"
                p={4}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Flex alignItems="center">
                  <Text>{item.foodName}</Text>
                  <Text color="red" ml={4}>
                    $ {item.price * item.count}
                  </Text>
                </Flex>
                <Flex alignItems="center">
                  <IconButton
                    icon={<FaMinus />}
                    aria-label="Decrement"
                    onClick={() => {
                      decrementCartItem(item.id);
                      setTotalPrice(calculateTotalPrice());
                    }}
                  />
                  {item.count}
                  <IconButton
                    icon={<FaPlus />}
                    aria-label="Increment"
                    borderColor="black"
                    onClick={() => {
                      incrementCartItem(item.id);
                      setTotalPrice(calculateTotalPrice());
                    }}
                  />
                  <Button
                    ml={4}
                    colorScheme="red"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </Flex>
              </Box>
            ))}
            {deliveryOption === "delivery" && ( // Conditionally render delivery charges
              <Box
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                borderColor="black"
                textAlign="end"
              >
                <Text>Delivery Charges: ${deliveryCharges.toFixed(2)}</Text>
              </Box>
            )}
            <Box
              textAlign="end"
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              borderColor="black"
            >
              <Text color="red">
                Total Price: $
                {(
                  calculateTotalPrice() +
                  (deliveryOption === "delivery" ? deliveryCharges : 0)
                ).toFixed(2)}
              </Text>
            </Box>
            <Input
              borderColor="black"
              placeholder="Enter Address"
              value={address}
              onChange={handleAddressChange}
            />
                <Input
              borderColor="black"
              placeholder="House No / Street"
              value={address}
              onChange={handleAddressChange}
            />
                <Input
              borderColor="black"
              placeholder="Pincode"
              value={address}
              onChange={handleAddressChange}
            />
            <Button backgroundColor='#EFD36D' onClick={handleCheckout}>
              Submit Order
            </Button>
          </VStack>
        </Box>
      </div>
    </div>
  );
}

export default CartPage;
