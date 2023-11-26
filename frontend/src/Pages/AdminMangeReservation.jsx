import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Heading,
  Box,
  Select,
} from "@chakra-ui/react";

import { get, post } from "../api/ApiService";

const pageSize = 10;

const AdminManageReservation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");
  const [statusFilter, setStatusFilter] = useState("All");
  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const result = await get("user/all/reservation");
    if (result.status) {
      setOrder(result.data);
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "least" ? "latest" : "least"));
  };

  const approve = async (id, status) => {
    const postData = {
      id,
      status,
    };



    try {
      const result = await post("user/update/reservation", postData);
      if (result.status) {
        console.log(result);
        getDetails();
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };


  const sortedOrder = [...order].sort((a, b) => {
    const multiplier = sortOrder === "least" ? -1 : 1;
    return multiplier * (new Date(b.createdAt) - new Date(a.createdAt));
  });

  const filteredOrder = sortedOrder.filter((item) => {
    if (statusFilter === "All") {
      return true;
    } else {
      return item.status === statusFilter;
    }
  });

    const paginateData = filteredOrder.slice(startIndex, endIndex);
  return (
    <div className="manage-order-container">
      <Heading p={"18px 20px "}>Manage Reservation</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th onClick={toggleSortOrder}>Reservation Date</Th>
            <Th>Customer Name</Th>
            <Th>Party Size</Th>
            <Th>Reservation Time</Th>
            <Th>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                  <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </Select>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            paginateData.map((currentOrder, index) => (
              
              <Tr key={index}>
                <Td>{currentOrder.id}</Td>
                <Td>{currentOrder.date}</Td>
                <Td>{currentOrder.firstName}</Td>
                <Td>{currentOrder.size}</Td>
                <Td>{currentOrder.time}</Td>
                <Td>
                  {currentOrder.status === "Approved" ? (
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
                  ) : currentOrder.status === "Rejected" ? (
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
                  ) : (
                    <div>
                      <Button
                        size="sm"
                        padding="0px 10px"
                        height="25px"
                        margin={"0px 2px"}
                        backgroundColor={"Green"}
                        color={"white"}
                        onClick={() => approve(currentOrder.id, "Approved")}
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
                        onClick={() => approve(currentOrder.id, "Rejected")}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      <div className="pagination-controls">
        <button
          onClick={() =>
            setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1))
          }
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() =>
            setCurrentPage((prevPage) =>
              endIndex < filteredOrder.length ? prevPage + 1 : prevPage
            )
          }
          disabled={endIndex >= filteredOrder.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminManageReservation;
