import React, { useState } from 'react';
import './AdminViewMenu.css'; // Import your CSS file for styling

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

const FoodCard = ({ name, description, rate }) => (
    <div className="food-card">
        <h2 className="food-name">{name}</h2>
        <p className="food-description">{description}</p>
        <p className="food-rate">{rate}</p>
    </div>
);

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

const AdminViewMenu = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="admin-viewcontainer">
            <div className="search-wrap">
            <h1>Full Menu</h1>
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
