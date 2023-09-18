import React, { useState } from 'react';
import './Menu.css';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const menuItems = [
  { title: "Veggie Burger", image: "veggie-burger.jpg", category: "vegetarian", description: "A delicious veggie burger with fresh veggies and a special sauce.", price: 9.99 },
  { title: "Chocolate Cake", image: "chocolate-cake.jpg", category: "desserts", description: "Rich and moist chocolate cake topped with chocolate ganache.", price:15 },
  { title: "Salad", image: "salad.jpg", category: "vegetarian", description: "A fresh and healthy salad with mixed greens and a vinaigrette dressing." , price:15},
  { title: "Spaghetti", image: "spaghetti.jpg", category: "vegetarian", description: "Spaghetti pasta served with a savory tomato sauce and herbs.", price:15 },
  { title: "Sushi", image: "sushi.jpg", category: "non-vegetarian", description: "Assorted sushi rolls with fresh seafood and wasabi.", price:15 },
  { title: "Ice Cream", image: "ice-cream.jpg", category: "desserts", description: "Creamy vanilla ice cream served with your choice of toppings.", price:15 },
  { title: "Chicken Tenders", image: "chicken-tenders.jpg", category: "non-vegetarian", description: "Crispy chicken tenders served with a dipping sauce.", price:15 },
  { title: "Mushroom Risotto", image: "mushroom-risotto.jpg", category: "vegetarian", description: "Creamy mushroom risotto cooked to perfection.", price:15 },
  { title: "Pancakes", image: "pancakes.jpg", category: "desserts", description: "Fluffy pancakes served with maple syrup and fresh berries.", price:15 },
  { title: "Hamburger", image: "hamburger.jpg", category: "non-vegetarian", description: "A classic hamburger with a juicy patty and all the fixings.", price:15 },
  { title: "Fruit Salad", image: "fruit-salad.jpg", category: "vegetarian", description: "A refreshing fruit salad with a mix of seasonal fruits.", price:15 },
  { title: "Steak", image: "steak.jpg", category: "non-vegetarian", description: "Grilled steak cooked to your preferred level of doneness.", price:15 },
  { title: "Cupcakes", image: "cupcakes.jpg", category: "desserts", description: "Assorted cupcakes with creamy frosting and colorful sprinkles.", price:15 },
  { title: "Nachos", image: "nachos.jpg", category: "non-vegetarian", description: "Loaded nachos with cheese, guacamole, and sour cream.", price:15 },
  { title: "Tofu Stir-Fry", image: "tofu-stir-fry.jpg", category: "vegetarian", description: "Tofu stir-fry with a medley of fresh vegetables and a savory sauce.", price:15 },
  { title: "BBQ Ribs", image: "bbq-ribs.jpg", category: "non-vegetarian", description: "Tender BBQ ribs smothered in barbecue sauce." , price:15},
  { title: "Cheesecake", image: "cheesecake.jpg", category: "desserts", description: "Creamy cheesecake with a graham cracker crust and fruit topping.", price:15 },
  { title: "Fish Tacos", image: "fish-tacos.jpg", category: "non-vegetarian", description: "Fish tacos with crispy fish fillets and slaw in soft tortillas." , price:15},
  { title: "Eggplant Parmesan", image: "eggplant-parmesan.jpg", category: "vegetarian", description: "Eggplant Parmesan with layers of eggplant, marinara sauce, and cheese.", price:15 },
];

const filterCategories = ['all', 'vegetarian', 'non-vegetarian', 'desserts'];

function Menu() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  const [itemQuantities, setItemQuantities] = useState(
    menuItems.reduce((quantities, item) => {
      quantities[item.title] = 1;
      return quantities;
    }, {})
  );

  const filteredMenuItems = menuItems.filter((item) => {
    return (filter === 'all' || item.category === filter) &&
      (search === '' || item.title.toLowerCase().includes(search.toLowerCase()));
  });

  const addToCart = (item) => {
    const quantity = itemQuantities[item.title];
    const cartItem = { ...item, quantity };
    setCart([...cart, cartItem]);
    alert(`Added ${quantity} ${item.title}(s) to the cart.`);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const toggleCartVisible = () => {
    setCartVisible(!cartVisible);
  };

  const totalPrice = cart.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);

  return (
    <div className="menu-container">
      <Header />
      <h1>Menu</h1>
      <input
        type="text"
        placeholder="Search for Food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '300px', height: '25px' }}
      />
      <div className="filter-buttons">
        {filterCategories.map((category) => (
          <button
            key={category}
            className={filter === category ? 'active' : ''}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid-container">
        {filteredMenuItems.map((item) => (
          <div key={item.title} className="menu-item">
            <img src={item.image} alt={item.title} />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>
              Qty:{' '}
              <input
                type="number"
                value={itemQuantities[item.title]}
                onChange={(e) => {
                  const newQuantities = { ...itemQuantities };
                  newQuantities[item.title] = parseInt(e.target.value);
                  setItemQuantities(newQuantities);
                }}
                min={1}
                style={{ width: '40px', height: '20px' }}
              />
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </p>
          </div>
        ))}
      </div>
      <div className="cart-icon" onClick={toggleCartVisible}>
        <FontAwesomeIcon icon={faShoppingCart} />
        <span className="cart-count">{cart.length}</span>
      </div>
      {cartVisible && (
        <div className="cart">
          <h3>Cart</h3>
          <ul>
            {cart.map((cartItem, index) => (
              <li key={cartItem.title}>
                {cartItem.title} - ${cartItem.price.toFixed(2)} x {cartItem.quantity}{' '}
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default Menu;
