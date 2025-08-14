export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  roles: string[]
  createdAt?: string
  updatedAt?: string
}

export interface Address {
  line1: string
  line2?: string
  city: string
  state: string
  zip: string
}

export interface Booking {
  id: string
  userId: string
  homeSize: number
  bedrooms: number
  bathrooms: number
  frequency: 'one-time' | 'weekly' | 'biweekly' | 'monthly'
  date: string
  time: string
  address: Address
  notes?: string
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'PENDING_PAYMENT'
  total: number
  createdAt: string
  updatedAt: string
}

export interface ServicePackage {
  id: string
  name: string
  description: string
  basePrice: number
  duration: number // in hours
  includes: string[]
}

export interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  available: boolean
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface ProfileUpdateData {
  firstName?: string
  lastName?: string
  phone?: string
}

export interface BookingFormData {
  // Service Area Check
  zipCode: string
  
  // Service Details
  bedrooms: number
  bathrooms: number
  kitchen: number
  livingRoom: number
  diningRoom: number
  masterBedroom: number
  masterBathroom: number
  halfBathroom: number
  office: number
  theater: number
  squareFeet: string
  
  // Service Type and Frequency
  typeOfService: 'one-time' | 'move-out' | 'maintenance'
  frequency: 'one-time' | 'weekly' | 'bi-weekly' | 'monthly' | 'every-3-weeks' | 'every-4-weeks'
  
  // Schedule
  serviceDate: string
  arrivalTime: string
  
  // Extras
  extras: {
    blinds: boolean
    insideCabinets: boolean
    insideOven: boolean
    petInHome: boolean
    dustBaseboards: boolean
    handCleanBaseboards: boolean
    ceilingFanDusting: boolean
    exteriorCabinets: boolean
    dustingShutters: boolean
    vacuumCouch: boolean
    interiorDoors: boolean
    insideRefrigerator: boolean
  }
  
  // Special Instructions
  specialInstructions: string
  
  // Contact Details
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  
  // Service Address
  address: {
    line1: string
    line2: string
    city: string
    state: string
    zipCode: string
  }
  
  // Payment Details
  couponCode: string
  paymentMethod: 'credit-debit' | 'zelle' | 'check'
  tip: number
}

export interface ValidationError {
  field: string
  message: string
}
