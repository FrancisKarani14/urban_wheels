import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function List() {
  const [cars, setCars] = useState([]);

  // ✅ Fetch from backend
  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:5000/cars"); // <-- replace with your backend URL
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="bg-black min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold text-center mt-8 mb-8">
        Choose the perfect car for your trip
      </h1>

      {/* If loading */}
      {cars.length === 0 ? (
        <p className="text-center text-gray-400">Loading cars...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {cars.map((car, index) => (
            <div
              key={car.id || index}
              className="bg-gray-900 rounded-xl shadow-lg p-4"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <h3 className="text-sm text-gray-400 mb-2">
                Available: {car.fleet}
              </h3>
              <img
                src={car.image}
                alt={car.name}
                className="rounded-lg w-full h-48 object-cover mb-3"
              />

              {/* Name and Shape in one row */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{car.name}</h3>
                <span className="text-sm text-gray-400">{car.shape}</span>
              </div>

              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-300">{car.capacity}</p>
                <p className="text-base font-semibold text-green-400">
                  {car.cost}
                </p>
              </div>

              {/* Smaller button */}
              <Link
                to="/"
                className="mt-3 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-md transition"
              >
                Reserve
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default List;
