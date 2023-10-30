import React, { useState } from 'react';
import './Reservation.css';
import ReservationComponent from './ReservationComponent';
import { Grid, Button } from '@chakra-ui/react';

const hours = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
  '10:00 PM',
  '11:00 PM',
];

function Reservation() {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (hour) => {
    setSelectedButton(hour);
  };

  return (
    <div>
      <div className="reservation-con">
        <ReservationComponent />
        <div className="res-grid-con">
          <div className="res-card">
          <Grid templateColumns="repeat(5, 1fr)" gap={3} width={'100%'}>
            {hours.map((hour, index) => (
              <Button
                key={hour}
                onClick={() => handleButtonClick(hour)}
                colorScheme={selectedButton === hour ? 'yellow' : 'gray'}
              >
                {hour}
              </Button>
            ))}
          </Grid>
          {selectedButton && (
            <Button className={`reserve-now-button ${selectedButton ? 'show' : ''}`}>
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
