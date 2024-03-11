import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from './CartContext';
import { FaHeart } from 'react-icons/fa';
// import { useParams } from 'react-router-dom';
const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const {productId} = useParams();
  const { cart,dispatch } = useCart();
 
  //  //TODO Add cart functionality
  //  const [cart, setCart] = useState(()=>{
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


console.log("hii")
  useEffect(() => {
    // Fetch product data for the specified productId
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [productId]);
  
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };
  const addToFavorites = (product) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
  };
  
  if (!product) {
    return <p>Loading...</p>;
  }
    return (
        <div className="section single-product position-relative">
          <div className='container'>
            <div className='row '>
            <div className="product-detail d-flex">
              <div className='col-12 col-md-6'>
              <img className="img-fluid product-img" src={product.image} alt={product.name} />
              </div>
              <div className='col-12 col-md-6 text-left'>
                  <h2>{product.title}</h2>
                  <p className="text-left text-dark">{product.category}</p>
                  <FaHeart onClick={() => addToFavorites(product)} className={`heart ${cart.favorites.some((item) => item.id === product.id) ? 'active' : ''}`} />
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                  <button className='d-block' onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
                 {/* <button onClick={() => handleCart(product)} >Add to cart</button> */}
                  <Link className='d-block btn btn-danger my-2' to="/">Buy Now</Link>
              </div>
              </div>
            </div>
          </div>
    
        </div>
    );
}

export default SingleProduct;
