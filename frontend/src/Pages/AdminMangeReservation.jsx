import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Link,
  Heading,
  Box,
  Center,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { get, post } from "../api/ApiService";
import { color } from "framer-motion";

const pageSize = 10;

const AdminMangeReservation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [order, setOrder] = useState([]);
  // console.log(order , "order")
  const [sortBy, setSortBy] = useState("reservation.id");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    GetDetails();
  }, []);

  const GetDetails = async () => {
    const result = await get("user/all/reservation");
    if (result.status) {
      setOrder(result.data);
    }
  };

  const toggleSort = (column) => {
    if (sortBy === column) {
      // Toggle sorting order if the same column is clicked
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a different column is clicked, set it as the new sorting column
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedOrder = [...order].sort((a, b) => {
    const orderA = a[sortBy];
    const orderB = b[sortBy];

    if (orderA === null || orderA === undefined) {
      return sortOrder === "asc" ? 1 : -1;
    }

    if (orderB === null || orderB === undefined) {
      return sortOrder === "asc" ? -1 : 1;
    }

    if (sortOrder === "asc") {
      if (sortBy === "orderRate" || sortBy === "orderQuantity") {
        return orderA - orderB; // Sort numerically for these columns
      }
      return orderA.localeCompare(orderB);
    } else {
      if (sortBy === "orderRate" || sortBy === "orderQuantity") {
        return orderB - orderA; // Sort numerically for these columns
      }
      return orderB.localeCompare(orderA);
    }
  });

  const navigate = useNavigate();

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginateData = sortedOrder.slice(startIndex, endIndex);

  // Define functions for changing the current page
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleViewStatus = (order) => {
    setSelectedRow(order); // Store the selected row's details in state
    navigate("/status", {
      state: {
        selectedRow: order,
      },
    });
  };

  const Approve = async (id, status) => {
    const postData = {
      id,
      status,
    };

    try {
      // Make the API POST request
      const result = await post("user/update/reservation", postData);
      if (result.status) {
        console.log(result);
        // alert("updated successfylly");
        GetDetails();
      }

      // Handle the result, e.g., show a success message
      console.log("API call successful:", result);

      // Set checkoutModelOpen to true to display the success message
      // setCheckoutModelOpen(true);
    } catch (error) {
      // Handle the API request error, e.g., show an error message
      console.error("API call failed:", error);
    }
  };

  return (
    <div className="manage-order-container">
      <Heading p={"18px 20px "}>Manage Reservation</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th
              onClick={() => toggleSort("orderID")}
              style={{ cursor: "pointer" }}
            >
              Order ID
            </Th>
            <Th
              onClick={() => toggleSort("customerName")}
              style={{ cursor: "pointer" }}
            >
              Customer Name
            </Th>
            <Th
              onClick={() => toggleSort("orderRate")}
              style={{ cursor: "pointer" }}
            >
              Party Size
            </Th>
            <Th
              onClick={() => toggleSort("orderQuantity")}
              style={{ cursor: "pointer" }}
            >
              Reservation date
            </Th>
            <Th style={{ cursor: "pointer" }}>Reservation Time</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginateData.map((order, index) => {
            // const totalOrderPrice = order.order
            //   .reduce(
            //     (totalPrice, foodItem) =>
            //       totalPrice + foodItem.price * foodItem.count,
            //     0
            //   )
            //   .toFixed(2);
            // const totalOrderQuantity = order.order.reduce(
            //   (totalQuantity, foodItem) => totalQuantity + foodItem.count,
            //   0
            // );
            // let data = { ...order, totalOrderPrice, totalOrderQuantity };

            return (
              <Tr key={index}>
                <Td>{order.id}</Td>
                <Td>{order.firstName}</Td>
                <Td>{order.size}</Td>
                <Td>{order.date}</Td>
                <Td>{order.time}</Td>
                {/* <Td>{totalOrderPrice}</Td>
                <Td>{totalOrderQuantity}</Td>{" "} */}
                {order.status === "Approved" ? (
                  <Td>
                    <div>
                      <Box
                        size="sm"
                        width="140px"
                        textAlign={"center"}
                        borderRadius={"5px"}
                        paddingTop={"2px"}
                        height="25px"
                        margin={"0px 2px"}
                        backgroundColor={"Green"}
                        color={"white"}
                      >
                        Approved
                      </Box>
                    </div>
                  </Td>
                ) : order.status === "Rejected" ? (
                  <Td>
                    <Box
                      size="sm"
                      width="140px"
                      textAlign={"center"}
                      borderRadius={"5px"}
                      paddingTop={"2px"}
                      height="25px"
                      margin={"0px 2px"}
                      backgroundColor={"red"}
                      color={"white"}
                    >
                      Rejected
                    </Box>
                  </Td>
                ) : (
                  <Td>
                    <div>
                      <Button
                        size="sm"
                        padding="0px 10px"
                        height="25px"
                        margin={"0px 2px"}
                        backgroundColor={"Green"}
                        color={"white"}
                        onClick={() => Approve(order.id, "Approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        padding="0px 10px"
                        height="25px"
                        margin={"0px 2px"}
                        backgroundColor={"red"}
                        color={"white"}
                        onClick={() => Approve(order.id, "Rejected")}
                      >
                        Reject
                      </Button>
                    </div>
                  </Td>
                )}

                {/* <Td>{order.status}</Td> */}
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      {/* Pagination controls */}
      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={nextPage} disabled={endIndex >= order.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminMangeReservation;
