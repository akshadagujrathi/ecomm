// CategoryShop.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CategoryShop = ({ limit }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch all categories
    fetch('https://fakestoreapi.com/products/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  // Use the limit prop to slice the categories array
  const limitedCategories = categories.slice(0, limit);

  return (
    <div className='collection-list'>
      <div className='container'>
        <h2>New Collection</h2>
        <div className='row d-flex justify-content-center my-5'>
          {limitedCategories.map(category => (
            <div key={category} className='d-flex justify-content-center align-items-center col-12 col-md-5 col-lg-5 mb-3 collection-card  mx-2' id={category}>
              <Link to={`/collections/${encodeURIComponent(category)}`} className='text-decoration-none'>
                <div className=' p-4'>
                  <h3 className="text-white text-capitalize mb-0">{category}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryShop;
