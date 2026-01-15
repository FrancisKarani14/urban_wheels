import React, { useState, useEffect } from 'react'
import { Bell, Calendar, AlertCircle, CheckCircle } from 'lucide-react'

export default function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateNotifications = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/reservations`)
        const data = await response.json()
        const userId = localStorage.getItem('user_id')
        const myReservations = data.filter(res => res.user_id == userId)
        
        const notifs = []
        const today = new Date()
        
        myReservations.forEach(reservation => {
          const startDate = new Date(reservation.start_date)
          const endDate = new Date(reservation.end_date)
          const startDiff = Math.ceil((startDate - today) / (1000 * 60 * 60 * 24))
          const endDiff = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))
          
          // Pickup notifications
          if (startDiff === 0) {
            notifs.push({
              id: `pickup-today-${reservation.id}`,
              type: 'urgent',
              title: 'Car Pickup Today!',
              message: `Pick up your ${reservation.car?.model} today from ${reservation.pickup_location}`,
              date: new Date().toISOString(),
              reservation
            })
          } else if (startDiff === 1) {
            notifs.push({
              id: `pickup-tomorrow-${reservation.id}`,
              type: 'warning',
              title: 'Car Pickup Tomorrow',
              message: `Don't forget to pick up your ${reservation.car?.model} tomorrow from ${reservation.pickup_location}`,
              date: new Date().toISOString(),
              reservation
            })
          } else if (startDiff <= 3 && startDiff > 0) {
            notifs.push({
              id: `pickup-soon-${reservation.id}`,
              type: 'info',
              title: `Car Pickup in ${startDiff} days`,
              message: `Your ${reservation.car?.model} pickup is scheduled for ${reservation.start_date}`,
              date: new Date().toISOString(),
              reservation
            })
          }
          
          // Return notifications
          if (endDiff === 0) {
            notifs.push({
              id: `return-today-${reservation.id}`,
              type: 'urgent',
              title: 'Car Return Due Today!',
              message: `Return your ${reservation.car?.model} today to avoid late fees`,
              date: new Date().toISOString(),
              reservation
            })
          } else if (endDiff === 1) {
            notifs.push({
              id: `return-tomorrow-${reservation.id}`,
              type: 'warning',
              title: 'Car Return Due Tomorrow',
              message: `Your ${reservation.car?.model} is due for return tomorrow`,
              date: new Date().toISOString(),
              reservation
            })
          } else if (endDiff <= 3 && endDiff > 0) {
            notifs.push({
              id: `return-soon-${reservation.id}`,
              type: 'info',
              title: `Car Return in ${endDiff} days`,
              message: `Your ${reservation.car?.model} return is due on ${reservation.end_date}`,
              date: new Date().toISOString(),
              reservation
            })
          }
          
          // Overdue notifications
          if (endDiff < 0) {
            notifs.push({
              id: `overdue-${reservation.id}`,
              type: 'urgent',
              title: 'Car Return Overdue!',
              message: `Your ${reservation.car?.model} was due ${Math.abs(endDiff)} days ago. Please return immediately.`,
              date: new Date().toISOString(),
              reservation
            })
          }
        })
        
        setNotifications(notifs.sort((a, b) => new Date(b.date) - new Date(a.date)))
      } catch (error) {
        console.error('Error generating notifications:', error)
      } finally {
        setLoading(false)
      }
    }
    
    generateNotifications()
  }, [])

  const getIcon = (type) => {
    switch (type) {
      case 'urgent': return <AlertCircle className="text-red-500" size={20} />
      case 'warning': return <Calendar className="text-yellow-500" size={20} />
      case 'info': return <Bell className="text-blue-500" size={20} />
      default: return <CheckCircle className="text-green-500" size={20} />
    }
  }

  const getBgColor = (type) => {
    switch (type) {
      case 'urgent': return 'bg-red-50 border-red-200'
      case 'warning': return 'bg-yellow-50 border-yellow-200'
      case 'info': return 'bg-blue-50 border-blue-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  if (loading) {
    return <div className="p-6"><p>Loading notifications...</p></div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      
      {notifications.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Bell size={48} className="mx-auto mb-4 text-gray-300" />
          <p>No notifications at this time</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className={`border rounded-lg p-4 ${getBgColor(notification.type)}`}>
              <div className="flex items-start gap-3">
                {getIcon(notification.type)}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                  <p className="text-gray-700 mt-1">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(notification.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}