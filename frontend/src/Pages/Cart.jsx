import React, { useState, useEffect } from "react";
import { useCart } from "../Pages/CartContext";
import { get, post } from "../api/ApiService";
import SucessGif from "../assets/sucess.gif"
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
  const { cart, incrementCartItem, decrementCartItem, removeFromCart, fetchUserDetails } =
    useCart();
  const getuserToken = localStorage.getItem("userToken");
  const headers = {
    token: getuserToken,
  };
  const [dummyAddresses, setDummyAddresses] = useState([]);
  const [address, setAddress] = useState({
    houseFloor: "",
    buildingBlock: "",
    landmarkArea: "",
    addressType: "home",
  });
  useEffect(() => {
    GetDetails();
  }, []);
  const GetDetails = async () => {
    const result = await get("user/my/order", {}, headers);
    if (result.status) {
      setDummyAddresses(result?.data?.user?.addresses);
    }
  };

  const saveAddress = async () => {
    const result = await post(
      "user/add/address",
      {
        ...address,
      },
      headers
    );
    if (result.status) {
      GetDetails();
      setAddressModalOpen(false);
 
    }
    // closeModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const [totalPrice, setTotalPrice] = useState(0);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("pickup");
  const deliveryCharges = 5.99;

  const calculateTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.count;
    });
    return total;
  };


  const userId = localStorage.getItem("userId");
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

  const closeChangeAddressPopupNew = () => {

    closeAddressModal();

  }
  // ... (other code)

  const handleCheckout = async () => {
    const payload = {
      order: cart,
      address: address,
    };
    const result = await post("user/add/order", payload, headers);
    if (result.status) {
      GetDetails();
      openCheckoutModal();
      setShowOrderSuccess(true);
      fetchUserDetails()
    }

  };

  const saveaddressandclose = () => {
    closeAddressModal();
    saveAddress();
    GetDetails()
  }

  // Dummy list of addresses

  // State to track the selected address from the list
  const [selectedDummyAddress, setSelectedDummyAddress] = useState({
    street: "",
    house: "",
    pincode: "",
  });



  const handleDummyAddressChange = (e) => {
    const index = e.target.value;
    setSelectedDummyAddress(dummyAddresses[index]);
    setAddress(dummyAddresses[index]);
  };


  return (
    <div className="cart-container">
         {cart.length === 0 ? ( // Check if the cart is empty
        <div className="cart-con-card-empty">
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            Your cart is empty.
          </Text>
        </div>
      ) :
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
            {address.houseFloor &&
              address.buildingBlock &&
              address.landmarkArea ? (
              <>

                <Text color="green" textAlign="end" fontSize="lg" fontWeight="bold">
                  Address: {address.houseFloor}, {address.buildingBlock},{" "}
                  {address.landmarkArea}
                </Text>


                {dummyAddresses.length === 0 ? "" : (
                  <>
                    <div className="changeaddresscon">
                      <button
                        className="changeAddressbtn"
                        onClick={openChangeAddressPopup}
                      >
                        Change Address
                      </button>
                    </div>
                  </>
                )}

                <Button backgroundColor="#EFD36D" onClick={handleCheckout}>
                  Submit Order
                </Button>
              </>
            ) : (
              <Button backgroundColor="#EFD36D" onClick={openAddressModal}>
               Add Address
              </Button>
            )}
          </VStack>
        </Box>
      </div>
}
      {/* Address Modal */}
      <Modal isOpen={isAddressModalOpen} onClose={closeAddressModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Address Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              margin={"6px 0px"}
              name="houseFloor"
              borderColor="black"
              placeholder="Enter Street Address"
              value={address.houseFloor}
              onChange={handleInputChange}
            />
            <Input
              margin={"6px 0px"}
              name="buildingBlock"
              borderColor="black"
              placeholder="Enter House No"
              value={address.buildingBlock}
              onChange={handleInputChange}
            />
            <Input
              margin={"6px 0px"}
              name="landmarkArea"
              borderColor="black"
              placeholder="Enter Pincode"
              value={address.landmarkArea}
              onChange={handleInputChange}
            />
            <Select
              name="addressType"
              placeholder="Select Address Type"
              value={address.addressType}
              onChange={handleInputChange}
            >
              <option value="home">Home</option>
              <option value="office">Office</option>
              <option value="other">Other</option>
            </Select>
            <Button backgroundColor="#EFD36D" onClick={saveaddressandclose}>
              Save & Confirm
            </Button>

            {dummyAddresses.length === 0 ? "" : (
              <>
                <Text>OR</Text>
                <Text>Select from the following addresses:</Text>
                <Select
                  placeholder="Select an address"
                  onChange={handleDummyAddressChange}
                >
                  {dummyAddresses.map((dummyAddress, index) => (
                    <option key={index} value={index}>
                      {dummyAddress.houseFloor}, {dummyAddress.buildingBlock},{" "}
                      {dummyAddress.landmarkArea}
                    </option>
                  ))}
                </Select>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button backgroundColor="#EFD36D" onClick={closeChangeAddressPopupNew}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Change Address Popup */}
      <Modal
        isOpen={isChangeAddressPopupOpen}
        onClose={closeChangeAddressPopup}
      >
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
                  {dummyAddress.houseFloor}, {dummyAddress.buildingBlock},{" "}
                  {dummyAddress.landmarkArea}
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
      {/* isOpen={} onClose={closeCheckoutModal} */}
      {
        checkoutModelOpen ? <div className="orderSucess" >

          <div className="sucesscard">
            <img src={SucessGif} alt="" />
            <p>Your order has been placed successfully!</p>
            <p>Delivery Option: {deliveryOption === "pickup" ? "Pickup" : "Delivery"}</p>
            <p>         Total Price: $
              {(
                calculateTotalPrice() +
                (deliveryOption === "delivery" ? deliveryCharges : 0)
              ).toFixed(2)}</p>
            <Button backgroundColor="#EFD36D" onClick={closeCheckoutModal}>
              Close
            </Button>
          </div>
        </div> : ""

      }


    </div>
  );
}

export default CartPage;
