import React, { useState, useEffect } from "react";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy car (for now)
//   const dummyCar = {
//     id: 1,
//     model: "Toyota Corolla",
//     numberPlate: "KDG 234H",
//     preserved: true,
//     preservedBy: "John Doe",
//     preservedDate: "2025-10-01",
//     pickupLocation: "Nairobi CBD",
//     amountPaid: "2500",
//     returnDate: "2025-10-05",
//     image: "https://via.placeholder.com/120", 
//   };

  useEffect(() => {
    // Fetch cars from backend later
    Example:
    fetch("http://localhost:5000/cars")
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error(err));

    // For now show the dummy car
    // setCars([dummyCar]);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCars = cars.filter((car) =>
    car.model.toLowerCase().includes(searchTerm)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send new car data to backend will go here
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Cars Management</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by model..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-400 rounded w-full md:w-1/3"
        />
      </div>

      {/* Add Car Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow mb-8"
      >
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Add New Car</h2>
        <div className="grid md:grid-cols-2 gap-4">
        <input type="text" placeholder="Model" className="p-2 border rounded" required />
        <input type="text" placeholder="Number Plate" className="p-2 border rounded" required />
        <input type="text" placeholder="Capacity" className="p-2 border rounded" required />
        <input type="text" placeholder="Category" className="p-2 border rounded" required />
          <input type="number" placeholder="Amount in a day" className="p-2 border rounded" required />
          <input type="file" accept="image/*" className="p-2 border rounded" required />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Car
        </button>
      </form>

      {/* Cars Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              
              <th className="p-3 border">Model</th>
              <th className="p-3 border">Number Plate</th>
              <th className="p-3 border">Preserved</th>
              <th className="p-3 border">Preserved By</th>
              <th className="p-3 border">Date Preserved</th>
              <th className="p-3 border">Pickup Location</th>
              <th className="p-3 border">Amount Paid</th>
              <th className="p-3 border">Return Date</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.map((car) => (
              <tr key={car.id} className="hover:bg-gray-50">
                
                <td className="p-3 border">{car.model}</td>
                <td className="p-3 border">{car.numberPlate}</td>
                <td className="p-3 border">
                  {car.preserved ? "Yes" : "No"}
                </td>
                <td className="p-3 border">{car.preservedBy || "-"}</td>
                <td className="p-3 border">{car.preservedDate || "-"}</td>
                <td className="p-3 border">{car.pickupLocation}</td>
                <td className="p-3 border">{car.amountPaid}</td>
                <td className="p-3 border">{car.returnDate}</td>
                <td className="p-3 border text-center">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                    Update
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
