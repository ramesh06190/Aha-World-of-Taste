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
  Text
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { get } from "../api/ApiService";
import { color } from "framer-motion";

const pageSize = 10;

const OrderTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [order, setOrder] = useState([]);
  console.log(order , "order")
  const [sortBy, setSortBy] = useState("orderID");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    GetDetails();
  }, []);


  const GetDetails = async () => {
    const result = await get("admin/order");
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


  return (
    <div className="manage-order-container">
      <Heading p={"18px 20px "}>Manage Orders</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th onClick={() => toggleSort("orderID")} style={{ cursor: "pointer" }}>Order ID</Th>
            <Th>Order Received Time</Th>
            <Th onClick={() => toggleSort("customerName")} style={{ cursor: "pointer" }}>Customer Name</Th>
            <Th onClick={() => toggleSort("orderRate")} style={{ cursor: "pointer" }}>Order Rate</Th>
            <Th onClick={() => toggleSort("orderQuantity")} style={{ cursor: "pointer" }}>Order Quantity</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginateData.map((order, index) => {
            const totalOrderPrice = order.order
              .reduce(
                (totalPrice, foodItem) =>
                  totalPrice + foodItem.price * foodItem.count,
                0
              )
              .toFixed(2);
            const totalOrderQuantity = order.order.reduce(
              (totalQuantity, foodItem) => totalQuantity + foodItem.count,
              0
            );
            let data = { ...order, totalOrderPrice, totalOrderQuantity };

            return (
              <Tr key={index}>
                <Td>{order.id}</Td>
                <Td>{order.createdAt}</Td>
                <Td>{order.fullName}</Td>
                <Td>{totalOrderPrice}</Td> {/* Display the total order price */}
                <Td>{totalOrderQuantity}</Td>{" "}
                {/* Display the total order quantity */}
                <Td>
                  {order.status === "Delivered" ? (
                    <Text className="deliveredtext" >Delivered</Text>
                  ) : order.status === "Order Canceled" ? (
                    <Text className="Rejectedtext" >Rejected</Text>
            
                  ) : (
                    <Link
                      as={Button}
                      size="sm"
                      padding="0px 10px"
                      height="25px"
                      onClick={() => handleViewStatus(data)}
                    >
                      <ChevronRightIcon />
                      View Status
                    </Link>
                  )}
                </Td>
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

export default OrderTable;
