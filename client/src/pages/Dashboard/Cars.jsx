import React, { useEffect, useState } from "react";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    model: "",
    number_plate: "",
    capacity: "",
    category: "",
    image_url: "",
    price_per_day: "",
  });

  const [editingCarId, setEditingCarId] = useState(null); // for update mode

  // --- Fetch cars and reservations ---
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

  // --- Handle Search ---
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = cars.filter((car) =>
      car.model.toLowerCase().includes(term)
    );
    setFilteredCars(filtered);
  };

  // --- Merge cars with reservations ---
  const carsWithReservations = filteredCars.map((car) => {
    const reservation = reservations.find((res) => res.car_id === car.id);
    return {
      ...car,
      available: !reservation,
      reserved: !!reservation,
      reservedBy: reservation ? reservation.user?.username || "-" : "-",
      reservedDate: reservation ? reservation.start_date || "-" : "-",
      pickupLocation: reservation ? reservation.pickup_location || "-" : "-",
      amountPaid: reservation ? `$${reservation.amount_paid}` : "-",
      returnDate: reservation ? reservation.end_date || "-" : "-",
      status: reservation ? reservation.status || "-" : "-",
    };
  });

  // --- Handle Form Input ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // --- Handle Add or Update Car ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingCarId
      ? `http://localhost:5000/cars/${editingCarId}`
      : "http://localhost:5000/cars";

    const method = editingCarId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save car");

      const data = await res.json();

      if (editingCarId) {
        setCars((prev) =>
          prev.map((car) => (car.id === editingCarId ? data : car))
        );
      } else {
        setCars((prev) => [...prev, data]);
      }

      setFilteredCars((prev) => [...prev, data]);
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

  // --- Handle Edit Car ---
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

  // --- Handle Delete Car ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    try {
      const res = await fetch(`http://localhost:5000/cars/${id}`, {
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
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      {/* --- Add / Update Car Form --- */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-10"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingCarId ? "Update Car" : "Add New Car"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Car Model"
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="number_plate"
            value={formData.number_plate}
            onChange={handleChange}
            placeholder="Number Plate"
            required
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="Capacity"
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category (SUV, Sedan...)"
            required
            className="p-2 border rounded"
          />
          <input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="price_per_day"
            value={formData.price_per_day}
            onChange={handleChange}
            placeholder="Price per day (Ksh)"
            required
            className="p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
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
            className="mt-4 ml-3 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {/* --- Search Bar --- */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by car model..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* --- Cars Table --- */}
      <div className="overflow-x-auto shadow rounded-lg bg-white">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Model</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Capacity</th>
              <th className="p-3 border">Available</th>
              <th className="p-3 border">Reserved By</th>
              <th className="p-3 border">Pickup</th>
              <th className="p-3 border">Start Date</th>
              <th className="p-3 border">Return Date</th>
              <th className="p-3 border">Amount Paid</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {carsWithReservations.map((car) => (
              <tr
                key={car.id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="p-3 border text-center">
                  <img
                    src={car.image_url}
                    alt={car.model}
                    className="w-24 h-16 object-cover rounded-md mx-auto"
                  />
                </td>
                <td className="p-3 border font-semibold">{car.model}</td>
                <td className="p-3 border">{car.category}</td>
                <td className="p-3 border text-center">{car.capacity}</td>
                <td className="p-3 border text-center">
                  {car.reserved ? (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                      Reserved
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Available
                    </span>
                  )}
                </td>
                <td className="p-3 border">{car.reservedBy}</td>
                <td className="p-3 border">{car.pickupLocation}</td>
                <td className="p-3 border">{car.reservedDate}</td>
                <td className="p-3 border">{car.returnDate}</td>
                <td className="p-3 border text-center">
                  {car.reserved ? car.amountPaid : "-"}
                </td>
                <td className="p-3 border text-center">
                  {car.status !== "-" ? (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
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
                <td className="p-3 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(car)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(car.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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

      <footer className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} UrbanWheels Admin Portal
      </footer>
    </div>
  );
}
