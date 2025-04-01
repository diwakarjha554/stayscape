"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/components/auth-provider"
import { AddProperty } from "@/lib/firebase/properties"
import type { Property } from "@/types/property"
import { ArrowLeft, Upload } from "lucide-react"

export default function NewPropertyPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    pricePerNight: 0,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    featured: false,
    amenities: [] as string[],
  })

  const [images, setImages] = useState<File[]>([])
  const [submitting, setSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: Number.parseInt(value) || 0,
    })
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  const handleAmenityToggle = (amenity: string) => {
    setFormData((prev) => {
      const amenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity]

      return {
        ...prev,
        amenities,
      }
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)
      setImages((prev) => [...prev, ...fileArray])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // In a real app, you would upload images to storage and get URLs
      const imageUrls =
        images.length > 0
          ? Array(images.length).fill("/placeholder.svg?height=400&width=600")
          : ["/placeholder.svg?height=400&width=600"]

      const propertyData: Omit<Property, "id"> = {
        ...formData,
        images: imageUrls,
        totalPrice: formData.pricePerNight * 2, // Example calculation
        rating: 0,
        reviewCount: 0,
        host: {
          id: user?.uid || "",
          name: user?.displayName || "Host",
          image: user?.photoURL || "/placeholder.svg?height=100&width=100",
          joinedDate: new Date().toISOString(),
        },
        availability: {
          // Default availability for next 30 days
          ...Array.from({ length: 30 }).reduce((acc, _, i) => {
            const date = new Date()
            date.setDate(date.getDate() + i)
            return {
              ...acc,
              [date.toISOString().split("T")[0]]: true,
            }
          }, {}),
        },
      }

      const propertyId = await AddProperty(propertyData)

      toast({
        title: "Success!",
        description: "Your property has been created successfully.",
      })

      router.push("/admin")
    } catch (error) {
      console.error("Error creating property:", error)
      toast({
        title: "Error",
        description: "Failed to create property. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Redirect if not admin
  if (!loading && (!user || !user.isAdmin)) {
    router.push("/")
    return null
  }

  const amenitiesList = [
    "Wifi",
    "Kitchen",
    "Washer",
    "Dryer",
    "Air Conditioning",
    "Heating",
    "Dedicated Workspace",
    "TV",
    "Hair Dryer",
    "Iron",
    "Pool",
    "Hot Tub",
    "Free Parking",
    "EV Charger",
    "Crib",
    "Gym",
    "BBQ Grill",
    "Breakfast",
    "Indoor Fireplace",
    "Smoking Allowed",
    "Waterfront",
    "Ski-in/Ski-out",
    "Beachfront",
  ]

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Add New Property</CardTitle>
            <CardDescription>Fill in the details below to create a new vacation rental property</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="title">Property Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Cozy Beach House with Ocean View"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your property in detail..."
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, State"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pricePerNight">Price Per Night ($)</Label>
                    <Input
                      id="pricePerNight"
                      name="pricePerNight"
                      type="number"
                      min="0"
                      value={formData.pricePerNight || ""}
                      onChange={handleNumberChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxGuests">Max Guests</Label>
                    <Input
                      id="maxGuests"
                      name="maxGuests"
                      type="number"
                      min="1"
                      value={formData.maxGuests}
                      onChange={handleNumberChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      name="bedrooms"
                      type="number"
                      min="0"
                      value={formData.bedrooms}
                      onChange={handleNumberChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      name="bathrooms"
                      type="number"
                      min="0"
                      step="0.5"
                      value={formData.bathrooms}
                      onChange={handleNumberChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                  />
                  <Label htmlFor="featured">Feature this property on the homepage</Label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={`amenity-${amenity}`}
                        checked={formData.amenities.includes(amenity)}
                        onCheckedChange={() => handleAmenityToggle(amenity)}
                      />
                      <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Property Images</h3>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">Drag and drop images here or click to browse</p>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Button type="button" variant="outline" onClick={() => document.getElementById("images")?.click()}>
                    Select Images
                  </Button>
                  {images.length > 0 && (
                    <p className="mt-2 text-sm">
                      {images.length} {images.length === 1 ? "image" : "images"} selected
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? "Creating Property..." : "Create Property"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
      <Footer />
    </>
  )
}

