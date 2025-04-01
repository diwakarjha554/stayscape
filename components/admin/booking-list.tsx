"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// Mock booking data for demonstration
interface Booking {
  id: string
  propertyId: string
  propertyName: string
  guestName: string
  guestEmail: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: "confirmed" | "cancelled" | "completed"
  createdAt: string
}

const MOCK_BOOKINGS: Booking[] = [
  {
    id: "booking-1",
    propertyId: "1",
    propertyName: "The Perfect Family Get Away!",
    guestName: "John Smith",
    guestEmail: "john@example.com",
    checkIn: "2023-04-25",
    checkOut: "2023-04-27",
    guests: 4,
    totalPrice: 1342,
    status: "confirmed",
    createdAt: "2023-04-10T12:00:00Z",
  },
  {
    id: "booking-2",
    propertyId: "2",
    propertyName: "Lakefront Home with Amazing Sunsets",
    guestName: "Sarah Johnson",
    guestEmail: "sarah@example.com",
    checkIn: "2023-05-15",
    checkOut: "2023-05-20",
    guests: 2,
    totalPrice: 2250,
    status: "completed",
    createdAt: "2023-04-05T14:30:00Z",
  },
  {
    id: "booking-3",
    propertyId: "3",
    propertyName: "Ski in/Ski Out Condo",
    guestName: "Michael Brown",
    guestEmail: "michael@example.com",
    checkIn: "2023-06-10",
    checkOut: "2023-06-15",
    guests: 3,
    totalPrice: 1940,
    status: "cancelled",
    createdAt: "2023-04-01T09:15:00Z",
  },
]

export function BookingList() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchBookings = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setBookings(MOCK_BOOKINGS)
      setLoading(false)
    }

    fetchBookings()
  }, [])

  const getStatusBadgeVariant = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "completed":
        return "success"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusLabel = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "Confirmed"
      case "completed":
        return "Completed"
      case "cancelled":
        return "Cancelled"
      default:
        return status
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-9 w-20 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">No bookings found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="space-y-1">
            <h3 className="font-medium">{booking.propertyName}</h3>
            <p className="text-sm text-muted-foreground">
              {format(new Date(booking.checkIn), "MMM d, yyyy")} - {format(new Date(booking.checkOut), "MMM d, yyyy")}
            </p>
            <p className="text-sm">
              {booking.guestName} ({booking.guestEmail})
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-medium">${booking.totalPrice}</p>
              <Badge variant={getStatusBadgeVariant(booking.status)}>{getStatusLabel(booking.status)}</Badge>
            </div>
            <Button variant="outline" size="sm">
              Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

