import React, { useEffect, useState } from "react";
import { Button, Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
function ReservationComponent({ onDataReceived }) {
  const [partySize, setPartySize] = useState("");
  const [date, setDate] = useState("");
  const [partySizeError, setPartySizeError] = useState("");
  const [dateError, setDateError] = useState("");
  const navigate = useNavigate();
  // Validation functions
  const validatePartySize = () => {
    if (partySize === "") {
      setPartySizeError("Party size is required");
      return false;
    }
    // Additional validation logic if needed
    setPartySizeError("");
    return true;
  };

  const validateDate = () => {
    if (date === "") {
      setDateError("Date is required");
      return false;
    }
    // Additional validation logic if needed
    setDateError("");
    return true;
  };

  // Handle input changes
  const handlePartySizeChange = (e) => {
    setPartySize(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  // Handle form submission
  const handleReservationSubmit = () => {
    const isPartySizeValid = validatePartySize();
    const isDateValid = validateDate();

    if (isPartySizeValid && isDateValid) {
      navigate("/reservation");
      onDataReceived({ date, partySize });
    }
  };
  ReservationComponent.propTypes = {
    onDataReceived: PropTypes.func.isRequired,
  };

  return (
    <div>
      <div className="reservation-section">
        <h1>Reserve a Table</h1>
        <h4>
          To help us find the best table for you, select the preferred party
          size, date, and time of your reservation.
        </h4>
        <div className="reserve-input-wrap">
          <div className="label-wrap">
            <p>Party Size</p>
            <Select
              placeholder="Select option"
              focusBorderColor="black"
              borderRadius="2px"
              value={partySize}
              onChange={handlePartySizeChange}
            >
              <option value="option1">Guest 1</option>
              <option value="option2">Guest 2</option>
              <option value="option3">Guest 4</option>
              <option value="option3">Guest 6</option>
              <option value="option3">Guest 8</option>
              <option value="option3">Guest 8+</option>
            </Select>
            <p className="custom-errornew">{partySizeError}</p>
          </div>

          <div className="label-wrap">
            <p>Date</p>
            <Input
              focusBorderColor="black"
              borderRadius="2px"
              placeholder="Select Date and Time"
              size="md"
              type="date"
              value={date}
              onChange={handleDateChange}
            />
            <p className="custom-errornewone">{dateError}</p>
          </div>

          <div className="label-wrap-btn">
            <div>
              <Button
                borderRadius="2px"
                colorScheme="gray"
                onClick={handleReservationSubmit}
              >
                Find Slots
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationComponent;
