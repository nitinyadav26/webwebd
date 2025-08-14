import React, { useState } from 'react'
import { getStatusColor, getStatusText, formatDate, formatTime, formatCurrency } from '../utils'
import { Booking } from '../types'

interface BookingHistoryProps {
  bookings: Booking[]
}

const BookingHistory: React.FC<BookingHistoryProps> = ({ bookings }) => {
  const [filter, setFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true
    return booking.status === filter
  })

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBookings = filteredBookings.slice(startIndex, endIndex)

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
        <p className="text-gray-500">When you book a service, it will appear here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-primary-100 text-primary-800'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All ({bookings.length})
        </button>
        <button
          onClick={() => handleFilterChange('PENDING')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            filter === 'PENDING'
              ? 'bg-orange-100 text-orange-800'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Pending ({bookings.filter(b => b.status === 'PENDING').length})
        </button>
        <button
          onClick={() => handleFilterChange('CONFIRMED')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            filter === 'CONFIRMED'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Confirmed ({bookings.filter(b => b.status === 'CONFIRMED').length})
        </button>
        <button
          onClick={() => handleFilterChange('COMPLETED')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            filter === 'COMPLETED'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Completed ({bookings.filter(b => b.status === 'COMPLETED').length})
        </button>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {currentBookings.map((booking) => (
          <div key={booking.id} className="card hover:shadow-lg transition-shadow duration-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <svg className="h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900">
                        {formatDate(booking.date)}
                      </p>
                      <span className="text-gray-400">•</span>
                      <p className="text-sm text-gray-600">
                        {formatTime(booking.time)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {booking.address.line1}, {booking.address.city}, {booking.address.state}
                    </p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      <span>{booking.homeSize} sq ft</span>
                      <span>{booking.bedrooms} bed</span>
                      <span>{booking.bathrooms} bath</span>
                      <span className="capitalize">{booking.frequency.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {getStatusText(booking.status)}
                </span>
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency(booking.total)}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(booking.createdAt)}
                </p>
              </div>
            </div>
            
            {booking.notes && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Notes:</span> {booking.notes}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredBookings.length)} of {filteredBookings.length} results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  currentPage === page
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingHistory

