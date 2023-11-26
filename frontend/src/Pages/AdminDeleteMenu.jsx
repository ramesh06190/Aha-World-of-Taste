import React, { useState, useEffect } from "react";
import { get, post } from "../api/ApiService";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  IconButton,
  useDisclosure,
  useToast,
  Box
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import "./AdminViewMenu.css";

const FoodCard = ({
  foodName,
  description,
  price,
  onDelete,
  disable,
  onFullDelete,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isFullDeleteOpen, setFullDeleteOpen] = useState(false);

  const handleDeleteClick = () => {
    onOpen();
  };

  const handleFullDeleteClick = () => {
    setFullDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    onClose();
  };

  const handleConfirmFullDelete = () => {
    onFullDelete();
    setFullDeleteOpen(false);
  };

  const handleCloseFullDelete = () => {
    setFullDeleteOpen(false);
  };

  return (
    <div className="food-card">
      <div>
        <h2 className="food-name">{foodName}</h2>
        <p className="food-description">{description}</p>
      </div>
      <div className="rate-wrap">
        <p className="food-rate">{price}</p>
        <Box>
          <IconButton
            icon={!disable ? <DeleteIcon /> : <AddIcon />}
            aria-label="Delete"
            variant="outline"
            colorScheme="red"
            onClick={handleDeleteClick}
          />
          <Button m={"0px 0px 0px 6px"} onClick={handleFullDeleteClick}>
            Delete
          </Button>
        </Box>
      </div>

      {/* First Modal for handleDeleteClick */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {!disable ? "Disable Food Item" : "Add Food Item"}
          </ModalHeader>
          <ModalBody>
            Are you sure you want to {!disable ? "disable" : "add"} this food
            item?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleConfirmDelete}>
              {!disable ? "Delete" : "Add"}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Second Modal for handleFullDeleteClick */}
      <Modal isOpen={isFullDeleteOpen} onClose={handleCloseFullDelete} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Food Item</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this food item?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleConfirmFullDelete}>
              Delete
            </Button>
            <Button variant="ghost" onClick={handleCloseFullDelete}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

const FoodList = ({ searchData, updateRenderData }) => {
  const toast = useToast();
  const [AdminDish, setAdminDish] = useState([]);
  const [AdminToken, setAdminToken] = useState("");
  useEffect(() => {
    getAllDish();
  }, [updateRenderData]);
  const defaultToastConfig = {
    duration: 3000,
    isClosable: true,
    position: "top",
  };
  const headers = {
    token: AdminToken,
  };
  useEffect(() => {
    const Token = localStorage.getItem("adminToken");
    setAdminToken(Token);
  }, []);
  const getAllDish = async () => {
    const result = await get("api/all/dish");
    setAdminDish(result.data);
  };

  const handleFullDelete = async (index) => {
    try {
      const result = await post(
        "api/permanent-delete/dish",
        {
          id: index,
        },
        headers
      );
      if (result.status) {
        toast({
          title: "Dish deleted Successfully",
          description: "You have successfully deleted.",
          status: "success",
          ...defaultToastConfig,
        });
        updateRenderData();
      }
    } catch (error) {
      toast({
        title: "Dish not deleted Successfully",
        description: error?.response?.data?.message,
        status: "error",
        ...defaultToastConfig,
      });
    }
  };

  const handleDelete = async (index) => {
    try {
      const result = await post(
        "api/delete/dish",
        {
          id: index,
        },
        headers
      );
      if (result.status) {
        toast({
          title: "Dish deleted Successfully",
          description: "You have successfully deleted.",
          status: "success",
          ...defaultToastConfig,
        });
        updateRenderData();
      }
    } catch (error) {
      toast({
        title: "Dish not deleted Successfully",
        description: error?.response?.data?.message,
        status: "error",
        ...defaultToastConfig,
      });
    }
  };

  const filteredData = AdminDish.filter((item) =>
    item.foodName.toLowerCase().includes(searchData.toLowerCase())
  );

  return (
    <div className="food-grid">
      {filteredData.map((food, index) => (
        <FoodCard
          key={index}
          {...food}
          onDelete={() => handleDelete(food.id)}
          onFullDelete= {()=> handleFullDelete(food.id)}
          updateRenderData={updateRenderData}
        />
      ))}
    </div>
  );
};

const AdminViewMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [renderdata, setRenderdata] = useState(false);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const updateRenderData = () => {
    setRenderdata((prevRenderData) => !prevRenderData);
  };
  return (
    <div className="admin-viewcontainer">
      <div className="search-wrap">
        <h1>Delete Menu</h1>
        <>
          <input
            type="text"
            placeholder="Search for food..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </>
      </div>
      <FoodList searchData={searchTerm} updateRenderData={updateRenderData} />
    </div>
  );
};

export default AdminViewMenu;
