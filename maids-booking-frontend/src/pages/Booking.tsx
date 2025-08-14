import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateBookingForm, calculatePrice } from '../utils'
import { ValidationError, BookingFormData } from '../types'

const Booking: React.FC = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [formData, setFormData] = useState<BookingFormData>({
    // Service Area Check
    zipCode: '',
    
    // Service Details
    bedrooms: 0,
    bathrooms: 0,
    kitchen: 0,
    livingRoom: 0,
    diningRoom: 0,
    masterBedroom: 0,
    masterBathroom: 0,
    halfBathroom: 0,
    office: 0,
    theater: 0,
    squareFeet: '1000 - 1999 sq/ft',
    
    // Service Type and Frequency
    typeOfService: 'one-time',
    frequency: 'one-time',
    
    // Schedule
    serviceDate: '',
    arrivalTime: '',
    
    // Extras
    extras: {
      blinds: false,
      insideCabinets: false,
      insideOven: false,
      petInHome: false,
      dustBaseboards: false,
      handCleanBaseboards: false,
      ceilingFanDusting: false,
      exteriorCabinets: false,
      dustingShutters: false,
      vacuumCouch: false,
      interiorDoors: false,
      insideRefrigerator: false,
    },
    
    // Special Instructions
    specialInstructions: '',
    
    // Contact Details
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    
    // Service Address
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zipCode: '',
    },
    
    // Payment Details
    couponCode: '',
    paymentMethod: 'credit-debit',
    tip: 0,
  })

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      if (parent === 'address' && child) {
        setFormData(prev => ({
          ...prev,
          address: {
            ...prev.address,
            [child]: value
          }
        }))
      } else if (parent === 'extras' && child) {
        setFormData(prev => ({
          ...prev,
          extras: {
            ...prev.extras,
            [child]: value
          }
        }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const validationErrors = validateBookingForm(formData)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }
    
    // Calculate price
    const price = calculatePrice(
      formData.squareFeet,
      formData.bedrooms,
      formData.bathrooms,
      formData.kitchen,
      formData.livingRoom,
      formData.diningRoom,
      formData.masterBedroom,
      formData.masterBathroom,
      formData.halfBathroom,
      formData.office,
      formData.theater,
      formData.typeOfService,
      formData.frequency,
      formData.extras
    )
    
    // TODO: Submit booking to API
    console.log('Booking submitted:', { ...formData, price })
    navigate('/dashboard')
  }

  const nextStep = () => {
    const currentStepErrors = validateCurrentStep()
    if (currentStepErrors.length === 0) {
      setStep(step + 1)
      setErrors([])
    } else {
      setErrors(currentStepErrors)
    }
  }
  
  const prevStep = () => {
    setStep(step - 1)
    setErrors([])
  }
  
  const validateCurrentStep = (): ValidationError[] => {
    switch (step) {
      case 1:
        return validateBookingForm({ ...formData, serviceDate: '', arrivalTime: '', address: { line1: '', city: '', state: '', zipCode: '' } })
      case 2:
        return validateBookingForm({ ...formData, specialInstructions: '' })
      case 3:
        return validateBookingForm({ ...formData, couponCode: '', paymentMethod: 'credit-debit', tip: 0 })
      default:
        return []
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium text-blue-900 mb-2">Service Area Check</h3>
        <p className="text-blue-700 text-sm mb-4">
          Looking for One Time or Move Out Clean? This service is completely customizable - built your way, not ours.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zip/postal code *
            </label>
            <input
              type="text"
              className="input-field"
              value={formData.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              placeholder="Enter your zip/postal code"
            />
          </div>
          <div className="flex items-end">
            <button
              type="button"
              className="btn-primary"
            >
              Check Availability
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Service Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bedroom *
            </label>
            <input
              type="number"
              min="0"
              className="input-field"
              value={formData.bedrooms}
              onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bathroom *
            </label>
            <input
              type="number"
              min="0"
              className="input-field"
              value={formData.bathrooms}
              onChange={(e) => handleInputChange('bathrooms', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kitchen *
            </label>
            <input
              type="number"
              min="0"
              className="input-field"
              value={formData.kitchen}
              onChange={(e) => handleInputChange('kitchen', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Living Room *
            </label>
            <input
              type="number"
              min="0"
              className="input-field"
              value={formData.livingRoom}
              onChange={(e) => handleInputChange('livingRoom', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dining Room *
            </label>
            <input
              type="number"
              min="0"
              className="input-field"
              value={formData.diningRoom}
              onChange={(e) => handleInputChange('diningRoom', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Master Bedroom *
            </label>
            <input
              type="number"
              min="0"
              className="input-field"
              value={formData.masterBedroom}
              onChange={(e) => handleInputChange('masterBedroom', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Master Bathroom *
            </label>
            <input
              type="number"
              min="0"
              className="input-field"
              value={formData.masterBathroom}
              onChange={(e) => handleInputChange('masterBathroom', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Half Bathroom *
            </label>
            <input
              type="number"
              min="0"
              className="input-field"
              value={formData.halfBathroom}
              onChange={(e) => handleInputChange('halfBathroom', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Office *
            </label>
            <input
              type="number"
              min="0"
              className="input-field"
              value={formData.office}
              onChange={(e) => handleInputChange('office', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theater *
            </label>
            <input
              type="number"
              min="0"
              className="input-field"
              value={formData.theater}
              onChange={(e) => handleInputChange('theater', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Square feet *
            </label>
            <select
              className="input-field"
              value={formData.squareFeet}
              onChange={(e) => handleInputChange('squareFeet', e.target.value)}
            >
              <option value="1000 - 1999 sq/ft">1000 - 1999 sq/ft</option>
              <option value="2000 - 2999 sq/ft">2000 - 2999 sq/ft</option>
              <option value="3000 - 3999 sq/ft">3000 - 3999 sq/ft</option>
              <option value="4000+ sq/ft">4000+ sq/ft</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type of service *
            </label>
            <select
              className="input-field"
              value={formData.typeOfService}
              onChange={(e) => handleInputChange('typeOfService', e.target.value)}
            >
              <option value="one-time">One Time Clean/ Move Out Clean</option>
              <option value="move-out">Move Out Clean</option>
              <option value="maintenance">Maintenance Service</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            When would you like us to come?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Service date *</label>
              <input
                type="date"
                className="input-field"
                value={formData.serviceDate}
                onChange={(e) => handleInputChange('serviceDate', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Arrival time *</label>
              <select
                className="input-field"
                value={formData.arrivalTime}
                onChange={(e) => handleInputChange('arrivalTime', e.target.value)}
              >
                <option value="">Select time</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="4:00 PM">4:00 PM</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How often would you like us to come? *
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="frequency"
                value="one-time"
                checked={formData.frequency === 'one-time'}
                onChange={(e) => handleInputChange('frequency', e.target.value)}
                className="mr-2"
              />
              One Time Cleaning
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="frequency"
                value="weekly"
                checked={formData.frequency === 'weekly'}
                onChange={(e) => handleInputChange('frequency', e.target.value)}
                className="mr-2"
              />
              Weekly Cleaning (25% OFF)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="frequency"
                value="bi-weekly"
                checked={formData.frequency === 'bi-weekly'}
                onChange={(e) => handleInputChange('frequency', e.target.value)}
                className="mr-2"
              />
              Bi-Weekly Cleaning (15% OFF)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="frequency"
                value="monthly"
                checked={formData.frequency === 'monthly'}
                onChange={(e) => handleInputChange('frequency', e.target.value)}
                className="mr-2"
              />
              Monthly Cleaning (10% OFF)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="frequency"
                value="every-3-weeks"
                checked={formData.frequency === 'every-3-weeks'}
                onChange={(e) => handleInputChange('frequency', e.target.value)}
                className="mr-2"
              />
              Every 3 Weeks (12% OFF)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="frequency"
                value="every-4-weeks"
                checked={formData.frequency === 'every-4-weeks'}
                onChange={(e) => handleInputChange('frequency', e.target.value)}
                className="mr-2"
              />
              Every 4 Weeks (10% OFF)
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={nextStep}
          className="btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Extras</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.extras.blinds}
              onChange={(e) => handleInputChange('extras.blinds', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Blinds +$10</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.extras.insideCabinets}
              onChange={(e) => handleInputChange('extras.insideCabinets', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Inside Kitchen/Bathroom Cabinets - Move out Only +$80</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.extras.insideOven}
              onChange={(e) => handleInputChange('extras.insideOven', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Inside the Oven +$40</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.extras.petInHome}
              onChange={(e) => handleInputChange('extras.petInHome', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Pet in Home +$15</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.extras.dustBaseboards}
              onChange={(e) => handleInputChange('extras.dustBaseboards', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Dust Base Boards - under 2500 sf +$20</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.extras.handCleanBaseboards}
              onChange={(e) => handleInputChange('extras.handCleanBaseboards', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Hand Clean Base Boards - under 2500 sf +$40</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.extras.ceilingFanDusting}
              onChange={(e) => handleInputChange('extras.ceilingFanDusting', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Ceiling fan dusting over 10-20 feet +$10</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.extras.exteriorCabinets}
              onChange={(e) => handleInputChange('extras.exteriorCabinets', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Cleaning of Exterior Kitchen/bathroom cabinets +$40</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.extras.dustingShutters}
              onChange={(e) => handleInputChange('extras.dustingShutters', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Dusting of Shutters - under 2500 sf +$40</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.extras.vacuumCouch}
              onChange={(e) => handleInputChange('extras.vacuumCouch', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Vacuum Couch +$15</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.extras.interiorDoors}
              onChange={(e) => handleInputChange('extras.interiorDoors', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Cleaning of interior doors and door frames +$75</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.extras.insideRefrigerator}
              onChange={(e) => handleInputChange('extras.insideRefrigerator', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Inside Refrigerator +$45</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Special instructions/notes
        </label>
        <textarea
          className="input-field"
          rows={4}
          value={formData.specialInstructions}
          onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
          placeholder="Your Comments Here"
        />
        <p className="text-sm text-gray-600 mt-2">
          Please Note: You must complete two discounted recurring services before you can cancel or you will be charged $100. 
          This is to protect the integrity of our programs.
        </p>
        <p className="text-sm text-gray-600 mt-1">
          We also require a 24 hr notice for cancellations or you will be charged a $50 late cancellation fee
        </p>
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="btn-secondary"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First name *
            </label>
            <input
              type="text"
              className="input-field"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="First name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last name *
            </label>
            <input
              type="text"
              className="input-field"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Last name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              className="input-field"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone number *
            </label>
            <input
              type="tel"
              className="input-field"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="Phone number"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Service Address</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address line 1 *
            </label>
            <input
              type="text"
              className="input-field"
              value={formData.address.line1}
              onChange={(e) => handleInputChange('address.line1', e.target.value)}
              placeholder="Address line 1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address line 2 (apt/suite)
            </label>
            <input
              type="text"
              className="input-field"
              value={formData.address.line2}
              onChange={(e) => handleInputChange('address.line2', e.target.value)}
              placeholder="Address line 2 (apt/suite)"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                className="input-field"
                value={formData.address.city}
                onChange={(e) => handleInputChange('address.city', e.target.value)}
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <select
                className="input-field"
                value={formData.address.state}
                onChange={(e) => handleInputChange('address.state', e.target.value)}
              >
                <option value="">Select state</option>
                <option value="TX">Texas</option>
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="FL">Florida</option>
                <option value="IL">Illinois</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zip code *
              </label>
              <input
                type="text"
                className="input-field"
                value={formData.address.zipCode}
                onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                placeholder="Zip code"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="btn-secondary"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  )

  const renderStep4 = () => {
    const subtotal = calculatePrice(
      formData.squareFeet,
      formData.bedrooms,
      formData.bathrooms,
      formData.kitchen,
      formData.livingRoom,
      formData.diningRoom,
      formData.masterBedroom,
      formData.masterBathroom,
      formData.halfBathroom,
      formData.office,
      formData.theater,
      formData.typeOfService,
      formData.frequency,
      formData.extras
    )
    const serviceTypeCost = formData.typeOfService === 'move-out' ? 50 : 0
    
    // Calculate extras cost properly
    const sqFtMatch = formData.squareFeet.match(/(\d+)/)
    const sqFt = sqFtMatch ? parseInt(sqFtMatch[1]) : 1000
    let extrasCost = 0
    if (formData.extras.blinds) extrasCost += 10
    if (formData.extras.insideCabinets) extrasCost += 80
    if (formData.extras.insideOven) extrasCost += 40
    if (formData.extras.petInHome) extrasCost += 15
    if (formData.extras.dustBaseboards) extrasCost += sqFt < 2500 ? 20 : 30
    if (formData.extras.handCleanBaseboards) extrasCost += sqFt < 2500 ? 40 : 60
    if (formData.extras.ceilingFanDusting) extrasCost += 10
    if (formData.extras.exteriorCabinets) extrasCost += 40
    if (formData.extras.dustingShutters) extrasCost += sqFt < 2500 ? 40 : 60
    if (formData.extras.vacuumCouch) extrasCost += 15
    if (formData.extras.interiorDoors) extrasCost += 75
    if (formData.extras.insideRefrigerator) extrasCost += 45
    
    const salesTax = (subtotal + serviceTypeCost + extrasCost) * 0.075
    const ccSurcharge = formData.paymentMethod === 'credit-debit' ? (subtotal + serviceTypeCost + extrasCost) * 0.03 : 0
    const total = subtotal + serviceTypeCost + extrasCost + salesTax + ccSurcharge + formData.tip

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coupon code
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="input-field flex-1"
                  value={formData.couponCode}
                  onChange={(e) => handleInputChange('couponCode', e.target.value)}
                  placeholder="ENTER CODE"
                />
                <button
                  type="button"
                  className="btn-secondary px-4"
                >
                  Apply Discount
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment
              </label>
              <select
                className="input-field"
                value={formData.paymentMethod}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              >
                <option value="credit-debit">Credit/Debit Card</option>
                <option value="zelle">ZELLE</option>
                <option value="check">CHECK</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tip
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="input-field"
              value={formData.tip}
              onChange={(e) => handleInputChange('tip', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
            />
            <p className="text-sm text-gray-600 mt-1">
              Tips are much appreciated but not a requirement
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Booking Summary</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Service Date:</span>
              <span>{formData.serviceDate}</span>
            </div>
            <div className="flex justify-between">
              <span>Arrival Time:</span>
              <span>{formData.arrivalTime}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Type:</span>
              <span>{formData.typeOfService === 'one-time' ? 'One Time Clean' : formData.typeOfService === 'move-out' ? 'Move Out Clean' : 'Maintenance Service'}</span>
            </div>
            <div className="flex justify-between">
              <span>Frequency:</span>
              <span>{formData.frequency === 'one-time' ? 'One Time Cleaning' : 
                     formData.frequency === 'weekly' ? 'Weekly Cleaning (25% OFF)' :
                     formData.frequency === 'bi-weekly' ? 'Bi-Weekly Cleaning (15% OFF)' :
                     formData.frequency === 'monthly' ? 'Monthly Cleaning (10% OFF)' :
                     formData.frequency === 'every-3-weeks' ? 'Every 3 Weeks (12% OFF)' :
                     'Every 4 Weeks (10% OFF)'}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Type:</span>
              <span>${serviceTypeCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Extras:</span>
              <span>${extrasCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Sales Tax:</span>
              <span>${salesTax.toFixed(2)}</span>
            </div>
            {ccSurcharge > 0 && (
              <div className="flex justify-between">
                <span>CC Surcharge:</span>
                <span>${ccSurcharge.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Tip:</span>
              <span>${formData.tip.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            Please note that Maids of Cyfair has a $125.00 minimum for all homes, pretax.
          </p>
        </div>

        <div className="text-sm text-gray-600">
          <p>
            By clicking the Book Now button you are agreeing to our Terms of Service and Privacy Policy.
          </p>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="btn-secondary"
          >
            Back
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            Book Now
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Book a Cleaning Service</h1>
        <p className="text-gray-600 mt-2">
          Schedule your professional cleaning service in just a few steps.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 4 && (
                <div className={`w-16 h-1 mx-2 ${
                  step > stepNumber ? 'bg-primary-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-2 text-sm text-gray-600">
          <span className={step >= 1 ? 'text-primary-600' : ''}>Service Area & Details</span>
          <span className={`mx-4 ${step >= 2 ? 'text-primary-600' : ''}`}>Extras & Notes</span>
          <span className={`mx-4 ${step >= 3 ? 'text-primary-600' : ''}`}>Contact & Address</span>
          <span className={step >= 4 ? 'text-primary-600' : ''}>Payment & Review</span>
        </div>
      </div>

      {/* Error Display */}
      {errors.length > 0 && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-red-800 mb-2">Please fix the following errors:</h3>
          <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>{error.message}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </form>
    </div>
  )
}

export default Booking

