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
        const [carsRes, reservationsRes, usersRes, availableRes] = await Promise.all([
          fetch("http://localhost:5000/cars/count"),
          fetch("http://localhost:5000/reservations/count"),
          fetch("http://localhost:5000/users/count"),
          fetch("http://localhost:5000/cars/available")
        ]);

        const cars = await carsRes.json();
        const reservations = await reservationsRes.json();
        const users = await usersRes.json();
        const available = await availableRes.json();

        // ✅ Extract correct values from the API responses
        setStats({
          totalCars: cars.cars_count,
          reservedCars: reservations.reservations_count,
          availableCars: available.length, // because this endpoint returns a list
          totalUsers: users.users_count,
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

      {/* System Status */}
      <div className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-2">System Status</h3>
        <p className="text-gray-600">✅ All systems operational. No pending maintenance alerts.</p>
      </div>
    </div>
  );
}
