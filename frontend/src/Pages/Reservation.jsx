import React, { useState, useEffect } from "react";
import "./Reservation.css";
import { Grid, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { get } from "../api/ApiService";
<<<<<<< Updated upstream
import { useLocation } from "react-router-dom";

const hours = [
=======
import { useLocation } from 'react-router-dom';
const hours = [
  "9:00 AM",
  "10:00 AM",
>>>>>>> Stashed changes
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
<<<<<<< Updated upstream
=======
  "3:00 PM",
>>>>>>> Stashed changes
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
<<<<<<< Updated upstream
=======
  "10:00 PM",
  "11:00 PM",
>>>>>>> Stashed changes
];

function Reservation() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [childData, setChildData] = useState({});
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const input1 = searchParams.get('input1');
  const input2 = searchParams.get('input2');
  const [partySize, setPartySize] = useState("");
  const [date, setDate] = useState("");
  const [partySizeError, setPartySizeError] = useState("");
  const [dateError, setDateError] = useState("");
  const [order, setOrder] = useState([]);
  const [reservations, setReservations] = useState([])
  const getUserId = localStorage.getItem("userId");
<<<<<<< Updated upstream

  const [showTimeSlots, setShowTimeSlots] = useState(false);
=======
  console.log(reservations, "reservations")
  console.log(order, "order ")
>>>>>>> Stashed changes

  useEffect(() => {
    GetReservationDetail();
  }, []);

  const GetReservationDetail = async () => {
    const result = await get("user/all/reservation");
    if (result.status) {
      setOrder(result.data.filter((val) => val.userId === getUserId));
    }
  };

  const handleButtonClick = (hour) => {
    setSelectedButton(hour);
  };

  const navigate = useNavigate();

  const navFun = () => {
    if ((input1 && input2) || (input1 && date)) {
      navigate("/UserDetailPage", {
        state: {
          date: input2,
          size: input1,
          time: selectedButton,
        },
      });
    } else {
      window.scrollTo(0, 0);

      if (!partySize && !date) {
        setPartySizeError("Party size is required");
      } else {
        setPartySizeError("");

      }

      if (!date) {
        setDateError("Date is required");
      } else {
        setDateError("");
        navigate("/UserDetailPage", {
          state: {
            date: date,
            size: partySize,
            time: selectedButton,
          },
        })
      }
    }
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  

  const handlePartySizeChange = (e) => {
    setPartySize(e.target.value);
  };

  const validateDate = () => {
    if (date === "") {
      setDateError("Date is required");
      return false;
    }

    setDateError("");
    return true;
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    let data = order.filter((val) => val.date === e.target.value)
    setReservations(data)
  };

  const validatePartySize = () => {
    if (partySize === "") {
      setPartySizeError("Party size is required");
      return false;
    }

    setPartySizeError("");
    return true;
  };

  const handleReservationSubmit = () => {
    const isPartySizeValid = validatePartySize();
    const isDateValid = validateDate();

    if (isPartySizeValid && isDateValid) {
      setShowTimeSlots(true);
    }
  };

  return (
    <div>
      <div className="reservation-con">
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
                  value={input1 || partySize}
                  onChange={handlePartySizeChange}
                >
                  <option value="Guest1">Guest 1</option>
                  <option value="Guest2">Guest 2</option>
                  <option value="Guest3">Guest 3</option>
                  <option value="Guest4">Guest 4</option>
                  <option value="Guest4+">Guest 4+</option>
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
                  value={input2 || date}
                  onChange={handleDateChange}
                  min={getCurrentDate()}
                />

                <p className="custom-errornewone">{dateError}</p>
              </div>
<<<<<<< Updated upstream
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
=======


>>>>>>> Stashed changes
            </div>
          </div>
        </div>
        <div className="res-grid-con">
<<<<<<< Updated upstream
          {showTimeSlots && (
            <div className="res-card">
              <Grid templateColumns="repeat(5, 1fr)" gap={3} width={"100%"}>
                {hours.map((hour, index) => {
                  const isBooked = reservations.some(
                    (val) => val.time === hour && val.status === "Approved"
                  );
=======
          <div className="res-card">
            <Grid templateColumns="repeat(5, 1fr)" gap={3} width={"100%"}>
              {hours.map((hour, index) => {
                const isBooked = reservations.some(val => val.time === hour && val.status === "Approved"
                );
>>>>>>> Stashed changes

                  return (
                    <Button
                      key={hour}
                      onClick={() => handleButtonClick(hour)}
                      colorScheme={selectedButton === hour ? "yellow" : "gray"}
                      isDisabled={isBooked}
                      bg={isBooked ? "yellow" : undefined}
                      color={isBooked ? "black" : undefined}
                    >
                      {isBooked ? "Booked" : hour}
                    </Button>
                  );
                })}
              </Grid>

<<<<<<< Updated upstream
              {selectedButton && getUserId && (
                <Button
                  className={`reserve-now-button ${selectedButton ? "show" : ""}`}
                  onClick={navFun}
                >
                  Reserve Now
                </Button>
              )}
            </div>
          )}
=======

            {selectedButton && getUserId && (
              <Button
                className={`reserve-now-button ${selectedButton ? "show" : ""}`}
                onClick={navFun}
              >
                Reserve Now
              </Button>
            )}
          </div>
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  );
}

export default Reservation;
