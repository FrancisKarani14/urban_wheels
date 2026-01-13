import React, { useState, useEffect } from 'react'
import { Eye, X, Plus, Edit, Trash2 } from 'lucide-react'

export default function Cars() {
  const [cars, setCars] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const carsPerPage = 8
  const [loading, setLoading] = useState(true)
  const [selectedCar, setSelectedCar] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)
  const [editingCar, setEditingCar] = useState(null)
  const [formData, setFormData] = useState({
    model: '',
    number_plate: '',
    capacity: '',
    category: '',
    image_url: '',
    price_per_day: ''
  })

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

  const openFormModal = (car = null) => {
    if (car) {
      setEditingCar(car)
      setFormData({
        model: car.model,
        number_plate: car.number_plate,
        capacity: car.capacity,
        category: car.category,
        image_url: car.image_url,
        price_per_day: car.price_per_day
      })
    } else {
      setEditingCar(null)
      setFormData({
        model: '',
        number_plate: '',
        capacity: '',
        category: '',
        image_url: '',
        price_per_day: ''
      })
    }
    setShowFormModal(true)
  }

  const closeFormModal = () => {
    setShowFormModal(false)
    setEditingCar(null)
    setFormData({
      model: '',
      number_plate: '',
      capacity: '',
      category: '',
      image_url: '',
      price_per_day: ''
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = editingCar 
      ? `http://localhost:5000/cars/update/${editingCar.id}`
      : 'http://localhost:5000/cars/add'
    const method = editingCar ? 'PUT' : 'POST'

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        const updatedCar = await response.json()
        if (editingCar) {
          setCars(prev => prev.map(car => car.id === editingCar.id ? updatedCar : car))
        } else {
          setCars(prev => [...prev, updatedCar])
        }
        closeFormModal()
      }
    } catch (error) {
      console.error('Error saving car:', error)
    }
  }

  const handleDelete = async (carId) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return
    
    try {
      const response = await fetch(`http://localhost:5000/cars/delete/${carId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setCars(prev => prev.filter(car => car.id !== carId))
      }
    } catch (error) {
      console.error('Error deleting car:', error)
    }
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cars Management</h1>
        <button
          onClick={() => openFormModal()}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <Plus size={20} />
          Add New Car
        </button>
      </div>
      
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
              
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(car)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                  <Eye size={16} />
                  View
                </button>
                <button
                  onClick={() => openFormModal(car)}
                  className="p-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(car.id)}
                  className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
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

      {/* Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-96">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">{editingCar ? 'Edit Car' : 'Add Car'}</h2>
              <button onClick={closeFormModal} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="Model"
                  className="p-2 border rounded text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  name="number_plate"
                  value={formData.number_plate}
                  onChange={handleInputChange}
                  placeholder="Plate"
                  className="p-2 border rounded text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  required
                />
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  placeholder="Seats"
                  className="p-2 border rounded text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Category"
                  className="p-2 border rounded text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  required
                />
                <input
                  type="number"
                  name="price_per_day"
                  value={formData.price_per_day}
                  onChange={handleInputChange}
                  placeholder="Price/day"
                  className="p-2 border rounded text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                placeholder="Image URL"
                className="w-full p-2 border rounded text-sm mt-3 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                required
              />
              
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition"
                >
                  {editingCar ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={closeFormModal}
                  className="flex-1 bg-gray-500 text-white py-2 px-3 rounded text-sm hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}