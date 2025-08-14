import React from 'react'
import { Link } from 'react-router-dom'
import BookingHistory from '../components/BookingHistory'

const Bookings: React.FC = () => {
  // Mock data - replace with actual API calls
  const allBookings = [
    {
      id: '1',
      userId: '1',
      homeSize: 1500,
      bedrooms: 3,
      bathrooms: 2,
      frequency: 'one-time' as const,
      date: '2025-08-15',
      time: '9-11',
      address: {
        line1: '123 Main St',
        line2: '',
        city: 'Houston',
        state: 'TX',
        zip: '77001'
      },
      notes: 'Focus on kitchen and bathrooms',
      status: 'CONFIRMED' as const,
      total: 120,
      createdAt: '2025-08-10T10:00:00Z',
      updatedAt: '2025-08-10T10:00:00Z'
    },
    {
      id: '2',
      userId: '1',
      homeSize: 2000,
      bedrooms: 4,
      bathrooms: 3,
      frequency: 'weekly' as const,
      date: '2025-08-22',
      time: '2-4',
      address: {
        line1: '456 Oak Ave',
        line2: 'Apt 4B',
        city: 'Houston',
        state: 'TX',
        zip: '77002'
      },
      notes: '',
      status: 'PENDING_PAYMENT' as const,
      total: 180,
      createdAt: '2025-08-12T14:30:00Z',
      updatedAt: '2025-08-12T14:30:00Z'
    },
    {
      id: '3',
      userId: '1',
      homeSize: 1200,
      bedrooms: 2,
      bathrooms: 1,
      frequency: 'biweekly' as const,
      date: '2025-08-08',
      time: '10-12',
      address: {
        line1: '789 Pine Rd',
        line2: '',
        city: 'Houston',
        state: 'TX',
        zip: '77003'
      },
      notes: 'Deep clean requested',
      status: 'COMPLETED' as const,
      total: 95,
      createdAt: '2025-08-05T09:15:00Z',
      updatedAt: '2025-08-08T12:00:00Z'
    },
    {
      id: '4',
      userId: '1',
      homeSize: 1800,
      bedrooms: 3,
      bathrooms: 2,
      frequency: 'monthly' as const,
      date: '2025-09-05',
      time: '1-3',
      address: {
        line1: '321 Elm St',
        line2: '',
        city: 'Houston',
        state: 'TX',
        zip: '77004'
      },
      notes: '',
      status: 'PENDING' as const,
      total: 140,
      createdAt: '2025-08-14T16:45:00Z',
      updatedAt: '2025-08-14T16:45:00Z'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-gray-600 mt-2">
              View and manage all your cleaning service bookings.
            </p>
          </div>
          <Link
            to="/booking"
            className="btn-primary inline-flex items-center"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Book New Service
          </Link>
        </div>
      </div>

      <BookingHistory bookings={allBookings} />
    </div>
  )
}

export default Bookings

