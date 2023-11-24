import React, { useState, useEffect } from "react";
import "./Reservation.css";
import { Grid, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { get } from "../api/ApiService";
import { useLocation } from 'react-router-dom';
const hours = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
  "11:00 PM",
];

function Reservation() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [childData, setChildData] = useState({});
  console.log(childData, "here");
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
  console.log(reservations, "reservations")
  console.log(order, "order ")

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
  console.log(selectedButton);
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
      // Scroll to the top of the page
      window.scrollTo(0, 0);
      // Set error messages if needed
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
  

  // Handle input changes
  const handlePartySizeChange = (e) => {
    setPartySize(e.target.value);
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
  const handleDateChange = (e) => {
    setDate(e.target.value);
    let data = order.filter((val) => val.date === e.target.value)
    setReservations(data)
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
           <option value="Guest1">1 Guest </option>
              <option value="Guest2">2 Guest</option>
              <option value="Guest3">3 Guest</option>
              <option value="Guest4">4 Guest</option>
              <option value="Guest4+">4+ Guest</option>
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


            </div>
          </div>
        </div>
        <div className="res-grid-con">
          <div className="res-card">
            <Grid templateColumns="repeat(5, 1fr)" gap={3} width={"100%"}>
              {hours.map((hour, index) => {
                const isBooked = reservations.some(val => val.time === hour && val.status === "Approved");
                const isCancelled = reservations.some(val => val.time === hour && val.status === "Rejected");
                return (
                  <Button
                  key={hour}
                  onClick={() => handleButtonClick(hour)}
                  colorScheme={selectedButton === hour ? "yellow" : "gray"}
                  isDisabled={isBooked || isCancelled}
                  bg={isBooked || isCancelled? "yellow" : undefined}
                  color={isBooked || isCancelled ? "black" : undefined}
                >
                  {isCancelled ? "Not Available" : isBooked ? "Booked" : hour}
                </Button>
                
                );
              })}
            </Grid>


            {selectedButton && getUserId && (
              <Button
                className={`reserve-now-button ${selectedButton ? "show" : ""}`}
                onClick={navFun}
              >
                Reserve Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
