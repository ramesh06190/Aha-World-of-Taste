import React, { createContext, useContext, useState, useEffect } from "react";
import { post } from "../api/ApiService";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [adminToken, setAdminToken] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const Token = localStorage.getItem("userToken");
    setAdminToken(Token);
  }, []);

  useEffect(() => {
    const headers = {
      token: adminToken,
    };

    try {
      const fetchUserDetails = async () => {
        const result = await post('user/user-detail', {}, headers);
        if (result && result.user && result.user.cart) {
          setCart(result.user.cart); // Update user data state
        } else {
          setCart([]); // Set an empty cart if the response doesn't have one
        }
      };

      fetchUserDetails(); // Call the async function
    } catch (error) {
      console.error(error, "Error fetching user details");
    }
  }, [adminToken]);

  useEffect(() => {
    const headers = {
      token: adminToken,
    };
    if (cart.length > 0) {
      try {
        const result = post('user/update-cart', {
          userId: userId,
          cart: cart,
        }, headers);

        if (result.status) {
          console.log(result, "Cart updated successfully");
        }
      } catch (error) {
        console.error(error, "Error updating cart");
      }
    }
  }, [cart, adminToken, userId]);


  const addToCart = (item) => {
    // Check if the item is already in the cart
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      // If it exists, increment the count
      incrementCartItem(existingItem.id);
    } else {
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
