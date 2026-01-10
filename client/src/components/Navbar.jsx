import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const isLoggedIn = localStorage.getItem('access_token');
  const userEmail = localStorage.getItem('user_email') || '';
  
  const getInitials = (email) => {
    if (!email) return 'U';
    const name = email.split('@')[0];
    return name.slice(0, 2).toUpperCase();
  };
  
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_email');
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[black] backdrop-blur-md">
      <div className="flex items-center justify-between px-6 md:px-16 py-3">
        {/* Logo */}
        <h1 className="font-bold text-2xl text-[#05DF72]">
          Urban_<span className="text-[#FFDF20]">Wheels</span>
        </h1>

        {/* Desktop Nav - Centered */}
        <nav className="hidden md:flex gap-10 text-[#F8FAFC] absolute left-1/2 transform -translate-x-1/2">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/book", label: "Book Now" },
            ...(isLoggedIn ? [{ to: "/dashboard", label: "Dashboard" }] : []),
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

        {/* Right Side - Auth */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-10 h-10 bg-[#05DF72] rounded-full flex items-center justify-center text-black font-bold hover:bg-[#04c766] transition-colors"
                >
                  {getInitials(userEmail)}
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="bg-[#05DF72] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#04c766] transition-colors"
            >
              Get Started
            </NavLink>
          )}
        </div>

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
            ...(isLoggedIn ? [{ to: "/dashboard", label: "Dashboard" }] : []),
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
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="flex items-center gap-2 text-[#EEF2FF] hover:text-[#FFD230] font-semibold transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className="bg-[#05DF72] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#04c766] transition-colors"
            >
              Get Started
            </NavLink>
          )}
        </nav>
      )}
    </header>
  );
}

export default Navbar;