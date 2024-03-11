import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shuffle } from 'lodash';
import { useCart } from './CartContext';
import { FaHeart } from 'react-icons/fa';
const CollectionTab = () => {
  const [products, setProducts] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('jewelery');
  const { cart, dispatch } = useCart();
  
//    //setfavorites
//  const [favorites, setFavorites] = useState(() => {
//   const jsonValue = localStorage.getItem('favorites');
//   if (jsonValue !== null) return JSON.parse(jsonValue);
//   return [];
// });

// useEffect(() => {
//   localStorage.setItem('favorites', JSON.stringify(favorites));
// }, [favorites]);

// const handleFavorite = (product) => {
//   setFavorites((prevFavorites) => [...prevFavorites, product]);
//   console.log(favorites);
// };
  
  useEffect(() => {
    // Fetch product data from an external API
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);
  
  
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
  
  // Get unique collections from products
  const collections = Array.from(new Set(products.map(product => product.category)));

  const filteredProducts = selectedCollection === 'all'
  ? shuffle(products).slice(0,8) // Shuffle all products and show the first 4
  : shuffle(products.filter(product => product.category === selectedCollection)).slice(0,3); // Shuffle and show 4 from the selected collection

  // const isFavorite = (productId) => cart.favorites.some((item) => item.id === productId);
    return (
        <div className='collection-tab-section'>
            <div className='container'>
                {/* Collection tabs */}
                <div className="collection-tabs d-flex">
                    <span><h2>New Arrivals</h2></span>
                    <div className='ml-auto'>  
                    <button onClick={() => setSelectedCollection('all')}>All</button>
                    {collections.map(category => (
                        <button key={category} onClick={() => setSelectedCollection(category)}>
                            {category}
                        </button>
                       
                  ))}
                  </div>
        </div>


        {/* Render product cards based on the selected collection */}
        <div className="product-list row d-flex">
          {filteredProducts.map(product => (
            <div className="product-card-col  col-12 col-md-4 col-lg-3">
                <div className="product-card position-relative" key={product.id}>
                    <Link to={`/products/${product.id}`}>
                    <img className="productCard-img img-fluid" src={product.image} alt={product.title} />
                       <h6 className="text-left productCard-title">{product.title}</h6>
                    </Link>
                    <FaHeart onClick={() => addToFavorites(product)} className={`heart ${cart.favorites.some((item) => item.id === product.id) ? 'active' : ''}`} />
                    <p className="text-left text-dark">{product.category}</p>
   
                   <p className="text-left"> <span>${product.price}</span></p>
                   {/* <button onClick={() => handleFavorite(product)}>Mark as favorite</button> */}
                   
                   <button className='d-block' onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
                {/* <button onClick={() => handleCart(product)} >Add to cart</button> */}
                </div>
            </div>
          ))}
        </div>

        </div>

      </div>

      
    );
}

export default CollectionTab;
