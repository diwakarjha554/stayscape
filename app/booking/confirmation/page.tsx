"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle } from "lucide-react"

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("bookingId")
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (!bookingId) return

    // Countdown for redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          window.location.href = "/"
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [bookingId])

  if (!bookingId) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Invalid confirmation</h1>
            <p className="mb-6">No booking information found.</p>
            <Button asChild>
              <a href="/">Return to Home</a>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-3xl">Booking Confirmed!</CardTitle>
              <CardDescription>Your reservation has been successfully booked</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">Thank you for booking with StayScape. Your booking ID is:</p>
              <p className="text-xl font-bold">{bookingId}</p>
              <p>We've sent a confirmation email with all the details of your booking. Please check your inbox.</p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button asChild className="w-full">
                <a href="/">Return to Home</a>
              </Button>
              <p className="text-sm text-muted-foreground">Redirecting to homepage in {countdown} seconds...</p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}

