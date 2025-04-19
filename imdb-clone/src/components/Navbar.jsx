import React from 'react';
import LOGO from '../cinema-logo.jpg';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-900 shadow-md border-b border-gray-700">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        
        <span className="text-white text-3xl font-extrabold">CineHive</span>
      </div>

      {/* Links */}
      <div className="flex space-x-8">
        <Link
          to="/"
          className="text-gray-200 text-xl font-semibold hover:text-white transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/watchlist"
          className="text-gray-200 text-xl font-semibold hover:text-white transition duration-300"
        >
          Watchlist
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
