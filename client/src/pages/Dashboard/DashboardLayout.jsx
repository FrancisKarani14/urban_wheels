import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import DashSidebar from "./DashSidebar";
import UserSidebar from "./UserSidebar";

export default function DashboardLayout() {
  const userRole = localStorage.getItem('user_role');
  const isLoggedIn = localStorage.getItem('access_token');
  
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex pt-16">
        {userRole === 'admin' ? <DashSidebar /> : <UserSidebar />}
        <main className="flex-1 overflow-y-auto max-h-screen p-4 text-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
