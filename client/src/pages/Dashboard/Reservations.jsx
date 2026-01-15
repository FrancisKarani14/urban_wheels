import React, { useState, useEffect } from 'react'
import { Check, X } from 'lucide-react'

export default function Reservations() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReservations()
  }, [])

  const fetchReservations = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/reservations`)
      const data = await response.json()
      setReservations(data)
    } catch (error) {
      console.error('Error fetching reservations:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateReservationStatus = async (reservationId, status) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/reservations/update/${reservationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      
      if (response.ok) {
        // Update local state
        setReservations(prev => 
          prev.map(res => 
            res.id === reservationId ? { ...res, status } : res
          )
        )
      }
    } catch (error) {
      console.error('Error updating reservation:', error)
    }
  }

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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {reservation.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                        className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                      >
                        <Check size={16} />
                        Approve
                      </button>
                      <button
                        onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                        className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                      >
                        <X size={16} />
                        Reject
                      </button>
                    </div>
                  )}
                  {reservation.status !== 'pending' && (
                    <span className="text-gray-500 text-sm">No actions available</span>
                  )}
                </td>
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
