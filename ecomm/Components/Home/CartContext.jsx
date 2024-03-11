// CartContext.js
import React, { createContext, useReducer, useContext } from 'react';

// Define the initial state for the cart
const initialCart = {
  items: [],
  favorites: [],
};

// Define the cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingProduct = state.items.find(item => item.id === action.payload.id);

      if (existingProduct) {
        // If the product already exists in the cart, update the quantity
        return { ...state, items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        )};
      } else {
        // If the product is not in the cart, add it with quantity 1
        return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
      }

    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
      return { ...state, items: updatedItems };

    case 'REMOVE_FROM_CART':
      const updatedCart = { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
      return updatedCart;

      case 'ADD_TO_FAVORITES':
  const existingFavoriteIndex = state.favorites.findIndex(
    (item) => item.id === action.payload.id
  );

  if (existingFavoriteIndex !== -1) {
    // Product is already in favorites, remove it
    const updatedFavorites = [...state.favorites];
    updatedFavorites.splice(existingFavoriteIndex, 1);
    return { ...state, favorites: updatedFavorites };
  } else {
    // Product is not in favorites, add it
    return { ...state, favorites: [...state.favorites, action.payload] };
  }

case 'REMOVE_FROM_FAVORITES':
  const updatedFavorites = state.favorites.filter(
    (item) => item.id !== action.payload.id
  );
  return { ...state, favorites: updatedFavorites };
      
        
    default:
      return state;
  }
};

// Create a context for the cart
const CartContext = createContext();

// Create the CartProvider component
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to access the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
