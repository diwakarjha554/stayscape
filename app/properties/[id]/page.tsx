"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Property } from "@/types/property"
import { getPropertyById } from "@/lib/firebase/properties"
import { StarIcon, Users, Bed, Bath, Check, MapPin } from "lucide-react"

export default function PropertyPage() {
  const { id } = useParams()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [guests, setGuests] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (typeof id !== "string") return
        const propertyData = await getPropertyById(id)
        setProperty(propertyData)
      } catch (error) {
        console.error("Error fetching property:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [id])

  useEffect(() => {
    if (property && selectedDates.length === 2) {
      const startDate = selectedDates[0]
      const endDate = selectedDates[1]
      const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      setTotalPrice(property.pricePerNight * nights)
    } else {
      setTotalPrice(0)
    }
  }, [selectedDates, property])

  const handleBooking = () => {
    if (selectedDates.length !== 2) {
      toast({
        title: "Please select check-in and check-out dates",
        variant: "destructive",
      })
      return
    }

    // Navigate to booking page with query params
    window.location.href = `/booking?propertyId=${id}&checkIn=${selectedDates[0].toISOString()}&checkOut=${selectedDates[1].toISOString()}&guests=${guests}`
  }

  const nextImage = () => {
    if (!property) return
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    if (!property) return
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-[400px] w-full rounded-lg" />
              <div className="mt-6">
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-6 w-1/2 mb-4" />
                <div className="flex gap-4 mb-6">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
            <div>
              <Skeleton className="h-[400px] w-full rounded-lg" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!property) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
          <p className="mb-8">The property you are looking for does not exist or has been removed.</p>
          <Button asChild>
            <a href="/">Return to Home</a>
          </Button>
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
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={property.images[currentImageIndex] || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover"
              />
              {property.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full"
                    onClick={prevImage}
                  >
                    &lt;
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
                    onClick={nextImage}
                  >
                    &gt;
                  </Button>
                </>
              )}
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">{property.title}</h1>
                {property.featured && <Badge variant="secondary">Featured</Badge>}
              </div>

              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.location}</span>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-500 mr-1 fill-yellow-500" />
                  <span className="font-bold">{property.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground ml-1">({property.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-1" />
                  <span>
                    {property.bedrooms} {property.bedrooms === 1 ? "bedroom" : "bedrooms"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-1" />
                  <span>
                    {property.bathrooms} {property.bathrooms === 1 ? "bathroom" : "bathrooms"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-1" />
                  <span>Up to {property.maxGuests} guests</span>
                </div>
              </div>

              <Tabs defaultValue="description">
                <TabsList className="mb-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="host">Host</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="text-muted-foreground">
                  <p>{property.description}</p>
                </TabsContent>

                <TabsContent value="amenities">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="host">
                  <div className="flex items-center gap-4">
                    <Image
                      src={property.host.image || "/placeholder.svg"}
                      alt={property.host.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-bold">{property.host.name}</h3>
                      <p className="text-sm text-muted-foreground">Host since {property.host.joinedDate}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div>
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold">${property.pricePerNight}</span>
                    <span className="text-muted-foreground">per night</span>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                    <span className="font-medium">{property.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground ml-1">({property.reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Dates</Label>
                    <Calendar
                      mode="range"
                      selected={{
                        from: selectedDates[0] || undefined,
                        to: selectedDates[1] || undefined,
                      }}
                      onSelect={(range) => {
                        if (range?.from) {
                          if (range.to) {
                            setSelectedDates([range.from, range.to])
                          } else {
                            setSelectedDates([range.from])
                          }
                        } else {
                          setSelectedDates([])
                        }
                      }}
                      className="rounded-md border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="guests">Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      min={1}
                      max={property.maxGuests}
                      value={guests}
                      onChange={(e) => setGuests(Number.parseInt(e.target.value))}
                    />
                  </div>

                  {selectedDates.length === 2 && (
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between mb-2">
                        <span>
                          ${property.pricePerNight} x{" "}
                          {Math.ceil((selectedDates[1].getTime() - selectedDates[0].getTime()) / (1000 * 60 * 60 * 24))}{" "}
                          nights
                        </span>
                        <span>${totalPrice}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${totalPrice}</span>
                      </div>
                    </div>
                  )}

                  <Button className="w-full" size="lg" onClick={handleBooking} disabled={selectedDates.length !== 2}>
                    {selectedDates.length === 2 ? "Reserve" : "Select dates"}
                  </Button>
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

