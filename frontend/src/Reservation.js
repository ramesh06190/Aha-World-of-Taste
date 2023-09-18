import React, { useState } from 'react';
import Header from './Header';
import './Reservation.css';

function Reservation() {
  const [partySize, setPartySize] = useState('');
  const [date, setDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
  ];

  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div>
      <Header />
      <h1>Make a Reservation</h1>
      <form className="reservation-form" onSubmit={handleSubmit}>
        <div className="horizontal-form">
          <div className="form-group">
            <label htmlFor="party-size">Party Size:</label>
            <input
              type="number"
              id="party-size"
              value={partySize}
              onChange={(e) => setPartySize(e.target.value)}
              required
              min={1}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Time:</label>
            <div className="time-slots-container">
              {timeSlots.map((timeSlot) => (
                <div
                  key={timeSlot}
                  className={`time-slot ${timeSlot === selectedTimeSlot ? 'selected' : ''}`}
                  onClick={() => handleTimeSlotClick(timeSlot)}
                >
                  {timeSlot}
                </div>
              ))}
            </div>
          </div>
        </div>
        <button type="submit">Reserve</button>
      </form>
    </div>
  );
}

export default Reservation;
