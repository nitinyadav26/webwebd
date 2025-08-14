import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getStatusColor, getStatusText, formatDate, formatTime, formatCurrency } from '../utils'

const Dashboard: React.FC = () => {
  const { user } = useAuth()

  // Mock data - replace with actual API calls
  const upcomingBookings = [
    {
      id: '1',
      date: '2025-08-15',
      time: '9:00 AM - 11:00 AM',
      address: '123 Main St, Houston, TX',
      status: 'CONFIRMED'
    },
    {
      id: '2',
      date: '2025-08-22',
      time: '2:00 PM - 4:00 PM',
      address: '456 Oak Ave, Houston, TX',
      status: 'PENDING_PAYMENT'
    }
  ]

  const recentBookings = [
    {
      id: '3',
      date: '2025-08-08',
      time: '10:00 AM - 12:00 PM',
      address: '789 Pine Rd, Houston, TX',
      status: 'COMPLETED',
      total: '$120.00'
    }
  ]



  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.firstName || 'User'}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your cleaning services today.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/booking"
          className="card hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        >
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Book New Service</h3>
            <p className="text-gray-600 mt-1">Schedule a cleaning appointment</p>
          </div>
        </Link>

        <div className="card">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Upcoming Bookings</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">{upcomingBookings.length}</p>
          </div>
        </div>

        <div className="card">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Profile</h3>
            <p className="text-gray-600 mt-1">Manage your account</p>
          </div>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Upcoming Bookings</h2>
          <Link to="/bookings" className="text-primary-600 hover:text-primary-500 font-medium">
            View all
          </Link>
        </div>
        
        {upcomingBookings.length > 0 ? (
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{booking.date}</p>
                    <p className="text-gray-600">{booking.time}</p>
                    <p className="text-gray-600 text-sm">{booking.address}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {getStatusText(booking.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No upcoming bookings</p>
            <Link to="/booking" className="btn-primary inline-block mt-4">
              Book Your First Service
            </Link>
          </div>
        )}
      </div>

      {/* Recent Bookings */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Bookings</h2>
        
        {recentBookings.length > 0 ? (
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{booking.date}</p>
                    <p className="text-gray-600">{booking.time}</p>
                    <p className="text-gray-600 text-sm">{booking.address}</p>
                  </div>
                  <div className="text-right">
                                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {getStatusText(booking.status)}
                  </span>
                    <p className="text-lg font-semibold text-gray-900 mt-2">{booking.total}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No recent bookings</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
