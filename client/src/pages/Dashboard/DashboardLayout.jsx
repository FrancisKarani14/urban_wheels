import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import DashSidebar from "./DashSidebar";
import UserSidebar from "./UserSidebar";

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const userRole = localStorage.getItem('user_role');
  const isLoggedIn = localStorage.getItem('access_token');
  
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex pt-16">
        {userRole === 'admin' ? 
          <DashSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} /> : 
          <UserSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        }
        <main className={`flex-1 overflow-auto max-h-screen p-4 text-gray-900 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        } md:ml-0`}>
          <div className="overflow-x-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
