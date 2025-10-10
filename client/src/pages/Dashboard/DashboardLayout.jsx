import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DashSidebar from "./DashSidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <DashSidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 bg-gray-100 text-gray-900">
          <Outlet /> {/* renders the nested route content */}
        </main>
        <Footer />
      </div>
    </div>
  );
}
