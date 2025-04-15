import React from 'react'
import LOGO from '../cinema-logo.jpg' 

import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex items-center border space-x-8 pl-3 py-4">
      <img className="w-[60px]" src={LOGO} alt="Logo" />

      <div className="flex space-x-8">
        <Link to="/" className="text-blue-500 text-2xl  font-bold hover:text-blue-900 transition">
          Home
        </Link>
        <Link to="/watchlist" className="text-blue-500 text-2xl  font-bold hover:text-blue-900 transition    ">
          Watchlist
        </Link>
      </div>
    </div>
  )
}

export default Navbar
