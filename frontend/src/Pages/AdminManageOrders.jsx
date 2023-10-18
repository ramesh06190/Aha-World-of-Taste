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
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { get } from "../api/ApiService";
const dummyData = [
  {
    orderID: 1,
    foodName: [
      { name: "Pizza", quantity: 2 },
      { name: "Burger", quantity: 3 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
    ],
    orderReceivedTime: "2023-10-14 10:30 AM",
    customerName: "John Doe",
    orderRate: "$8.99",
    orderQuantity: 2,
    status: "delivered",
  },
  {
    orderID: 2,
    foodName: [
      { name: "Pizza", quantity: 2 },
      { name: "Burger", quantity: 3 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
    ],
    orderReceivedTime: "2023-10-14 11:45 AM",
    customerName: "Jane Smith",
    orderRate: "$12.99",
    orderQuantity: 1,
    status: "rejected",
  },
  {
    orderID: 3,
    foodName: [
      { name: "Pizza", quantity: 2 },
      { name: "Burger", quantity: 3 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
    ],
    orderReceivedTime: "2023-10-14 1:15 PM",
    customerName: "Alice Johnson",
    orderRate: "$10.50",
    orderQuantity: 3,
    status: "inProgress",
  },
  {
    orderID: 4,
    foodName: [
      { name: "Pizza", quantity: 2 },
      { name: "Burger", quantity: 3 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
    ],
    orderReceivedTime: "2023-10-14 2:00 PM",
    customerName: "Bob Wilson",
    orderRate: "$15.75",
    orderQuantity: 2,
    status: "inProgress",
  },
  {
    orderID: 5,
    foodName: [
      { name: "Pizza", quantity: 2 },
      { name: "Burger", quantity: 3 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
    ],
    orderReceivedTime: "2023-10-14 3:30 PM",
    customerName: "Eva Brown",
    orderRate: "$7.25",
    orderQuantity: 1,
    status: "delivered",
  },
  {
    orderID: 6,
    foodName: [
      { name: "Pizza", quantity: 2 },
      { name: "Burger", quantity: 3 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
    ],
    orderReceivedTime: "2023-10-14 5:00 PM",
    customerName: "David Lee",
    orderRate: "$20.99",
    orderQuantity: 2,
    status: "inProgress",
  },
  {
    orderID: 7,
    foodName: [
      { name: "Pizza", quantity: 2 },
      { name: "Burger", quantity: 3 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
    ],
    orderReceivedTime: "2023-10-14 10:30 AM",
    customerName: "John Doe",
    orderRate: "$8.99",
    orderQuantity: 2,
    status: "delivered",
  },
  {
    orderID: 8,
    foodName: [
      { name: "Pizza", quantity: 2 },
      { name: "Burger", quantity: 3 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
    ],
    orderReceivedTime: "2023-10-14 11:45 AM",
    customerName: "Jane Smith",
    orderRate: "$12.99",
    orderQuantity: 1,
    status: "rejected",
  },
  {
    orderID: 9,
    foodName: [
      { name: "Pizza", quantity: 2 },
      { name: "Burger", quantity: 3 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
    ],
    orderReceivedTime: "2023-10-14 1:15 PM",
    customerName: "Alice Johnson",
    orderRate: "$10.50",
    orderQuantity: 3,
    status: "inProgress",
  },
  {
    orderID: 10,
    foodName: [
      { name: "Pizza", quantity: 2 },
      { name: "Burger", quantity: 3 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
    ],
    orderReceivedTime: "2023-10-14 2:00 PM",
    customerName: "Bob Wilson",
    orderRate: "$15.75",
    orderQuantity: 2,
    status: "inProgress",
  },
  {
    orderID: 11,
    foodName: [
      { name: "Pizza", quantity: 2 },
      { name: "Burger", quantity: 3 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
    ],
    orderReceivedTime: "2023-10-14 3:30 PM",
    customerName: "Eva Brown",
    orderRate: "$7.25",
    orderQuantity: 1,
    status: "delivered",
  },
  {
    orderID: 12,
    foodName: [
      { name: "Pizza", quantity: 2 },
      { name: "Burger", quantity: 3 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
    ],
    orderReceivedTime: "2023-10-14 5:00 PM",
    customerName: "David Lee",
    orderRate: "$20.99",
    orderQuantity: 2,
    status: "inProgress",
  },
  {
    orderID: 11,
    foodName: [
      { name: "Pizza", quantity: 2 },
      { name: "Burger", quantity: 3 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
    ],
    orderReceivedTime: "2023-10-14 3:30 PM",
    customerName: "Eva Brown",
    orderRate: "$7.25",
    orderQuantity: 1,
    status: "delivered",
  },
  {
    orderID: 12,
    foodName: [
      { name: "Pizza", quantity: 2 },
      { name: "Burger", quantity: 3 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
      { name: "Pasta", quantity: 1 },
      { name: "Salad", quantity: 4 },
      { name: "Sushi", quantity: 2 },
    ],
    orderReceivedTime: "2023-10-14 5:00 PM",
    customerName: "David Lee",
    orderRate: "$20.99",
    orderQuantity: 2,
    status: "inProgress",
  },
];

const pageSize = 10; // Number of items per page

const OrderTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    GetDetails();
  }, []);
  const GetDetails = async () => {
    const result = await get("admin/order");
    if (result.status) {
      setOrder(result.data);
    }
  };

  const navigate = useNavigate();
  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginateData = order.slice(startIndex, endIndex);

  // Define functions for changing the current page
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleViewStatus = (order) => {
    setSelectedRow(order); // Store the selected row's details in state
    navigate("/status", { state: { selectedRow: order } }); // Navigate to the '/status' route
  };
  return (
    <div className="manage-order-container">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Order Received Time</Th>
            <Th>Customer Name</Th>
            <Th>Order Rate</Th>
            <Th>Order Quantity</Th>
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
                  {order.status === "delivered" ? (
                    "Delivered"
                  ) : order.status === "rejected" ? (
                    "Rejected"
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
        <Button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>Page {currentPage}</span>
        <Button onClick={nextPage} disabled={endIndex >= dummyData.length}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default OrderTable;
