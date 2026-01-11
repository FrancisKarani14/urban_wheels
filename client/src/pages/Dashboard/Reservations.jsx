import React, { useState, useEffect } from 'react'

export default function Reservations() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:5000/reservations')
        const data = await response.json()
        setReservations(data)
      } catch (error) {
        console.error('Error fetching reservations:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchReservations()
  }, [])

  if (loading) {
    return <div className="p-6"><p>Loading reservations...</p></div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reservations Management</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Car</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.user?.username || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.car?.model || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.start_date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.end_date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${reservation.amount_paid}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {reservation.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.pickup_location}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {reservations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No reservations found
          </div>
        )}
      </div>
    </div>
  )
}
