"use client"

import { useEffect, useState } from "react"
import { PropertyCard } from "@/components/property-card"
import type { Property } from "@/types/property"
import { getProperties } from "@/lib/firebase/properties"
import { Skeleton } from "@/components/ui/skeleton"

export function PropertyGrid() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertiesData = await getProperties()
        setProperties(propertiesData)
      } catch (error) {
        console.error("Error fetching properties:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-lg overflow-hidden border shadow">
            <Skeleton className="h-48 w-full" />
            <div className="p-4">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-4 w-32 mb-4" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-24 mt-2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">No properties found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your search criteria</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}

