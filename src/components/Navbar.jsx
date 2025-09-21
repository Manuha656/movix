import React from 'react'
import Logo from '../logo-movie.jpg'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      {/* Left - Logo */}
      <div className="flex items-center space-x-4">
        <img src={Logo} alt="Movix" className="w-[50px] rounded-md" />
        <span className="text-gray-800 text-2xl font-extrabold tracking-wide">
          Movix
        </span>
      </div>

      {/* Right - Links */}
      <div className="flex space-x-8">
        <Link
          to="/"
          className="text-gray-700 text-lg font-semibold hover:text-blue-500 transition"
        >
          Movies
        </Link>
        <Link
          to="/watchlist"
          className="text-gray-700 text-lg font-semibold hover:text-blue-500 transition"
        >
          Watchlist
        </Link>
      </div>
    </div>
  )
}

export default Navbar
