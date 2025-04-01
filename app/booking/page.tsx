"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Property } from "@/types/property"
import { getPropertyById } from "@/lib/firebase/properties"
import { useAuth } from "@/components/auth-provider"
import { loadStripe } from "@stripe/stripe-js"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

export default function BookingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  const propertyId = searchParams.get("propertyId")
  const checkInParam = searchParams.get("checkIn")
  const checkOutParam = searchParams.get("checkOut")
  const guestsParam = searchParams.get("guests")

  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [bookingDetails, setBookingDetails] = useState({
    firstName: user?.displayName?.split(" ")[0] || "",
    lastName: user?.displayName?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
  })
  const [totalPrice, setTotalPrice] = useState(0)
  const [nights, setNights] = useState(0)
  const [processingPayment, setProcessingPayment] = useState(false)

  useEffect(() => {
    if (!propertyId || !checkInParam || !checkOutParam) {
      toast({
        title: "Missing booking information",
        description: "Please select a property and dates before booking.",
        variant: "destructive",
      })
      router.push("/")
      return
    }

    const fetchProperty = async () => {
      try {
        const propertyData = await getPropertyById(propertyId)
        if (!propertyData) {
          toast({
            title: "Property not found",
            description: "The property you're trying to book doesn't exist.",
            variant: "destructive",
          })
          router.push("/")
          return
        }

        setProperty(propertyData)

        // Calculate total price
        const checkIn = new Date(checkInParam)
        const checkOut = new Date(checkOutParam)
        const nightsCount = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
        setNights(nightsCount)
        setTotalPrice(propertyData.pricePerNight * nightsCount)
      } catch (error) {
        console.error("Error fetching property:", error)
        toast({
          title: "Error loading property",
          description: "There was an error loading the property details.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [propertyId, checkInParam, checkOutParam, guestsParam, router, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBookingDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!property || !checkInParam || !checkOutParam) return

    setProcessingPayment(true)

    try {
      // In a real app, you would create a booking in your database
      // and then redirect to Stripe for payment

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful booking
      toast({
        title: "Booking confirmed!",
        description: `Your stay at ${property.title} has been booked. Check your email for details.`,
      })

      // Send confirmation email (this would be done server-side in a real app)
      console.log(`Sending confirmation email to ${bookingDetails.email}`)

      // Redirect to confirmation page
      router.push(`/booking/confirmation?bookingId=BOOK-${Date.now()}`)
    } catch (error) {
      console.error("Error processing booking:", error)
      toast({
        title: "Booking failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setProcessingPayment(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Loading booking details...</h1>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!property || !checkInParam || !checkOutParam) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Invalid booking request</h1>
            <p className="mb-6">Please select a property and dates before booking.</p>
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
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Complete your booking</h1>

            <form onSubmit={handleSubmit}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Guest Information</CardTitle>
                  <CardDescription>Please provide your contact details for the booking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={bookingDetails.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={bookingDetails.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={bookingDetails.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={bookingDetails.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>Secure payment processing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="4242 4242 4242 4242" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" required />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Your payment information is encrypted and secure. We never store your full card details.
                  </p>
                </CardFooter>
              </Card>

              <Button type="submit" className="w-full" size="lg" disabled={processingPayment}>
                {processingPayment ? "Processing..." : `Complete Booking - $${totalPrice}`}
              </Button>
            </form>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg">{property.title}</h3>
                  <p className="text-muted-foreground">{property.location}</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Check-in</span>
                    <span className="font-medium">{format(new Date(checkInParam), "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out</span>
                    <span className="font-medium">{format(new Date(checkOutParam), "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests</span>
                    <span className="font-medium">{guestsParam}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>
                      ${property.pricePerNight} x {nights} nights
                    </span>
                    <span>${property.pricePerNight * nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>$0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>$0</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

