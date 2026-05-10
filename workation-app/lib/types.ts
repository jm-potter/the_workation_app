export type UserRole = 'hr' | 'emp' | 'adm' | 'prt' | 'gov'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  company_id: string | null
  created_at: string
}

export interface Company {
  id: string
  name: string
  contact_name: string
  employee_count: number
  budget: number
  budget_used: number
  approved: boolean
  created_at: string
}

export interface Accommodation {
  id: string
  name: string
  location: string
  address: string
  lat: number
  lng: number
  price_per_night: number
  wifi: boolean
  workspace: boolean
  images: string[]
  amenities: string[]
  description: string
  created_at: string
}

export interface Booking {
  id: string
  user_id: string
  accommodation_id: string
  company_id: string
  start_date: string
  end_date: string
  guests: number
  total_price: number
  status: BookingStatus
  created_at: string
}
