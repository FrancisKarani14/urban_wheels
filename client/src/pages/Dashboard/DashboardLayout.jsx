import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DashSidebar from "./DashSidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar stays fixed */}
      <Navbar />

      {/* Main dashboard area */}
      <div className="flex flex-1 pt-16"> {/* pt-16 = offset for fixed navbar */}
        <DashSidebar />
        
        <main className="flex-1 p-4 text-gray-900">
          <Outlet /> {/* renders nested dashboard pages */}
        </main>
      </div>

      <Footer />
    </div>
  );
}
