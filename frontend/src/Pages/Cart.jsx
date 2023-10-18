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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./Cart.css";

function CartPage() {
  const { cart, incrementCartItem, decrementCartItem, removeFromCart } = useCart();
  const totalItemsInCart = cart.reduce((total, item) => total + item.count, 0);

  const [address, setAddress] = useState({
    street: "",
    house: "",
    pincode: "",
  });

console.log(address , "oiuiohihi")

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
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeliveryOptionChange = (option) => {
    setDeliveryOption(option);
  };


  // State for managing the address modal
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const [checkoutModelOpen, setCheckoutModelOpen] = useState(false);

  const openCheckoutModal = () => {
    setCheckoutModelOpen(true);
  };

  const closeCheckoutModal = () => {
    setCheckoutModelOpen(false);
  };

  const openAddressModal = () => {
    setAddressModalOpen(true);
  };

  const closeAddressModal = () => {
    setAddressModalOpen(false);
  };

  // State for managing the address change popup
  const [isChangeAddressPopupOpen, setChangeAddressPopupOpen] = useState(false);

  const openChangeAddressPopup = () => {
    setChangeAddressPopupOpen(true);
  };

  const closeChangeAddressPopup = () => {
    setChangeAddressPopupOpen(false);
  };


  // ... (other code)

  const handleCheckout = () => {
    const selectedAddress = address.street && address.house && address.pincode
      ? `${address.street}, ${address.house}, ${address.pincode}`
      : "No Address Selected";

    const total = calculateTotalPrice() + (deliveryOption === "delivery" ? deliveryCharges : 0);
    openCheckoutModal();

  };

  // Dummy list of addresses
  const [dummyAddresses, setDummyAddresses] = useState([
    {
      street: "123 Main St",
      house: "Apt 4B",
      pincode: "12345",
    },
    {
      street: "456 Elm St",
      house: "Unit 7",
      pincode: "67890",
    },
    {
      street: "789 Oak St",
      house: "Suite 12",
      pincode: "54321",
    },
  ]);


  // State to track the selected address from the list
  const [selectedDummyAddress, setSelectedDummyAddress] = useState({
    street: "",
    house: "",
    pincode: "",
  });

 // State to track the selected address from the list
  const [selectedAddress, setSelectedAddress] = useState(dummyAddresses[0]);

  // State to track the user input for a new address
  const [newAddress, setNewAddress] = useState({
    street: "",
    house: "",
    pincode: "",
  });

  const handleDummyAddressChange = (e) => {
    const index = e.target.value;
    setSelectedDummyAddress(dummyAddresses[index]);
  };
  const handleConfirmAddressChange = () => {
    setDummyAddresses([newAddress, ...dummyAddresses]);
    setSelectedAddress(newAddress);
    setNewAddress({ street: "", house: "", pincode: "" });
    closeChangeAddressPopup();
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
            {deliveryOption === "delivery" && (
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
            {address.street && address.house && address.pincode ? (
              <>
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
                <Text color="green" textAlign="end">
              Address: {address.street}, {address.house},{" "}
              {address.pincode}
            </Text>
                
                <Text color="green" textAlign="end">
              Address: {selectedDummyAddress.street}, {selectedDummyAddress.house},{" "}
              {selectedDummyAddress.pincode}
            </Text>
     
            <Button
                  mt={4}
                  backgroundColor="#EFD36D"
                  onClick={openChangeAddressPopup}
                >
                  Change Address
                </Button>
                <Button backgroundColor="#EFD36D" onClick={handleCheckout}>
                  Submit Order
                </Button>
           
              </>
            ) : (
              <Button backgroundColor="#EFD36D" onClick={openAddressModal}>
                {address.street || address.house || address.pincode
                  ? "Edit Address"
                  : "Add Address"}
              </Button>
            )}
          </VStack>
        </Box>
      </div>

      {/* Address Modal */}
      <Modal isOpen={isAddressModalOpen} onClose={closeAddressModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Address Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              name="street"
              borderColor="black"
              placeholder="Enter Street Address"
              value={address.street}
              onChange={handleAddressChange}
            />
            <Input
              name="house"
              borderColor="black"
              placeholder="Enter House No"
              value={address.house}
              onChange={handleAddressChange}
            />
            <Input
              name="pincode"
              borderColor="black"
              placeholder="Enter Pincode"
              value={address.pincode}
              onChange={handleAddressChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button backgroundColor="#EFD36D" onClick={closeAddressModal}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Change Address Popup */}
      <Modal isOpen={isChangeAddressPopupOpen} onClose={closeChangeAddressPopup}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Select from the following addresses:</Text>
            <Select
              placeholder="Select an address"
              onChange={handleDummyAddressChange}
            >
              {dummyAddresses.map((dummyAddress, index) => (
                <option key={index} value={index}>
                  {dummyAddress.street}, {dummyAddress.house}, {dummyAddress.pincode}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button backgroundColor="#EFD36D" onClick={closeChangeAddressPopup}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={checkoutModelOpen} onClose={closeCheckoutModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Successful</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Your order has been placed successfully!</Text>
            <Text>Delivery Option: {deliveryOption === "pickup" ? "Pickup" : "Delivery"}</Text>
            <Text>Address: {selectedDummyAddress.street}, {selectedDummyAddress.house}, {selectedDummyAddress.pincode}</Text>
            <Text>Total Price: ${(calculateTotalPrice() + (deliveryOption === "delivery" ? deliveryCharges : 0)).toFixed(2)}</Text>
          </ModalBody>
          <ModalFooter>
            <Button backgroundColor="#EFD36D" onClick={closeCheckoutModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default CartPage;
