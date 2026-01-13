import React, { useState } from "react";
import {
  LayoutDashboard,
  Car,
  CalendarCheck,
  Bell,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function UserSidebar({ collapsed, setCollapsed }) {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "My Reservations", icon: <CalendarCheck size={20} />, path: "/dashboard/my-reservations" },
    { name: "Notifications", icon: <Bell size={20} />, path: "/dashboard/notifications" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-20 left-4 z-50 p-2 bg-gray-800 rounded-lg text-gray-200 hover:bg-gray-700 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky md:top-16 top-16 left-0 bg-gray-900 text-white ${collapsed ? 'w-16' : 'w-64'} h-screen overflow-y-auto transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-all duration-300 ease-in-out z-40 shadow-xl`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 border-b border-gray-700 mt-16 px-4">
          {!collapsed && <h1 className="text-xl font-bold text-[#FFD230]">My Dashboard</h1>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:block p-2 rounded-lg hover:bg-gray-800 transition"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col mt-4 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#FFD230] text-gray-900"
                    : "text-gray-300 hover:bg-gray-800 hover:text-[#FFD230]"
                } ${collapsed ? 'justify-center px-4' : ''}`
              }
              onClick={() => setIsOpen(false)}
              title={collapsed ? link.name : ''}
            >
              {link.icon}
              {!collapsed && link.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}