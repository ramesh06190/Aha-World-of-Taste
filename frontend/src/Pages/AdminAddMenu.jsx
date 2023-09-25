import React, { useState } from "react";
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
import "./AdminAddMenu.css"
function AddItemForm() {
    const [item, setItem] = useState({
        Item_Name: "",
        Item_Description: "",
        Item_Price: "",
    });
    const toast = useToast();
    const [formErrors, setFormErrors] = useState({
        Item_Name: false,
        Item_Description: false,
        Item_Price: false,
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

    const handleAddItem = () => {
        let hasErrors = false;
        const newFormErrors = {};

        // Check for empty fields
        if (!item.Item_Name) {
            newFormErrors.Item_Name = true;
            hasErrors = true;
        }

        if (!item.Item_Description) {
            newFormErrors.Item_Description = true;
            hasErrors = true;
        }

        if (!item.Item_Price) {
            newFormErrors.Item_Price = true;
            hasErrors = true;
        }

        setFormErrors(newFormErrors);

        if (hasErrors) {
            // Display form validation errors in the UI
            return;
        }

        toast({
            title: "Item Added Successfully",
            status: "success",
            ...defaultToastConfig
        });

        // Clear the form fields
        setItem({
            Item_Name: "",
            Item_Description: "",
            Item_Price: "",
        });


    };

    return (
        <div className="addmenu-con">
            <Flex direction="column" w="100%" maxW="md" p={4} borderWidth={1} borderRadius="md">
                <VStack spacing={4} align="stretch">
                    <FormControl isRequired isInvalid={formErrors.Item_Name}>
                        <FormLabel>Item Name</FormLabel>
                        <Input
                            type="text"
                            name="Item_Name"
                            value={item.Item_Name}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    {formErrors.Item_Name && (
                        <Text color="red.500">Item Name is required</Text>
                    )}
                    <FormControl isRequired isInvalid={formErrors.Item_Description}>
                        <FormLabel>Item Description</FormLabel>
                        <Input
                            type="text"
                            name="Item_Description"
                            value={item.Item_Description}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    {formErrors.Item_Description && (
                        <Text color="red.500">Item Description is required</Text>
                    )}
                    <FormControl isRequired isInvalid={formErrors.Item_Price}>
                        <FormLabel>Item Price</FormLabel>
                        <Input
                            type="text"
                            name="Item_Price"
                            value={item.Item_Price}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    {formErrors.Item_Price && (
                        <Text color="red.500">Item Price is required</Text>
                    )}
                </VStack>
                <Spacer />
                <Button mt={4} colorScheme="teal" onClick={handleAddItem}>
                    Add Item
                </Button>
            </Flex>

        </div>
    );
}

export default AddItemForm;
