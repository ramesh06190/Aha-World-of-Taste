import React, { useState } from 'react';
import './Menu.css';
import Header from './Header';

// Sample menu items
const menuItems = [
    { title: "Veggie Burger", image: "veggie-burger.jpg", category: "vegetarian", description: "A delicious veggie burger with fresh veggies and a special sauce." },
    { title: "Pepperoni Pizza", image: "pepperoni-pizza.jpg", category: "non-vegetarian", description: "A classic pepperoni pizza with a crispy crust and melted cheese." },
    { title: "Chocolate Cake", image: "chocolate-cake.jpg", category: "desserts", description: "Rich and moist chocolate cake topped with chocolate ganache." },
    { title: "Salad", image: "salad.jpg", category: "vegetarian", description: "A fresh and healthy salad with mixed greens and a vinaigrette dressing." },
    { title: "Spaghetti", image: "spaghetti.jpg", category: "vegetarian", description: "Spaghetti pasta served with a savory tomato sauce and herbs." },
    { title: "Sushi", image: "sushi.jpg", category: "non-vegetarian", description: "Assorted sushi rolls with fresh seafood and wasabi." },
    { title: "Ice Cream", image: "ice-cream.jpg", category: "desserts", description: "Creamy vanilla ice cream served with your choice of toppings." },
    { title: "Chicken Tenders", image: "chicken-tenders.jpg", category: "non-vegetarian", description: "Crispy chicken tenders served with a dipping sauce." },
    { title: "Mushroom Risotto", image: "mushroom-risotto.jpg", category: "vegetarian", description: "Creamy mushroom risotto cooked to perfection." },
    { title: "Pancakes", image: "pancakes.jpg", category: "desserts", description: "Fluffy pancakes served with maple syrup and fresh berries." },
    { title: "Hamburger", image: "hamburger.jpg", category: "non-vegetarian", description: "A classic hamburger with a juicy patty and all the fixings." },
    { title: "Fruit Salad", image: "fruit-salad.jpg", category: "vegetarian", description: "A refreshing fruit salad with a mix of seasonal fruits." },
    { title: "Steak", image: "steak.jpg", category: "non-vegetarian", description: "Grilled steak cooked to your preferred level of doneness." },
    { title: "Cupcakes", image: "cupcakes.jpg", category: "desserts", description: "Assorted cupcakes with creamy frosting and colorful sprinkles." },
    { title: "Nachos", image: "nachos.jpg", category: "non-vegetarian", description: "Loaded nachos with cheese, guacamole, and sour cream." },
    { title: "Tofu Stir-Fry", image: "tofu-stir-fry.jpg", category: "vegetarian", description: "Tofu stir-fry with a medley of fresh vegetables and a savory sauce." },
    { title: "BBQ Ribs", image: "bbq-ribs.jpg", category: "non-vegetarian", description: "Tender BBQ ribs smothered in barbecue sauce." },
    { title: "Cheesecake", image: "cheesecake.jpg", category: "desserts", description: "Creamy cheesecake with a graham cracker crust and fruit topping." },
    { title: "Fish Tacos", image: "fish-tacos.jpg", category: "non-vegetarian", description: "Fish tacos with crispy fish fillets and slaw in soft tortillas." },
    { title: "Eggplant Parmesan", image: "eggplant-parmesan.jpg", category: "vegetarian", description: "Eggplant Parmesan with layers of eggplant, marinara sauce, and cheese." },
  // Add more menu items here
];

function Menu() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Function to filter menu items based on category
  const filteredMenuItems = menuItems.filter((item) => {
    return (filter === 'all' || item.category === filter) &&
      (search === '' || item.title.toLowerCase().includes(search.toLowerCase()));
  });

  return (
    <div className="menu-container">
        <Header />

      <h1>Menu</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search for items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filter buttons */}
      <div className="filter-buttons">
      <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
  <button className={filter === 'vegetarian' ? 'active' : ''} onClick={() => setFilter('vegetarian')}>Vegetarian</button>
  <button className={filter === 'non-vegetarian' ? 'active' : ''} onClick={() => setFilter('non-vegetarian')}>Non-Vegetarian</button>
  <button className={filter === 'desserts' ? 'active' : ''} onClick={() => setFilter('desserts')}>Desserts</button>
      </div>

      {/* Grid container for menu items */}
      <div className="grid-container">
        {filteredMenuItems.map((item, index) => (
          <div key={index} className="menu-item">
            <img src={item.image} alt={item.title} />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
