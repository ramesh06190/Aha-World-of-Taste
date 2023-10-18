import React, { useEffect, useState } from "react";
import { post, get } from "../api/ApiService";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Spacer,
  VStack,
  Text,
  useToast,
  Select,
  Box, // Import the Select component
} from "@chakra-ui/react";
import "./AdminAddMenu.css";
import axios from "axios";
function AddItemForm() {
  const [ImageFile, setImageFile] = useState("");
  const [item, setItem] = useState({
    foodName: "",
    category: "", // Initialize category with an empty string
    price: "",
    description: "",
    image: "",
  });
  const [AdminToken, setAdminToken] = useState("");
  const [AdminDish, setAdminDish] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const headers = {
    token: AdminToken,
  };
  const uploadImage = async (e) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    let u = await axios.post(
      `http://localhost:8090/api/upload/image`,
      formData
    );

    if (u.data.status) {
      setImageFile(u.data.secureUrl);
      setLoading(false);
    } else {
      setLoading(false);
    }
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
    position: "top",
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

  useEffect(() => {
    const Token = localStorage.getItem("adminToken");
    setAdminToken(Token);
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      const result = await get("api/all/category");
      setCategory(result.data);
    };
    getCategory();
  }, []);

  const handleAddItem = async () => {
    if (validateForm()) {
      let payload = { ...item };
      payload.image = ImageFile;

      // Display form validation errors in the UI
      try {
        // Make a POST request to your API with the item data
        const result = await post("api/add/dish", { ...payload }, headers);
        if (result.status) {
          // Clear the form fields
          setItem({
            foodName: "",
            category: "",
            price: "",
            description: "",
          });

          // Display a success message
          toast({
            title: "Item Added Successfully",
            status: "success",
            ...defaultToastConfig,
          });
        }
      } catch (error) {
        toast({
          title: "Login Error",
          description: error?.response?.data?.message,
          status: "error",
          ...defaultToastConfig,
        });
      }
    }
  };

  // Dummy category values
  // const dummyCategories = ["Category 1", "Biriyani", "Category 3"];

  return (
    <div className="addmenu-con">
      <Flex
        direction="column"
        w="100%"
        maxW="md"
        p={4}
        borderWidth={1}
        borderRadius="md"
      >
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
            {/* Use a Select element for category with options from dummyCategories */}
            <Select
              name="category"
              value={item.category}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select a category
              </option>
              {category.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </FormControl>
          {formErrors.category && (
            <Text color="red.500">Item category is required</Text>
          )}
        </VStack>
        <Spacer />
        <FormControl isRequired isInvalid={formErrors.image}>
          <FormLabel>Item Image</FormLabel>
          {/* Add an input element of type "file" for image upload */}
          <Box
            as="label" // Use a label element to style the file input
            backgroundColor="#EFD36D" // Set the background color
            color="white" // Set the text color
            borderRadius="md"
            padding={2}
            cursor="pointer"
            _hover={{
              backgroundColor: "#FFC107", // Change the background color on hover
            }}
          >
            {loading ? (
              <span className="loadingg">loading</span>
            ) : (
              "Choose File"
            )}

            <Input
              type="file"
              accept="image/*"
              name="image"
              onChange={uploadImage}
              display="none" // Hide the actual file input
            />
          </Box>
          {item.image && (
            <Text mt={2} fontSize="sm">
              Selected File: {item.image.name}
            </Text>
          )}
        </FormControl>

        <Button mt={4} onClick={handleAddItem} backgroundColor="#EFD36D">
          Add Item
        </Button>
      </Flex>
    </div>
  );
}

export default AddItemForm;
