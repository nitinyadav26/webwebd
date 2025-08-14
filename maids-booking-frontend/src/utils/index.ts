import { ValidationError } from '../types'

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatTime = (time: string): string => {
  const [start, end] = time.split('-')
  return `${start}:00 - ${end}:00`
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export const calculatePrice = (
  squareFeet: string,
  bedrooms: number,
  bathrooms: number,
  kitchen: number,
  livingRoom: number,
  diningRoom: number,
  masterBedroom: number,
  masterBathroom: number,
  halfBathroom: number,
  office: number,
  theater: number,
  typeOfService: string,
  frequency: string,
  extras: any
): number => {
  let basePrice = 0
  
  // Base price calculation based on square footage
  const sqFtMatch = squareFeet.match(/(\d+)/)
  const sqFt = sqFtMatch ? parseInt(sqFtMatch[1]) : 1000
  
  if (sqFt < 1000) basePrice = 35
  else if (sqFt < 2000) basePrice = 50
  else if (sqFt < 3000) basePrice = 75
  else if (sqFt < 4000) basePrice = 100
  else basePrice = 125
  
  // Add service type cost
  if (typeOfService === 'move-out') basePrice += 50
  else if (typeOfService === 'maintenance') basePrice += 25
  
  // Add room costs
  basePrice += bedrooms * 15
  basePrice += bathrooms * 20
  basePrice += kitchen * 25
  basePrice += livingRoom * 20
  basePrice += diningRoom * 15
  basePrice += masterBedroom * 20
  basePrice += masterBathroom * 25
  basePrice += halfBathroom * 15
  basePrice += office * 15
  basePrice += theater * 20
  
  // Apply frequency discount
  let discount = 0
  switch (frequency) {
    case 'weekly': discount = 0.25; break
    case 'bi-weekly': discount = 0.15; break
    case 'monthly': discount = 0.10; break
    case 'every-3-weeks': discount = 0.12; break
    case 'every-4-weeks': discount = 0.10; break
    default: discount = 0
  }
  
  basePrice = basePrice * (1 - discount)
  
  // Add extras with proper pricing
  let extrasCost = 0
  if (extras.blinds) extrasCost += 10
  if (extras.insideCabinets) extrasCost += 80
  if (extras.insideOven) extrasCost += 40
  if (extras.petInHome) extrasCost += 15
  if (extras.dustBaseboards) extrasCost += sqFt < 2500 ? 20 : 30
  if (extras.handCleanBaseboards) extrasCost += sqFt < 2500 ? 40 : 60
  if (extras.ceilingFanDusting) extrasCost += 10
  if (extras.exteriorCabinets) extrasCost += 40
  if (extras.dustingShutters) extrasCost += sqFt < 2500 ? 40 : 60
  if (extras.vacuumCouch) extrasCost += 15
  if (extras.interiorDoors) extrasCost += 75
  if (extras.insideRefrigerator) extrasCost += 45
  
  return Math.round(basePrice + extrasCost)
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\D/g, ''))
}

export const validateBookingForm = (data: any): ValidationError[] => {
  const errors: ValidationError[] = []
  
  // Required fields validation
  if (!data.zipCode) errors.push({ field: 'zipCode', message: 'ZIP code is required' })
  if (data.bedrooms < 0) errors.push({ field: 'bedrooms', message: 'Bedrooms cannot be negative' })
  if (data.bathrooms < 0) errors.push({ field: 'bathrooms', message: 'Bathrooms cannot be negative' })
  if (data.kitchen < 0) errors.push({ field: 'kitchen', message: 'Kitchen cannot be negative' })
  if (data.livingRoom < 0) errors.push({ field: 'livingRoom', message: 'Living room cannot be negative' })
  if (data.diningRoom < 0) errors.push({ field: 'diningRoom', message: 'Dining room cannot be negative' })
  if (data.masterBedroom < 0) errors.push({ field: 'masterBedroom', message: 'Master bedroom cannot be negative' })
  if (data.masterBathroom < 0) errors.push({ field: 'masterBathroom', message: 'Master bathroom cannot be negative' })
  if (data.halfBathroom < 0) errors.push({ field: 'halfBathroom', message: 'Half bathroom cannot be negative' })
  if (data.office < 0) errors.push({ field: 'office', message: 'Office cannot be negative' })
  if (data.theater < 0) errors.push({ field: 'theater', message: 'Theater cannot be negative' })
  if (!data.squareFeet) errors.push({ field: 'squareFeet', message: 'Square footage is required' })
  if (!data.typeOfService) errors.push({ field: 'typeOfService', message: 'Service type is required' })
  if (!data.frequency) errors.push({ field: 'frequency', message: 'Frequency is required' })
  if (!data.serviceDate) errors.push({ field: 'serviceDate', message: 'Service date is required' })
  if (!data.arrivalTime) errors.push({ field: 'arrivalTime', message: 'Arrival time is required' })
  if (!data.firstName) errors.push({ field: 'firstName', message: 'First name is required' })
  if (!data.lastName) errors.push({ field: 'lastName', message: 'Last name is required' })
  if (!data.email) errors.push({ field: 'email', message: 'Email is required' })
  if (!validateEmail(data.email)) errors.push({ field: 'email', message: 'Please enter a valid email address' })
  if (!data.phoneNumber) errors.push({ field: 'phoneNumber', message: 'Phone number is required' })
  if (!validatePhone(data.phoneNumber)) errors.push({ field: 'phoneNumber', message: 'Please enter a valid phone number' })
  if (!data.address.line1) errors.push({ field: 'address.line1', message: 'Address is required' })
  if (!data.address.city) errors.push({ field: 'address.city', message: 'City is required' })
  if (!data.address.state) errors.push({ field: 'address.state', message: 'State is required' })
  if (!data.address.zipCode) errors.push({ field: 'address.zipCode', message: 'ZIP code is required' })
  if (!data.paymentMethod) errors.push({ field: 'paymentMethod', message: 'Payment method is required' })
  
  return errors
}

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'CONFIRMED':
      return 'bg-green-100 text-green-800'
    case 'PENDING_PAYMENT':
      return 'bg-yellow-100 text-yellow-800'
    case 'IN_PROGRESS':
      return 'bg-blue-100 text-blue-800'
    case 'COMPLETED':
      return 'bg-gray-100 text-gray-800'
    case 'CANCELLED':
      return 'bg-red-100 text-red-800'
    case 'PENDING':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const getStatusText = (status: string): string => {
  return status.replace(/_/g, ' ').toLowerCase()
    .replace(/\b\w/g, l => l.toUpperCase())
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}
