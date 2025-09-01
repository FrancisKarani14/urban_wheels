import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className="flex justify-center items-center gap-7 p-2 fixed top-0 left-1/2 transform -translate-x-1/2 bg-[#0c0a0925] rounded-2xl mt-2">
      <h1 className="font-bold text-xl text-[#05DF72]">Urban_<span className='text-[#FFDF20]'>Wheels</span></h1>
      <nav className="flex gap-8 text-[#F8FAFC] ">
        <NavLink 
        to="/" 
        className={({ isActive }) =>
          isActive 
            ? "text-[#2B7FFF] font-semibold"   // active style
            : "text-[#EEF2FF] hover:text-[#FFD230] font-semibold" // normal + hover style
        }
      >
        Home
      </NavLink>

      <NavLink 
        to="/about" 
        className={({ isActive }) =>
          isActive 
            ? "text-[#2B7FFF] font-semibold" 
            : "text-[#EEF2FF] hover:text-[#FFD230] font-semibold"
        }
      >
        About
      </NavLink>

      <NavLink 
        to="/book" 
        className={({ isActive }) =>
          isActive 
            ? "text-[#2B7FFF] font-semibold" 
            : "text-[#EEF2FF] hover:text-[#FFD230] font-semibold"
        }
      >
        Book Now
      </NavLink>
      </nav>
    </div>
  );
}

export default Navbar
