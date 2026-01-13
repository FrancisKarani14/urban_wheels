import React, { useState, useEffect } from 'react'
import { Eye, X } from 'lucide-react'

export default function Cars() {
  const [cars, setCars] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const carsPerPage = 8
  const [loading, setLoading] = useState(true)
  const [selectedCar, setSelectedCar] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:5000/cars')
        const data = await response.json()
        setCars(data)
      } catch (error) {
        console.error('Error fetching cars:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [])

  const openModal = (car) => {
    setSelectedCar(car)
    setShowModal(true)
  }

  const closeModal = () => {
    setSelectedCar(null)
    setShowModal(false)
  }

  // Pagination logic
  const indexOfLastCar = currentPage * carsPerPage
  const indexOfFirstCar = indexOfLastCar - carsPerPage
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar)
  const totalPages = Math.ceil(cars.length / carsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (loading) {
    return <div className="p-6"><p>Loading cars...</p></div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Cars Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentCars.map((car) => (
          <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img
                src={car.image_url}
                alt={car.model}
                className="w-full h-48 object-cover"
              />
              <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${
                car.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}>
                {car.available ? 'Available' : 'Reserved'}
              </span>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{car.model}</h3>
              <p className="text-gray-600 text-sm mb-1">{car.category} • {car.capacity} seats</p>
              <p className="text-green-600 font-semibold mb-3">${car.price_per_day}/day</p>
              
              <button
                onClick={() => openModal(car)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                <Eye size={16} />
                View Details
              </button>
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
          <span className="text-gray-700 font-medium">
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

      {/* Modal */}
      {showModal && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Car Details</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedCar.image_url}
                    alt={selectedCar.model}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-4">{selectedCar.model}</h3>
                  <div className="space-y-2 mb-4">
                    <p><span className="font-semibold">Number Plate:</span> {selectedCar.number_plate}</p>
                    <p><span className="font-semibold">Category:</span> {selectedCar.category}</p>
                    <p><span className="font-semibold">Capacity:</span> {selectedCar.capacity} seats</p>
                    <p><span className="font-semibold">Price:</span> ${selectedCar.price_per_day}/day</p>
                    <p><span className="font-semibold">Status:</span> 
                      <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedCar.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedCar.available ? 'Available' : 'Reserved'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Reservation Details */}
              {!selectedCar.available && (
                <div className="mt-6 pt-6 border-t">
                  <h4 className="text-lg font-semibold mb-4">Reservation Details</h4>
                  {selectedCar.reserved_by ? (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid md:grid-cols-2 gap-4">
                        <p><span className="font-semibold">Reserved by:</span> {selectedCar.reserved_by}</p>
                        <p><span className="font-semibold">Amount Paid:</span> ${selectedCar.amount_paid}</p>
                        <p><span className="font-semibold">Start Date:</span> {selectedCar.date_reserved}</p>
                        <p><span className="font-semibold">Return Date:</span> {selectedCar.return_date}</p>
                        <p><span className="font-semibold">Pickup Location:</span> {selectedCar.pickup_location}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">No reservation details available</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}