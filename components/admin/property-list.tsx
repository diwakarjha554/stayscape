"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import type { Property } from "@/types/property"
import { getProperties, deleteProperty } from "@/lib/firebase/properties"
import { Edit, Trash2, Eye } from "lucide-react"

export function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertiesData = await getProperties()
        setProperties(propertiesData)
      } catch (error) {
        console.error("Error fetching properties:", error)
        toast({
          title: "Error",
          description: "Failed to load properties",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [toast])

  const handleDeleteProperty = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return

    try {
      await deleteProperty(id)
      setProperties(properties.filter((property) => property.id !== id))
      toast({
        title: "Success",
        description: "Property deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting property:", error)
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
            <Skeleton className="h-16 w-16 rounded-md" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">No properties found</p>
        <Button asChild>
          <Link href="/admin/properties/new">Add Your First Property</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {properties.map((property) => (
        <div key={property.id} className="flex items-center space-x-4 p-4 border rounded-lg">
          <div className="relative h-16 w-16 rounded-md overflow-hidden">
            <Image src={property.images[0] || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="font-medium">{property.title}</h3>
              {property.featured && (
                <Badge variant="outline" className="ml-2">
                  Featured
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{property.location}</p>
          </div>
          <div className="text-right">
            <p className="font-medium">${property.pricePerNight}</p>
            <p className="text-sm text-muted-foreground">per night</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" asChild>
              <Link href={`/properties/${property.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href={`/admin/properties/${property.id}`}>
                <Edit className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleDeleteProperty(property.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

