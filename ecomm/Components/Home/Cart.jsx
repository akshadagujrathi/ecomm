// Cart.js
import React from 'react';
import { useCart } from '../Home/CartContext';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

const Cart = () => {
  const { cart } = useCart();
  const items = Array.isArray(cart) ? cart : cart.items; // Handle both array and object

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <section className='cart'>
      <div className='container'>
        <h2>Your Shopping Cart</h2>

        {items.length === 0 ? (
          <>
            <p>Your cart is empty</p>
            <Link to="/">Continue Shopping</Link>
          </>
        ) : (
          <>
            <div className='row d-flex'>
              <ul className='col-9'>
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </ul>

              <div className='col-2'>
                <p>Total: ${totalPrice}</p>
                <button className='btn btn-success'>Checkout</button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
