import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import './AdminViewMenu.css';

const dummyData = [
    {
        name: 'Pizza',
        description: 'Delicious pizza with various toppings.',
        rate: '$12.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Pizza',
        description: 'Delicious pizza with various toppings.',
        rate: '$12.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Pizza',
        description: 'Delicious pizza with various toppings.',
        rate: '$12.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Pizza',
        description: 'Delicious pizza with various toppings.',
        rate: '$12.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Pizza',
        description: 'Delicious pizza with various toppings.',
        rate: '$12.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
    {
        name: 'Sushi',
        description: 'Fresh sushi rolls with soy sauce.',
        rate: '$15.99',
    },
];


const FoodCard = ({ name, description, rate, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteClick = () => {
    onOpen();
  };

  const handleConfirmDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <div className="food-card">
      <h2 className="food-name">{name}</h2>
      <p className="food-description">{description}</p>
      <div className="rate-wrap">
      <p className="food-rate">{rate}</p>
      <IconButton
        icon={<DeleteIcon />}
        aria-label="Delete"
        variant="outline"
        colorScheme="red"
        onClick={handleDeleteClick}
      />
      </div>
  
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Food Item</ModalHeader>
          <ModalBody>Are you sure you want to delete this food item?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleConfirmDelete}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

const FoodList = ({ searchData }) => {
  const [data, setData] = useState(dummyData);

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchData.toLowerCase())
  );

  return (
    <div className="food-grid">
      {filteredData.map((food, index) => (
        <FoodCard key={index} {...food} onDelete={() => handleDelete(index)} />
      ))}
    </div>
  );
};

const AdminViewMenu = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
      <FoodList searchData={searchTerm} />
    </div>
  );
};

export default AdminViewMenu;
