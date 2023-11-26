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
  Text,
  Select
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { get } from "../api/ApiService";

const pageSize = 10;

const OrderTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [order, setOrder] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");
  const [statusFilter, setStatusFilter] = useState("All");
console.log(statusFilter , "statusFilter")
  const navigate = useNavigate();

  useEffect(() => {
    GetDetails();
  }, []);

  const GetDetails = async () => {
    const result = await get("admin/order");
    if (result.status) {
      setOrder(result.data);
    }
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleViewStatus = (order) => {
    setSelectedRow(order);
    navigate("/status", {
      state: {
        selectedRow: order,
      },
    });
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Sorting logic
  const sortedOrder = [...order].sort((a, b) => {
    const multiplier = sortOrder === "least" ? -1 : 1;
    return multiplier * (new Date(b.createdAt) - new Date(a.createdAt));
  });

  // Filter by status
  const filteredOrder = sortedOrder.filter((item) => {
    if (statusFilter === "All") {
      return true;
    } else {
      return item.status === statusFilter;
    }
  });

  const paginateData = filteredOrder.slice(startIndex, endIndex);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "least" ? "latest" : "least"));
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  return (
    <div className="manage-order-container">
      <Heading p={"18px 20px "}>Manage Orders</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th onClick={toggleSortOrder}>Order Date</Th>
            <Th>Customer Name</Th>
            <Th>Order Rate</Th>
            <Th>Order Quantity</Th>
            <Th>
              <Select value={statusFilter} onChange={(e) => handleStatusFilter(e.target.value)}>
              <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Delivered">Delivered</option>
                <option value="Order Canceled">Rejected</option>
              </Select>
            </Th>
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
            const createdAtDate = new Date(order.createdAt);
            const formattedCreatedAt = createdAtDate.toLocaleString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });
            let data = { ...order, totalOrderPrice, totalOrderQuantity };

            return (
              <Tr key={index}>
                <Td>{order.id}</Td>
                <Td>{formattedCreatedAt}</Td>
                <Td>{order.fullName}</Td>
                <Td>{totalOrderPrice}</Td>
                <Td>{totalOrderQuantity}</Td>
                <Td>
                  {order.status === "Delivered" ? (
                    <Text className="deliveredtext">Delivered</Text>
                  ) : order.status === "Order Canceled" ? (
                    <Text className="Rejectedtext">Rejected</Text>
                  ) : statusFilter === "Pending" || order.status === statusFilter ? (
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
                  ) :      <Link
                  as={Button}
                  size="sm"
                  padding="0px 10px"
                  height="25px"
                  onClick={() => handleViewStatus(data)}
                >
                  <ChevronRightIcon />
                  View Status
                </Link>}
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
        <button onClick={nextPage} disabled={endIndex >= filteredOrder.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderTable;
