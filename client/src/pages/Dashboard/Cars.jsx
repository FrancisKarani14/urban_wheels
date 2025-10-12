import React, { useEffect, useState } from "react";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    model: "",
    number_plate: "",
    capacity: "",
    category: "",
    image_url: "",
    price_per_day: "",
  });
  const [editingCarId, setEditingCarId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsRes, reservationsRes] = await Promise.all([
          fetch("http://localhost:5000/cars"),
          fetch("http://localhost:5000/reservations"),
        ]);
        const carsData = await carsRes.json();
        const reservationsData = await reservationsRes.json();
        setCars(carsData);
        setReservations(reservationsData);
        setFilteredCars(carsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = cars.filter((car) =>
      car.model.toLowerCase().includes(term)
    );
    setFilteredCars(filtered);
  };

  const carsWithReservations = filteredCars.map((car) => {
    const reservation = reservations.find((res) => res.car_id === car.id);
    return {
      ...car,
      available: !reservation,
      reserved: !!reservation,
      reservedBy: reservation ? reservation.user?.username || "-" : "-",
      reservedDate: reservation ? reservation.start_date || "-" : "-",
      pickupLocation: reservation ? reservation.pickup_location || "-" : "-",
      amountPaid: reservation ? `Ksh ${reservation.amount_paid}` : "-",
      returnDate: reservation ? reservation.end_date || "-" : "-",
      status: reservation ? reservation.status || "-" : "-",
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingCarId
      ? `http://localhost:5000/cars/update/${editingCarId}`
      : "http://localhost:5000/cars/add";
    const method = editingCarId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save car");
      const data = await res.json();

      if (editingCarId) {
        setCars((prev) =>
          prev.map((car) => (car.id === editingCarId ? data : car))
        );
        setFilteredCars((prev) =>
          prev.map((car) => (car.id === editingCarId ? data : car))
        );
      } else {
        setCars((prev) => [...prev, data]);
        setFilteredCars((prev) => [...prev, data]);
      }

      setFormData({
        model: "",
        number_plate: "",
        capacity: "",
        category: "",
        image_url: "",
        price_per_day: "",
      });
      setEditingCarId(null);
    } catch (err) {
      console.error("Error saving car:", err);
    }
  };

  const handleEdit = (car) => {
    setFormData({
      model: car.model,
      number_plate: car.number_plate,
      capacity: car.capacity,
      category: car.category,
      image_url: car.image_url,
      price_per_day: car.price_per_day,
    });
    setEditingCarId(car.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    try {
      const res = await fetch(`http://localhost:5000/cars/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete car");

      setCars((prev) => prev.filter((car) => car.id !== id));
      setFilteredCars((prev) => prev.filter((car) => car.id !== id));
    } catch (err) {
      console.error("Error deleting car:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
        Admin Dashboard
      </h1>

      {/* --- Add / Update Car Form --- */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-10"
      >
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-center md:text-left">
          {editingCarId ? "Update Car" : "Add New Car"}
        </h2>

        {/* smaller input styles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            "model",
            "number_plate",
            "capacity",
            "category",
            "image_url",
            "price_per_day",
          ].map((field) => (
            <input
              key={field}
              type={
                field.includes("price") || field === "capacity" ? "number" : "text"
              }
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={
                field === "model"
                  ? "Car Model"
                  : field === "number_plate"
                  ? "Number Plate"
                  : field === "capacity"
                  ? "Capacity"
                  : field === "category"
                  ? "Category (SUV, Sedan...)"
                  : field === "image_url"
                  ? "Image URL"
                  : "Price per day (Ksh)"
              }
              required
              className="p-1.5 text-sm border rounded w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm w-full sm:w-auto"
          >
            {editingCarId ? "Update Car" : "Add Car"}
          </button>

          {editingCarId && (
            <button
              type="button"
              onClick={() => {
                setEditingCarId(null);
                setFormData({
                  model: "",
                  number_plate: "",
                  capacity: "",
                  category: "",
                  image_url: "",
                  price_per_day: "",
                });
              }}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1.5 rounded text-sm w-full sm:w-auto"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* --- Search Bar --- */}
      <div className="mb-6 flex justify-center md:justify-start">
        <input
          type="text"
          placeholder="Search by car model..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm w-full max-w-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* --- Cars Table --- */}
      <div className="overflow-x-auto shadow rounded-lg bg-white">
        <table className="min-w-full border-collapse text-xs sm:text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-2 border">Model</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Available</th>
              <th className="p-2 border">Reserved By</th>
              <th className="p-2 border">Pickup</th>
              <th className="p-2 border">Start</th>
              <th className="p-2 border">Return</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {carsWithReservations.map((car) => (
              <tr key={car.id} className="hover:bg-gray-50 transition duration-150">
                <td className="p-2 border font-semibold">{car.model}</td>
                <td className="p-2 border">{car.category}</td>
                <td className="p-2 border text-center">
                  {car.reserved ? (
                    <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">
                      Reserved
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                      Available
                    </span>
                  )}
                </td>
                <td className="p-2 border">{car.reservedBy}</td>
                <td className="p-2 border">{car.pickupLocation}</td>
                <td className="p-2 border">{car.reservedDate}</td>
                <td className="p-2 border">{car.returnDate}</td>
                <td className="p-2 border text-center">{car.amountPaid}</td>
                <td className="p-2 border text-center">
                  {car.status !== "-" ? (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        car.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : car.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {car.status}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-2 border text-center space-x-1">
                  <button
                    onClick={() => handleEdit(car)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-0.5 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(car.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-0.5 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {carsWithReservations.length === 0 && (
          <p className="text-center py-4 text-gray-500">No cars found.</p>
        )}
      </div>
    </div>
  );
}
