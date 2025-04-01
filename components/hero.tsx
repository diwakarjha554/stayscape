import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="relative h-[600px] w-full">
      <Image
        src="/placeholder.svg?height=600&width=1920"
        alt="Beautiful vacation destination"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Find Your Perfect Getaway</h1>
        <p className="text-xl text-white mb-8 max-w-2xl">
          Discover unique vacation rentals for any style, budget, or adventure
        </p>
        <Button size="lg" className="text-lg px-8">
          Start Exploring
        </Button>
      </div>
    </div>
  )
}

