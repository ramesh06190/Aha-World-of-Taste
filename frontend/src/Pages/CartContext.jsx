import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    // Check if the item is already in the cart
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      // If it exists, increment the count
      incrementCartItem(existingItem.id);
    } else {
      // If not, add it to the cart with an initial count of 1
      setCart([...cart, { ...item, count: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    // Check if the item is in the cart
    const existingItem = cart.find((cartItem) => cartItem.id === itemId);
    if (existingItem) {
      // If the item is in the cart and its count is greater than 1, decrement the count
      if (existingItem.count > 1) {
        decrementCartItem(itemId);
      } else {
        // If the count is 1, remove the item from the cart
        setCart(cart.filter((item) => item.id !== itemId));
      }
    }
  };

  const incrementCartItem = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, count: item.count + 1 } : item
      )
    );
  };

const decrementCartItem = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, count: Math.max(item.count - 1, 0) } : item
      )
    );
  };
  

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementCartItem, decrementCartItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
