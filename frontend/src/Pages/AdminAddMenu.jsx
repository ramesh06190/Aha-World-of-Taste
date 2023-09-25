import React, { useEffect, useState } from "react";
import {post} from "../api/ApiService"
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Spacer,
  VStack,
  Text,
  useToast
} from "@chakra-ui/react";
import "./AdminAddMenu.css";

function AddItemForm() {
  const [item, setItem] = useState({
    foodName: "",
    category: "",
    price: "",
    description: ""
  });
const [AdminToken , setAdminToken] = useState("")
const [AdminDish, setAdminDish] = useState([]);
console.log(AdminDish , "oigoig")

  const toast = useToast();

  const headers = {
    token: AdminToken,
  };

  const [formErrors, setFormErrors] = useState({
    foodName: false,
    description: false,
    price: false,
    category: false,
  });

  const defaultToastConfig = {
    duration: 2000,
    isClosable: true,
    position: 'top',
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
    // Clear the error for the field when the user starts typing
    setFormErrors({ ...formErrors, [name]: false });
  };

  const validateForm = () => {
    const newFormErrors = {};

    // Check for empty fields
    if (!item.foodName) {
      newFormErrors.foodName = true;
    }

    if (!item.description) {
      newFormErrors.description = true;
    }

    if (!item.price) {
      newFormErrors.price = true;
    }
    if (!item.category) {
        newFormErrors.category = true;
      }
    setFormErrors(newFormErrors);

    return Object.values(newFormErrors).every((error) => !error);
  };

useEffect(()=>{
    const Token = localStorage.getItem("adminToken")
    setAdminToken(Token)
} , [])

  const handleAddItem = async () => {
    if (validateForm()) {
      // Display form validation errors in the UI
      try {
        // Make a POST request to your API with the item data
        const result = await post('api/add/dish', item , headers);
        if (result.status) {
          // Clear the form fields
          setItem({
            foodName: "",
            category: "",
            price: "",
            description: ""
          });
  
          // Display a success message
          toast({
            title: "Item Added Successfully",
            status: "success",
            ...defaultToastConfig
          });
        } 
      } catch (error) {
        console.log(error, "oihihih")
        toast({
            title: 'Login Error',
            description: error?.response?.data?.message,
            status: 'error',
            ...defaultToastConfig,
        });
    }
    }

 
  };

  return (
    <div className="addmenu-con">
      <Flex direction="column" w="100%" maxW="md" p={4} borderWidth={1} borderRadius="md">
        <VStack spacing={4} align="stretch">
          <FormControl isRequired isInvalid={formErrors.foodName}>
            <FormLabel>Item Name</FormLabel>
            <Input
              type="text"
              name="foodName"
              value={item.foodName}
              onChange={handleInputChange}
            />
          </FormControl>
          {formErrors.foodName && (
            <Text color="red.500">Item Name is required</Text>
          )}
          <FormControl isRequired isInvalid={formErrors.description}>
            <FormLabel>Item Description</FormLabel>
            <Input
              type="text"
              name="description"
              value={item.description}
              onChange={handleInputChange}
            />
          </FormControl>
          {formErrors.description && (
            <Text color="red.500">Item Description is required</Text>
          )}
          <FormControl isRequired isInvalid={formErrors.price}>
            <FormLabel>Item Price</FormLabel>
            <Input
              type="number"
              name="price"
              value={item.price}
              onChange={handleInputChange}
            />
          </FormControl>
          {formErrors.price && (
            <Text color="red.500">Item Price is required</Text>
          )}

<FormControl isRequired isInvalid={formErrors.category}>
            <FormLabel>Item category</FormLabel>
            <Input
              type="text"
              name="category"
              value={item.category}
              onChange={handleInputChange}
            />
          </FormControl>
          {formErrors.category && (
            <Text color="red.500">Item category is required</Text>
          )}
        </VStack>
        <Spacer />
        <Button mt={4} onClick={handleAddItem} backgroundColor="#EFD36D">
          Add Item
        </Button>
      </Flex>
    </div>
  );
}

export default AddItemForm;
