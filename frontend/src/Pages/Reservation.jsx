import React, { useState } from "react";
import "./Reservation.css";
import ReservationComponent from "./ReservationComponent";
import { Grid, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
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

  const handleDataFromChild = (data) => {
    console.log(data, "4343");
    setChildData(data);
  };

  const handleButtonClick = (hour) => {
    setSelectedButton(hour);
  };
  const navigate = useNavigate();
  console.log(selectedButton);
  const navFun = () => {
    navigate("/UserDetailPage", {
      state: {
        date: childData.date,
        size: childData.partySize,
        time: selectedButton,
      },
    });
  };

  return (
    <div>
      <div className="reservation-con">
        <ReservationComponent onDataReceived={handleDataFromChild} />
        <div className="res-grid-con">
          <div className="res-card">
            <Grid templateColumns="repeat(5, 1fr)" gap={3} width={"100%"}>
              {hours.map((hour, index) => (
                <Button
                  key={hour}
                  onClick={() => handleButtonClick(hour)}
                  colorScheme={selectedButton === hour ? "yellow" : "gray"}
                >
                  {hour}
                </Button>
              ))}
            </Grid>
            {selectedButton && (
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
