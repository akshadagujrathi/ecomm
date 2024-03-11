// Favorites.js
import React from 'react';
import { useCart } from '../Home/CartContext';
import { Link } from 'react-router-dom';

const Favourites = () => {
  const { cart, dispatch } = useCart();

  const removeFromFavorites = (productId) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: { id: productId } });
  };

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className='favourite-page'>
      <div className="container">
        <h2>Your Favorite Products</h2>
        <div className="product-list row d-flex">
          {cart.favorites.map((product) => (
            <div className="product-card-col col-12 col-md-3 col-lg-3" key={product.id}>
              <div className='product-card'>
                <Link to={`/products/${product.id}`}>
                  <img className="productCard-img img-fluid" src={product.image} alt={product.title} />
                  <h6 className="text-left productCard-title">{product.title}</h6>
                </Link>
                <p className="text-left text-dark">{product.category}</p>
                <p className="text-left"> <span>${product.price}</span></p>
                <div className="buttons">
                  <button onClick={() => removeFromFavorites(product.id)}>Remove</button>
                  <button className='add-cart mx-2' onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
