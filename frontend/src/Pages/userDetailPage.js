import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { get, post } from "../api/ApiService";

function UserDetailPage() {
  const location = useLocation();
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
          console.log(result);
          alert("successfully reserved");
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

  return (
    <div className="admin-chat-con">
      <h1>Complete your reservation</h1>
      <h3>Please Fill in your details:</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <p className="error-message">{validationMessages.firstName}</p>
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <p className="error-message">{validationMessages.lastName}</p>
        </div>

        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <p className="error-message">{validationMessages.phone}</p>
        </div>

        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <p className="error-message">{validationMessages.email}</p>
        </div>

        <button type="submit">Submit</button>
      </form>

      {checkoutModelOpen ? (
        <div className="orderSucess">
          <div className="sucesscard">
            your Reservation is sucessfull
            {/* <p>
              {" "}
              Total Price: $
              {(
                calculateTotalPrice() +
                (deliveryOption === "delivery" ? deliveryCharges : 0)
              ).toFixed(2)}
            </p> */}
            {/* <Button backgroundColor="#EFD36D" onClick={closeCheckoutModal}>
              Close
            </Button> */}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default UserDetailPage;
