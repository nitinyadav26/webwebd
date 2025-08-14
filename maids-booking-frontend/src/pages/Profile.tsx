import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { validateEmail, validatePhone } from '../utils'

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validation
    if (!formData.firstName?.trim() || !formData.lastName?.trim()) {
      setError('First name and last name are required.')
      setLoading(false)
      return
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.')
      setLoading(false)
      return
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      setError('Please enter a valid phone number.')
      setLoading(false)
      return
    }

    try {
      await updateProfile(formData)
      setIsEditing(false)
    } catch (error) {
      setError('Failed to update profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: ''
    })
    setIsEditing(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-2">
          Manage your account information and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-secondary"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="input-field"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="input-field"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  placeholder="(555) 123-4567"
                />
              </div>

              {isEditing && (
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Account Security */}
          <div className="card mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Security</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Password</h3>
                  <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                </div>
                <button className="btn-secondary">
                  Change Password
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600">Add an extra layer of security</p>
                </div>
                <button className="btn-secondary">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Summary */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Account Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium">August 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Bookings</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Status</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Book New Service
                </div>
              </button>
              
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  View Booking History
                </div>
              </button>
              
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Help & Support
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
