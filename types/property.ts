export interface Property {
  id: string
  title: string
  description: string
  location: string
  images: string[]
  pricePerNight: number
  totalPrice: number
  rating: number
  reviewCount: number
  amenities: string[]
  bedrooms: number
  bathrooms: number
  maxGuests: number
  featured: boolean
  host: {
    id: string
    name: string
    image: string
    joinedDate: string
  }
  availability: {
    [date: string]: boolean
  }
}

