// CartItem.js
import React from 'react';
import { useCart } from '../Home/CartContext';

const CartItem = ({ item }) => {
  const { dispatch } = useCart();

  const handleQuantityChange = (newQuantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: newQuantity } });
  };

  const handleIncrement = () => {
    const updatedQuantity = item.quantity + 1;
    handleQuantityChange(updatedQuantity);
  };

  const handleDecrement = () => {
    const updatedQuantity = Math.max(1, item.quantity - 1);
    handleQuantityChange(updatedQuantity);
  };

  const removeFromCart = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id: item.id } });
  };

  const addToFavorites = () => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: { ...item } });
  };

  return (
    <li key={item.id} className='row d-flex'>
      <div className='col-3'>
        <img className="cart-img img-fluid" src={item.image} alt={item.title} />
      </div>
      <div className='col-5 text-left'>
        <h6 className="text-left">{item.title}</h6>
        <p>Price: ${item.price}</p>
        <p className='quantity-selector d-flex'>
          Quantity:
          <button onClick={handleDecrement}>-</button>
          <span>{item.quantity}</span>
          <button onClick={handleIncrement}>+</button>
          <button onClick={removeFromCart}>Remove</button>
          <button onClick={addToFavorites}>Add to Favorites</button>
        </p>
      </div>
      <div className='col-2 text-left'>
        <p>Total: ${item.price * item.quantity}</p>
      </div>
    </li>
  );
};

export default CartItem;
