import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import logo from "../assets/PizzaAppititeFInalLogo.png";
import { logoutUser } from '../actions/userActions';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const cartState = useSelector(state => state.cartReducer);
  const userState = useSelector(state => state.loginReducer);
  const currentUser = userState?.currentUser;
  const navigate=useNavigate()

  const cartItemCount = cartState.cartItems?.length || 0;
  const dispatch = useDispatch()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-red-500 to-yellow-400 shadow-lg fixed top-0 left-0 w-full z-50 h-16">
        <div className="container mx-auto flex items-center justify-between h-full px-6">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="PizzaAppetite Logo" className="w-12 drop-shadow-lg" />
            <span className="text-white text-2xl font-bold tracking-wider drop-shadow-lg">
              Pizza<span className="text-yellow-200">Appetite</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 font-semibold text-white">
            <Link to="/" className="hover:text-yellow-300 transition-transform transform hover:scale-110">Home</Link>
            <Link to="/menu" className="hover:text-yellow-300 transition-transform transform hover:scale-110">Menu</Link>
            <Link to="/orders" className="hover:text-yellow-300 transition-transform transform hover:scale-110">Orders</Link>
            <Link to="/cart" className="relative hover:text-yellow-300 transition-transform transform hover:scale-110">
              Cart
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            </Link>
            {currentUser?.name ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="hover:text-yellow-300 transition-transform transform hover:scale-110 flex items-center gap-1 focus:outline-none"
                >
                  {currentUser.name}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-100 hover:text-yellow-500"
                    >
                      Profile
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-100 hover:text-yellow-500"
                      onClick={() => {
                        // logout user logic
                        dispatch(logoutUser())
                        window.location.reload();
                        window.location.href="/login"
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hover:text-yellow-300 transition-transform transform hover:scale-110">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Mobile Links */}
        <div
          className={`md:hidden bg-red-500 text-white py-4 px-6 space-y-4 absolute w-full shadow-lg transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <Link to="/" className="block text-lg hover:text-yellow-300 transition-transform transform hover:scale-110">Home</Link>
          <Link to="/menu" className="block text-lg hover:text-yellow-300 transition-transform transform hover:scale-110">Menu</Link>
          <Link to="/cart" className="block text-lg relative hover:text-yellow-300 transition-transform transform hover:scale-110">
            Cart
            <span className="absolute -top-1 -right-4 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          </Link>
          <Link to="/orders" className="block text-lg hover:text-yellow-300 transition-transform transform hover:scale-110">Orders</Link>
          {currentUser?.name ? (
            <Link to="/profile" className="block text-lg hover:text-yellow-300 transition-transform transform hover:scale-110">
              {currentUser.name}
            </Link>
          ) : (
            <Link to="/login" className="block text-lg hover:text-yellow-300 transition-transform transform hover:scale-110">Login</Link>
          )}
        </div>
      </nav>

      {/* Content Wrapper */}
      <div className="pt-16">
        {/* Page content will go here */}
      </div>
    </>
  );
};

export default Navbar;
