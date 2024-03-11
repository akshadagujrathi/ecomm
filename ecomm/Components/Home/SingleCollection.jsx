// SingleCollection.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { FaHeart } from 'react-icons/fa';

const SingleCollection = () => {
  const [collectionData, setCollectionData] = useState([]);
  const { collectionId } = useParams();
  const { cart, dispatch } = useCart();
  useEffect(() => {
    // Fetch products for a specific category
    fetch(`https://fakestoreapi.com/products/category/${collectionId}`)
      .then(response => response.json())
      .then(data => setCollectionData(data))
      .catch(error => console.error('Error fetching collection details:', error));
  }, [collectionId]);
  
  
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const addToFavorites = (product) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
  };
// //TODO Add cart functionality
// const [cart, setCart] = useState(()=>{
//   const jsonValue = localStorage.getItem('cart');
//   if(jsonValue !== null) return JSON.parse(jsonValue);
//   return [];
// });
// useEffect(()=>{
//   localStorage.setItem('cart', JSON.stringify(cart));
// }, [cart]);

// const handleCart = (product) => {
//   const existingProductIndex = cart.findIndex((cartItem) => cartItem.id === product.id);

//   if (existingProductIndex === -1) {
//     // Add the product to the cart if it's not already present
//     setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
//   } else {
//     // Update the quantity if the product is already in the cart
//     const updatedCart = [...cart];
//     updatedCart[existingProductIndex].quantity += 1;
//     setCart(updatedCart);
//   }
// };

  if (!collectionData.length) {
    return <p>Loading...</p>;
  }

  
  return (
    <div className='single-collection'>
      <div className='container'>
        <h2>{collectionId}</h2>
        <div className='row d-flex'>
         
          {collectionData.map(product => (
            <div className="product-card-col col-12 col-md-3 col-lg-3" key={product.id}>
            <div className='product-card'>
              <Link to={`/products/${product.id}`}>
                <img className="productCard-img img-fluid" src={product.image} alt={product.title} />
                <h6 className="text-left productCard-title">{product.title}</h6>
              </Link>
              {/* <p className="text-left text-dark">{product.category}</p> */}
              
              <p className="text-left"> <span>${product.price}</span></p>
              {/* <button onClick={() => handleFavorite(product)}>Mark as favorite</button> */}
              <FaHeart onClick={() => addToFavorites(product)} className={`heart ${cart.favorites.some((item) => item.id === product.id) ? 'active' : ''}`} />
              <button className='d-block' onClick={() => addToCart(product)}>
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

export default SingleCollection;
