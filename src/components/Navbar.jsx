import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[90%] md:w-auto z-50">
      <div className="flex justify-between items-center p-2 bg-[#0c0a0925] rounded-2xl mt-2">
        {/* Logo */}
        <h1 className="font-bold text-xl text-[#05DF72]">
          Urban_<span className="text-[#FFDF20]">Wheels</span>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-[#F8FAFC] ml-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-[#2B7FFF] font-semibold"
                : "text-[#EEF2FF] hover:text-[#FFD230] font-semibold"
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

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-[#0c0a09f0] mt-2 rounded-xl flex flex-col items-center gap-6 py-4 text-[#F8FAFC]">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-[#2B7FFF] font-semibold"
                : "text-[#EEF2FF] hover:text-[#FFD230] font-semibold"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-[#2B7FFF] font-semibold"
                : "text-[#EEF2FF] hover:text-[#FFD230] font-semibold"
            }
          >
            Book Now
          </NavLink>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
