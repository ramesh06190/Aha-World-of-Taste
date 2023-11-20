



import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { get, post } from "../api/ApiService";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

function UserDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { date, size, time } = location.state;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [checkoutModelOpen, setCheckoutModelOpen] = useState(false);
  const [validationMessages, setValidationMessages] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const getuserToken = localStorage.getItem("userToken");
  const headers = {
    token: getuserToken,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "dsdsd");
    // Add your validation logic here
    const newValidationMessages = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    };

    if (formData.firstName === "") {
      newValidationMessages.firstName = "First name is required";
    }

    if (formData.lastName === "") {
      newValidationMessages.lastName = "Last name is required";
    }

    if (formData.phone === "") {
      newValidationMessages.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newValidationMessages.phone = "Invalid phone number";
    }

    if (formData.email === "") {
      newValidationMessages.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newValidationMessages.email = "Invalid email address";
    }

    setValidationMessages(newValidationMessages);

    if (
      newValidationMessages.firstName === "" &&
      newValidationMessages.lastName === "" &&
      newValidationMessages.phone === "" &&
      newValidationMessages.email === ""
    ) {
      const postData = {
        date,
        size,
        time,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
      };

      try {
        // Make the API POST request
        const result = await post("user/add/reservation", postData, headers);
        if (result.status) {
          openCheckoutModal()
        }

        // Handle the result, e.g., show a success message
        console.log("API call successful:", result);

        // Set checkoutModelOpen to true to display the success message
        // setCheckoutModelOpen(true);
      } catch (error) {
        // Handle the API request error, e.g., show an error message
        console.error("API call failed:", error);
      }
    }
  };
  const openCheckoutModal = () => {
    setCheckoutModelOpen(true);
  };

  const backReserve = () => {
    navigate("/reservation")
  }

  return (
    <div className="manage-order-container">
      <Box p="4" m="0px 10px">
        <h1 className="completeReservationHeading"> Complete your reservation</h1>
        <h3 className="completeReservationfill">Please Fill in your details:</h3>

        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Text color="red" fontSize="sm">
              {validationMessages.firstName}
            </Text>
          </FormControl>

          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <Text color="red" fontSize="sm">
              {validationMessages.lastName}
            </Text>
          </FormControl>

          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <Text color="red" fontSize="sm">
              {validationMessages.phone}
            </Text>
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Text color="red" fontSize="sm">
              {validationMessages.email}
            </Text>
          </FormControl>

          <FormControl m="10px 0px">
            <Checkbox >Agree to Terms and Conditions</Checkbox>
          </FormControl>

          <Button type="submit" mt="4" w="200px ">
            Submit
          </Button>
        </form>


      </Box>

      {checkoutModelOpen ? (
        <Box className="orderSucess">
          <Box className="sucesscard">
            <Text>your Reservation is successful</Text>
            <Button onClick={backReserve}>Back to Reservation Menu</Button>
          </Box>

        </Box>
      ) : null}
    </div>

  );
}

export default UserDetailPage;
