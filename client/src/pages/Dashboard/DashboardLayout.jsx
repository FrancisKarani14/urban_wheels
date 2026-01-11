import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DashSidebar from "./DashSidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar stays fixed */}
      <Navbar />

      {/* Main dashboard area */}
      <div className="flex pt-16"> {/* pt-16 = offset for fixed navbar */}
        <DashSidebar />
        
        <main className="flex-1 overflow-y-auto max-h-screen p-4 text-gray-900">
          <Outlet /> {/* renders nested dashboard pages */}
        </main>
      </div>
    </div>
  );
}
