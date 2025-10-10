import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0c0a0925] backdrop-blur-md">
      <div className="flex items-center justify-between px-6 md:px-16 py-3">
        {/* Logo */}
        <h1 className="font-bold text-2xl text-[#05DF72]">
          Urban_<span className="text-[#FFDF20]">Wheels</span>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 text-[#F8FAFC]">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/book", label: "Book Now" },
            { to: "/Dashboard", label: "Dashboard" },
            { to: "/login", label: "Login" },
            { to: "/Signup", label: "Signup" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "text-[#05DF72] font-semibold"
                  : "text-[#EEF2FF] hover:text-[#FFD230] font-semibold transition-colors"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-[#0c0a09f0] rounded-b-2xl flex flex-col items-center gap-6 py-4 text-[#F8FAFC]">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/book", label: "Book Now" },
            { to: "/Dashboard", label: "Dashboard" },
            { to: "/login", label: "Login" },
            { to: "/Signup", label: "Signup" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-[#05DF72] font-semibold"
                  : "text-[#EEF2FF] hover:text-[#FFD230] font-semibold transition-colors"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
