import React from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../Components/Home/CartContext';

const Header = () => {
  const { cart } = useCart();

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand col-12 col-md-2" to="/">
          BUNKERS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav col-12 col-md-10 col-lg-10 justify-content-center">
            <li className="nav-item active">
              <Link className="nav-link text-light" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/Collection">
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light">Disabled</Link>
            </li>
          </ul>
          <div className="icons col-12 col-md-2">
            <Link to='/login'>
            <CgProfile />
            </Link>
            <Link to="/favourites" className='position-relative heart-icon'>
              <FaHeart className={cart.favorites.length > 0 ? 'active' : ''} />
              {cart.favorites.length > 0 && <span className="favorite-count">{cart.favorites.length}</span>}
            </Link>
            <Link to="/cart" className='position-relative'>
              <FaShoppingCart />
              <span className="cart-count">{cart && cart.items ? cart.items.length : ''}</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
