import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Book from "./pages/Book";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Reserve from "./components/Reserve";
import Contact from "./components/Contact";


// Dashboard Imports
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import Cars from "./pages/Dashboard/Cars";
import Reservations from "./pages/Dashboard/Reservations";
import Users from "./pages/Dashboard/Users";

function App() {
  return (
    <div className="bg-[#292524] min-h-screen max-w-full overflow-x-hidden">
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/book" element={<Book />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />

        {/* --- Dashboard Routes (Protected later with JWT) --- */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} /> {/* default */}
          <Route path="home" element={<DashboardHome />} />
          <Route path="cars" element={<Cars />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
