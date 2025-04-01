import Image from "next/image"
import Link from "next/link"

const destinations = [
  {
    id: 1,
    name: "Lake Tahoe",
    image: "/placeholder.svg?height=300&width=400",
    properties: 120,
  },
  {
    id: 2,
    name: "Malibu",
    image: "/placeholder.svg?height=300&width=400",
    properties: 85,
  },
  {
    id: 3,
    name: "Aspen",
    image: "/placeholder.svg?height=300&width=400",
    properties: 64,
  },
  {
    id: 4,
    name: "Miami Beach",
    image: "/placeholder.svg?height=300&width=400",
    properties: 210,
  },
]

export function FeaturedDestinations() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Popular Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <Link
            key={destination.id}
            href={`/properties?location=${encodeURIComponent(destination.name)}`}
            className="group"
          >
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-xl font-bold">{destination.name}</h3>
                <p>{destination.properties} properties</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

