import React from 'react'
import LOGO from '../cinema-logo.jpg' 

const Navbar = () => {
  return (
    <div className="flex items-center border-b p-4 space-x-8">
      <img className="w-[50px]" src={LOGO} alt="Logo" />

      <div className="flex space-x-8">
        <a href="/" className="text-lg font-medium font-bold hover:text-blue-500 transition">
          Home
        </a>
        <a href="/watchlist" className="text-lg font-medium font-bold hover:text-blue-500 transition">
          Watchlist
        </a>
      </div>
    </div>
  )
}

export default Navbar
