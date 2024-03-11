// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import ProductList from './Components/Home/ProductList';
import SingleProduct from './Components/Home/SingleProduct';
import SingleCollection from './Components/Home/SingleCollection';
import CategoryShop from './Components/Home/CategoryShop';
import { CartProvider } from './Components/Home/CartContext';
import Cart from './Components/Home/Cart'
import Favourites from './Components/Home/Favourites';
import Login from './Components/Form/Login'
import Register from './Components/Form/Register';


function App() {
 
 
  return (
    
    <CartProvider>
      <div className="App">
        
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Collection" element={<Shop />} />
          <Route path="/" exact element={<ProductList />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/collections" element={<CategoryShop />} />
          <Route exact path="/collections/:collectionId" element={<SingleCollection />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favourites" element={< Favourites/>} />
          <Route path='/login' element={< Login />} />
          <Route path='/register' element={< Register />} />
          {/* <Route path="/favourites" component={Favourites} /> */}
        </Routes>
       
      </div>
    </CartProvider>
  );
}

export default App;
