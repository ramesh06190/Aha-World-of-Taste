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
  Icon,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { get, post } from "../api/ApiService";
import { color } from "framer-motion";
import { StarIcon } from "@chakra-ui/icons";
const pageSize = 10;

const AdminReviewList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState([]);
  console.log(order, "order");
  const [sortBy, setSortBy] = useState("order.createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  useEffect(() => {
    GetDetails();
  }, []);

  const GetDetails = async () => {
    const result = await get("admin/order");
    if (result.status) {
      setOrder(result.data.filter((val) => val.review !== ""));
    }
  };

  const toggleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
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
        return orderA - orderB;
      }
      return orderA.localeCompare(orderB);
    } else {
      if (sortBy === "orderRate" || sortBy === "orderQuantity") {
        return orderB - orderA;
      }
      return orderB.localeCompare(orderA);
    }
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginateData = sortedOrder.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const Approve = async (id, status) => {
    const postData = {
      id,
      status,
    };

    try {
      const result = await post("user/update/reservation", postData);
      if (result.status) {
        GetDetails();
      }
    } catch (error) {}
  };

  return (
    <div className="manage-order-container">
      <Heading p={"18px 20px "}>Customer Reviews</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th
              onClick={() => toggleSort("orderID")}
              style={{ cursor: "pointer" }}
            >
              Customer Name
            </Th>
            <Th
              onClick={() => toggleSort("customerName")}
              style={{ cursor: "pointer" }}
            >
              Order Count
            </Th>
            <Th
              onClick={() => toggleSort("orderRate")}
              style={{ cursor: "pointer" }}
            >
              Customer UserId
            </Th>
            <Th
              onClick={() => toggleSort("orderQuantity")}
              style={{ cursor: "pointer" }}
            >
              Customer Comments
            </Th>
            <Th style={{ cursor: "pointer" }}>Ratings</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginateData.map((order, index) => {
            return (
              <Tr key={index}>
                <Td>{order.fullName}</Td>
                <Td>{order.order.length}</Td>
                <Td>{order.userId}</Td>
                <Td>{order.review}</Td>
                <Td>
                  {" "}
                  <Text display="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon
                        key={star}
                        as={StarIcon}
                        boxSize="16px"
                        color={star <= order.rating ? "yellow" : "gray"}
                        ml="2px"
                      />
                    ))}
                  </Text>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
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

export default AdminReviewList;
