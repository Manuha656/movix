import React from 'react'
import Logo from '../logo-movie.jpg'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex items-center border space-x-10 p-3'>
        
        <img src={Logo} alt="Movix" className='w-[50px]'/>
        <Link to="/" className='text-gray-500 text-2xl font-bold'>Movies</Link>
        <Link to="/watchlist" className='text-gray-500 text-2xl font-bold'>WatchList</Link>

    </div>
  )
}

export default Navbar