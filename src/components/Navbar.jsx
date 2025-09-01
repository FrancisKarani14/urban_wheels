import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="flex justify-center items-center gap-10 p-4 ">
      <h1 className="font-bold text-xl text-[#F8FAFC]">Urban_<span className='text-[#FFDF20]'>Wheels</span></h1>
      <nav className="flex gap-8 text-[#F8FAFC] ">
        <Link to="/">Home</Link>
        <Link to="/about">About Urban_Wheels</Link>
        <Link to="/book">Book now</Link>
      </nav>
    </div>
  );
}

export default Navbar
