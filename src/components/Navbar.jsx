import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
      <nav>
          <Link to="/" >Home </Link>
          <Link to="/about" >About Urban_Wheels </Link>
          <Link to="/book" >Book now </Link>
      
    </nav>
  )
}

export default Navbar
