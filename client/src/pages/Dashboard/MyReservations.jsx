import React, { useState, useEffect } from 'react'

export default function MyReservations() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMyReservations = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/reservations`)
        const data = await response.json()
        const userId = localStorage.getItem('user_id')
        const myReservations = data.filter(res => res.user_id == userId)
        setReservations(myReservations)
      } catch (error) {
        console.error('Error fetching reservations:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMyReservations()
  }, [])

  const getDaysUntil = (dateString) => {
    const targetDate = new Date(dateString)
    const today = new Date()
    const diffTime = targetDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (loading) {
    return <div className="p-6"><p>Loading your reservations...</p></div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Reservations</h1>
      
      {reservations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          You have no reservations yet
        </div>
      ) : (
        <div className="grid gap-6">
          {reservations.map((reservation) => {
            const startDays = getDaysUntil(reservation.start_date)
            const endDays = getDaysUntil(reservation.end_date)
            
            return (
              <div key={reservation.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{reservation.car?.model || 'N/A'}</h3>
                    <p className="text-gray-600">Pickup: {reservation.pickup_location}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {reservation.status}
                  </span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Start Date</p>
                    <p className="font-medium">{reservation.start_date}</p>
                    {startDays >= 0 && (
                      <p className={`text-sm ${startDays <= 1 ? 'text-red-600' : 'text-blue-600'}`}>
                        {startDays === 0 ? 'Today!' : startDays === 1 ? 'Tomorrow' : `In ${startDays} days`}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">End Date</p>
                    <p className="font-medium">{reservation.end_date}</p>
                    {endDays >= 0 && (
                      <p className={`text-sm ${endDays <= 1 ? 'text-red-600' : 'text-blue-600'}`}>
                        {endDays === 0 ? 'Return today!' : endDays === 1 ? 'Return tomorrow' : `Return in ${endDays} days`}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-green-600">${reservation.amount_paid}</p>
                  {(startDays <= 1 || endDays <= 1) && startDays >= 0 && endDays >= 0 && (
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      Action Required Soon!
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}