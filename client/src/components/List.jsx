import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function List() {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:5000/cars");
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  const handleReserve = (car) => {
    const isLoggedIn = localStorage.getItem('access_token');
    const userRole = localStorage.getItem('user_role');
    
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    if (userRole === 'admin') {
      alert('Admins cannot reserve cars');
      return;
    }
    
    navigate("/contact", { state: { car } });
  };

  // Pagination logic
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(cars.length / carsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-black min-h-screen p-6 text-white pt-24">
      <h1 className="text-3xl font-bold text-center mt-8 mb-8">
        Choose the perfect car for your trip
      </h1>

      {cars.length === 0 ? (
        <p className="text-center text-gray-400">Loading cars...</p>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            {currentCars.map((car, index) => (
              <div
                key={car.id || index}
                className="bg-[#0f172a] rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between transform hover:scale-[1.02] transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative">
                  <img
                    src={car.image_url}
                    alt={car.model}
                    className="w-full h-52 object-cover"
                  />
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
                      car.available ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {car.available ? "Available" : "Reserved"}
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {car.model}
                    </h3>
                    <span className="text-sm text-gray-400">{car.category}</span>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-400">{car.capacity} Seats</p>
                    <p className="text-base font-semibold text-green-400">
                      ${car.price_per_day}/day
                    </p>
                  </div>

                  {car.available ? (
                    <button
                      onClick={() => handleReserve(car)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                    >
                      Reserve Now
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full text-center bg-gray-700 text-gray-400 font-medium py-2 rounded-md cursor-not-allowed"
                    >
                      Not Available
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md transition bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-white font-medium">
                {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-md transition bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default List;
