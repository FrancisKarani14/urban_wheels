import React, { useState, useEffect } from "react";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalCars: 0,
    reservedCars: 0,
    availableCars: 0,
    totalUsers: 0,
    userReservations: 0,
    currentReservations: 0,
  });

  const [loading, setLoading] = useState(true);
  const userRole = localStorage.getItem('user_role');
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (userRole === 'admin') {
          const [carsRes, reservationsRes, usersRes, availableRes] = await Promise.all([
            fetch(`${import.meta.env.VITE_API_URL}/cars/count`),
            fetch(`${import.meta.env.VITE_API_URL}/reservations/count`),
            fetch(`${import.meta.env.VITE_API_URL}/users/count`),
            fetch(`${import.meta.env.VITE_API_URL}/cars/available`)
          ]);

          const cars = await carsRes.json();
          const reservations = await reservationsRes.json();
          const users = await usersRes.json();
          const available = await availableRes.json();

          setStats({
            totalCars: cars.cars_count,
            reservedCars: reservations.reservations_count,
            availableCars: available.length,
            totalUsers: users.users_count,
          });
        } else {
          // User dashboard - fetch user-specific data
          const reservationsRes = await fetch(`${import.meta.env.VITE_API_URL}/reservations`);
          const allReservations = await reservationsRes.json();
          
          const userReservations = allReservations.filter(res => res.user_id == userId);
          const today = new Date();
          const currentReservations = userReservations.filter(res => {
            const endDate = new Date(res.end_date);
            return endDate >= today;
          });

          setStats({
            userReservations: userReservations.length,
            currentReservations: currentReservations.length,
          });
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userRole, userId]);

  if (userRole === 'admin') {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-500 mb-6">A quick summary of your Urban Wheels operations</p>

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

        <div className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-2">System Status</h3>
          <p className="text-gray-600">✅ All systems operational. No pending maintenance alerts.</p>
        </div>
      </div>
    );
  }

  // User Dashboard
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">My Dashboard</h1>
      <p className="text-gray-500 mb-6">Overview of your reservations and activities</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Total Reservations</h2>
          <p className="text-3xl font-bold mt-2">
            {loading ? "..." : stats.userReservations}
          </p>
          <p className="text-sm mt-2 opacity-90">All time reservations</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Current Reservations</h2>
          <p className="text-3xl font-bold mt-2">
            {loading ? "..." : stats.currentReservations}
          </p>
          <p className="text-sm mt-2 opacity-90">Active or upcoming</p>
        </div>
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-2">Quick Actions</h3>
        <div className="flex gap-4">
          <button 
            onClick={() => window.location.href = '/book'}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Book New Car
          </button>
          <button 
            onClick={() => window.location.href = '/dashboard/my-reservations'}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            View My Reservations
          </button>
        </div>
      </div>
    </div>
  );
}
