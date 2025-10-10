import React, { useState, useEffect } from "react";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalCars: 0,
    reservedCars: 0,
    availableCars: 0,
    totalUsers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Replace these endpoints with your actual backend routes
        const [carsRes, reservationsRes, usersRes] = await Promise.all([
          fetch("http://localhost:5000/cars"),          // example endpoint
          fetch("http://localhost:5000/reservations"),  // example endpoint
          fetch("http://localhost:5000/users"),         // example endpoint
        ]);

        const cars = await carsRes.json();
        const reservations = await reservationsRes.json();
        const users = await usersRes.json();

        const reservedCars = reservations.length;
        const totalCars = cars.length;
        const availableCars = totalCars - reservedCars;
        const totalUsers = users.length;

        setStats({
          totalCars,
          reservedCars,
          availableCars,
          totalUsers,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
      <p className="text-gray-500 mb-6">A quick summary of your Urban Wheels operations</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Total Cars</h2>
          <p className="text-3xl font-bold mt-2">
            {loading ? "..." : stats.totalCars}
          </p>
        </div>

        <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Reserved Cars</h2>
          <p className="text-3xl font-bold mt-2">
            {loading ? "..." : stats.reservedCars}
          </p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Available Cars</h2>
          <p className="text-3xl font-bold mt-2">
            {loading ? "..." : stats.availableCars}
          </p>
        </div>

        <div className="bg-indigo-500 text-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl font-bold mt-2">
            {loading ? "..." : stats.totalUsers}
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Reservations</h2>
        {loading ? (
          <p className="text-gray-500">Loading recent reservations...</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {/* Replace with actual recent reservations later */}
            <li className="py-2 flex justify-between">
              <span>Data fetched from backend</span>
              <span className="text-gray-500 text-sm">Soon...</span>
            </li>
          </ul>
        )}
      </div>

      {/* System Status */}
      <div className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-2">System Status</h3>
        <p className="text-gray-600">✅ All systems operational. No pending maintenance alerts.</p>
      </div>
    </div>
  );
}
