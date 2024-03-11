// ProductList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shuffle } from 'lodash';
import { useCart } from './CartContext';
import { FaHeart } from 'react-icons/fa';
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { cart,dispatch } = useCart();
  
//  //setfavorites
//  const [favorites, setFavorites] = useState(() => {
//   const jsonValue = localStorage.getItem('favorites');
//   if (jsonValue !== null) return JSON.parse(jsonValue);
//   return [];
// });

// useEffect(() => {
//   localStorage.setItem('favorites', JSON.stringify(favorites));
// }, [favorites]);

//  const handleFavorite = (product) => {
//     // Toggle the favorite status
//     const isFavorite = favorites.some((favItem) => favItem.id === product.id);

//     if (isFavorite) {
//       // Remove from favorites if already favorited
//       setFavorites((prevFavorites) => prevFavorites.filter((favItem) => favItem.id !== product.id));
//     } else {
//       // Add to favorites if not favorited
//       setFavorites((prevFavorites) => [...prevFavorites, { ...product }]);
//     }
//   };

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=6')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const shuffledProducts = shuffle(products);

 
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };
  const addToFavorites = (product) => {
    console.log('Adding to favorites:', product);
    const isFavorite = cart.favorites.some((item) => item.id === product.id);
  
    if (isFavorite) {
      // Product is already in favorites, remove it
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: product });
    } else {
      // Product is not in favorites, add it
      dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
    }
  };
 
  
  return (
    <div className='section' id="product-grid">
      <div className="container">
        <h2>Best Selling</h2>
        <div className="product-list row d-flex">
          {shuffledProducts.map(product => (
            <div className="product-card-col col-12 col-md-3 col-lg-3" key={product.id}>
              <div className='product-card position-relative'>
                <Link to={`/products/${product.id}`}>
                  <img className="productCard-img img-fluid" src={product.image} alt={product.title} />
                 <span><h6 className="text-left productCard-title">{product.title}</h6></span>
                </Link>
             
                <FaHeart onClick={() => addToFavorites(product)} className={`heart ${cart.favorites.some((item) => item.id === product.id) ? 'active' : ''}`} />
      
                <p className="text-left text-dark">{product.category}</p>
                
                <p className="text-left"> <span>${product.price}</span></p>
                {/* <button onClick={() => handleFavorite(product)}>Mark as favorite</button> */}
                
                <button className='d-block btn-primary' onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
                {/* <button onClick={() => handleCart(product)} >Add to cart</button> */}
                {/* <button onClick={() => handleFavorite(product)}>Mark as favorite</button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
