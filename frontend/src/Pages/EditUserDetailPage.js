import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Text,
  Select, // Add Select component for dropdown
} from "@chakra-ui/react";
import { useNavigate , useLocation } from "react-router-dom";
import { get, post } from "../api/ApiService";

function EditUserDetailPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const { myVal } = location.state || {};
  console.log(myVal , "myVal")
  const [formData, setFormData] = useState({
    firstName: myVal.firstName,
    lastName: myVal.lastName,
    phone: myVal.phone,
    email: myVal.email,
    partySize: myVal.size, 
    date: myVal.date, 
    time: myVal.time, 
  });



  const [validationMessages, setValidationMessages] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    partySize: "",
    date: "",
    time: "",
  });

  const [checkoutModelOpen, setCheckoutModelOpen] = useState(false);

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

    const newValidationMessages = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      partySize: "", 
      date: "",
      time: "", 
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

    if (formData.partySize === "") {
      newValidationMessages.partySize = "Party size is required";
    }

    if (formData.date === "") {
      newValidationMessages.date = "Date is required";
    }

    if (formData.time === "") {
      newValidationMessages.time = "Time is required";
    }

    setValidationMessages(newValidationMessages);

    if (
      newValidationMessages.firstName === "" &&
      newValidationMessages.lastName === "" &&
      newValidationMessages.phone === "" &&
      newValidationMessages.email === "" &&
      newValidationMessages.partySize === "" &&
      newValidationMessages.date === "" &&
      newValidationMessages.time === ""
    ) {
      const postData = {
        id: myVal.id,
        date: formData.date,
        size: formData.partySize,
        time: formData.time,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
      };

      try {
        const result = await post("user/edit/reservation", postData, headers);
        if (result.status) {
          openCheckoutModal();
        }

        console.log("API call successful:", result);
      } catch (error) {
        console.error("API call failed:", error);
      }
    }
  };

  const openCheckoutModal = () => {
    setCheckoutModelOpen(true);
  };

  const backReserve = () => {
    navigate("/reservation");
  };

  return (
    <div className="manage-order-container">
      <Box p="4" m="0px 10px">
        <h1 className="completeReservationHeading">Complete your reservation</h1>
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

 
          <FormControl>
            <FormLabel>Party Size</FormLabel>
            <Select
              name="partySize"
              value={formData.partySize}
              onChange={handleChange}
            >
                <option value="Guest1">1 Guest </option>
              <option value="Guest2">2 Guest</option>
              <option value="Guest3">3 Guest</option>
              <option value="Guest4">4 Guest</option>
              <option value="Guest4+">4+ Guest</option>
              {/* Add more options as needed */}
            </Select>
            <Text color="red" fontSize="sm">
              {validationMessages.partySize}
            </Text>
          </FormControl>

          {/* Date Input */}
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            <Text color="red" fontSize="sm">
              {validationMessages.date}
            </Text>
          </FormControl>

          {/* Time Input */}
          <FormControl>
            <FormLabel>Time</FormLabel>
            <Select
              name="time"
              value={formData.time}
              onChange={handleChange}
            >
              <option value="1">{formData.time}</option>
              <option value="Guest1">9.00am</option>
              <option value="Guest2">10.00am</option>
              <option value="Guest3">11.00am</option>
              <option value="Guest4">12.00am</option>
              <option value="Guest4+">01.00pm</option>
              <option value="Guest1">02.00pm</option>
              <option value="Guest2">03.00pm</option>
              <option value="Guest3">04.00pm</option>
              <option value="Guest4">06.00pm</option>
              <option value="Guest4+">07.00pm</option>
              <option value="Guest4+">08.00pm</option>
              <option value="Guest1">09.00pm</option>
              <option value="Guest2">10.00pm</option>
              <option value="Guest3">11.00pm</option>
        
              {/* Add more options as needed */}
            </Select>
            <Text color="red" fontSize="sm">
              {validationMessages.time}
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

      {/* Checkout Success Modal */}
      {checkoutModelOpen ? (
        <Box className="orderSucess">
          <Box className="sucesscard">
            <Text>Your Reservation is Updated</Text>
            <Button onClick={backReserve}>Back to Reservation Menu</Button>
          </Box>
        </Box>
      ) : null}
    </div>
  );
}

export default EditUserDetailPage;
