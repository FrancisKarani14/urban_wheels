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
        const response = await fetch("http://localhost:5000/cars"); 
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
      className="bg-[#0f172a] rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between transform hover:scale-[1.02] transition-all duration-300"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      {/* Image and Badge */}
      <div className="relative">
        <img
          src={car.image_url}
          alt={car.model}
          className="w-full h-52 object-cover"
        />
        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
            car.available ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {car.available ? "Available" : "Reserved"}
        </span>
      </div>

      {/* Car Info */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-white">{car.model}</h3>
          <span className="text-sm text-gray-400">{car.category}</span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-400">{car.capacity} Seats</p>
          <p className="text-base font-semibold text-green-400">
            ${car.price_per_day}/day
          </p>
        </div>

        {/* Reserve Button */}
        {car.available ? (
          <Link
            to={`/reserve/${car.id}`}
            className="mt-auto inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-300"
          >
            Reserve Now
          </Link>
        ) : (
          <button
            disabled
            className="mt-auto w-full text-center bg-gray-700 text-gray-400 font-medium py-2 rounded-md cursor-not-allowed"
          >
            Not Available
          </button>
        )}
      </div>
    </div>
  ))}
</div>

      )}
    </div>
  );
}

export default List;
