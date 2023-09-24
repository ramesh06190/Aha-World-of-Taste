import React, { useState } from 'react';
import './AdminViewMenu.css'; // Import your CSS file for styling
import { RiEdit2Line } from 'react-icons/ri'; // Import the edit icon
import "./AdminEditMenu.css"
import {
Input
  } from "@chakra-ui/react";
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

const FoodCard = ({ name, description, rate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedRate, setEditedRate] = useState(rate);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        name = editedName;
        description = editedDescription;
        rate = editedRate;
    };

    return (
        <div className="food-card">
            <h2 className="food-name">
                {isEditing ? (
                    <Input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                    />
                ) : (
                    name
                )}
            </h2>
            <p className="food-description">
                {isEditing ? (
                    <Input
                        type="text"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    />
                ) : (
                    description
                )}
            </p>
            <div className="rate-wrap">
            <p className="food-rate">
                {isEditing ? (
                    <Input
                        type="text"
                        value={editedRate}
                        onChange={(e) => setEditedRate(e.target.value)}
                    />
                ) : (
                    rate
                )}
            </p>
    
            {isEditing ? (
                <button onClick={handleSaveClick}>Save</button>
            ) : (
                <button onClick={handleEditClick}>
                    <RiEdit2Line /> Edit
                </button>
            )}
            </div>
     
        </div>
    );
};

const FoodList = ({ searchData }) => {
    const filteredData = dummyData.filter((item) =>
        item.name.toLowerCase().includes(searchData.toLowerCase())
    );

    return (
        <div className="food-grid">
            {filteredData.map((food, index) => (
                <FoodCard key={index} {...food} />
            ))}
        </div>
    );
};

const AdminEditMenu = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="admin-viewcontainer">
            <div className="search-wrap">
                <h1>Edit Menu</h1>
                <input
                    type="text"
                    placeholder="Search for food..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            <FoodList searchData={searchTerm} />
        </div>
    );
};

export default AdminEditMenu;
