import React, { useState, useEffect } from "react";
import { get } from "../api/ApiService";
import ResizableBox from "./ResizableBox";
import useDemoConfig from "./useDemoConfig";
import { Chart } from "react-charts";
import { Select } from "@chakra-ui/react";
export default function Bar() {
  const [selectedInterval, setSelectedInterval] = useState("7");
  const [order, setOrder] = useState([]);
  const [review , setReview] = useState([])
  const [reservations, setReservations] = useState([]);
  const [orderCounts, setOrderCounts] = useState({});
  const [reserveCounts, setReserveCounts] = useState({});
  const [reviewCounts , setReviewCounts] = useState({})
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [reservationLoadComplete, setReservationLoadComplete] = useState(false);

  function countOrdersByDay(orders) {
    const orderCounts = {};
    orders?.forEach((order) => {
      const orderDate = new Date(order.createdAt).toDateString();

      if (orderCounts[orderDate]) {
        orderCounts[orderDate]++;
      } else {
        orderCounts[orderDate] = 1;
      }
    });

    return orderCounts;
  }
  function countReservationByDay(reservedays) {
    const ReserveCounts = {};
    reservedays?.forEach((order) => {
      const reserveDate = new Date(order.createdAt).toDateString();

      if (ReserveCounts[reserveDate]) {
        ReserveCounts[reserveDate]++;
      } else {
        ReserveCounts[reserveDate] = 1;
      }
    });
    return ReserveCounts;
  }

  function countReviewByDay(review) {
    const ReviewCounts = {};
    review?.forEach((order) => {
      const ReviewDate = new Date(order.createdAt).toDateString();

      if (ReviewCounts[ReviewDate]) {
        ReviewCounts[ReviewDate]++;
      } else {
        ReviewCounts[ReviewDate] = 1;
      }
    });
    return ReviewCounts;
  
  }
  const { data, randomizeData } = useDemoConfig({
    series: 3,
    dataType: "ordinal",
    selectedInterval: selectedInterval,
    orderCount: orderCounts,
    reserveCount : reserveCounts,
    reviewCount : reviewCounts
  });

  useEffect(() => {
    if (!initialLoadComplete) {
      GetDetails();
      setInitialLoadComplete(true);
    }
    
  }, []);

  useEffect(() => {
    setOrderCounts(countOrdersByDay(order));
  }, [order]);


  useEffect(() => {
    setReserveCounts(countReservationByDay(reservations));
  }, [reservations]);

  useEffect(() => {
    setReviewCounts(countReviewByDay(review));
  }, [review]);
  useEffect(() => {
    if (!reservationLoadComplete) {
      GetReservation();
      setReservationLoadComplete(true);
    
    }
  }, []);

  const GetDetails = async () => {
    try {
      const result = await get("admin/order");
      if (result.status) {
        setOrder(result.data);
        setReview(result.data.filter((val)=>val.review !== ""))
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const GetReservation = async () => {
    try {
      const result = await get("user/all/reservation");
      if (result.status) {
        setReservations(result.data);
      }
    } catch (error) {
      console.error("Error fetching reservation details:", error);
    }
  };

  const primaryAxis = React.useMemo(() => ({
    getValue: (datum) => datum.primary,
  }), []);

  const secondaryAxes = React.useMemo(() => [
    {
      getValue: (datum) => datum.secondary,
    },
  ], []);

  const handleIntervalChange = (event) => {
    const newInterval = event.target.value;
    setSelectedInterval(newInterval);
  };

  return (
    <>
      <div className="slect-conn">
     
      <Select value={selectedInterval} onChange={handleIntervalChange} w="350px">
  <option value="7">Weekly</option>
  <option value="30">Monthly</option>
</Select>
      </div>

      <ResizableBox>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </ResizableBox>
    </>
  );
}
