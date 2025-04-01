import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"
import type { Property } from "@/types/property"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`}>
      <div className="group rounded-lg overflow-hidden border bg-card text-card-foreground shadow transition-all hover:shadow-lg">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={property.images[0] || "/placeholder.svg"}
            alt={property.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {property.featured && <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>}
        </div>
        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded">
              <StarIcon className="h-4 w-4 mr-1 fill-primary" />
              <span className="font-bold">{property.rating.toFixed(1)}</span>
            </div>
            <span className="ml-2 text-sm text-muted-foreground">({property.reviewCount} reviews)</span>
          </div>
          <h3 className="font-bold text-lg mb-1 line-clamp-1">{property.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{property.location}</p>
          <div className="mt-4">
            <p className="font-bold text-lg">
              ${property.pricePerNight} <span className="text-sm font-normal">per night</span>
            </p>
            <p className="text-sm text-muted-foreground">${property.totalPrice} total</p>
            <p className="text-xs text-muted-foreground">All fees included</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

