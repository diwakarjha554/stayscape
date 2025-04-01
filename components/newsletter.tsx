"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Subscribed!",
      description: "You've successfully subscribed to our newsletter.",
    })

    setEmail("")
    setLoading(false)
  }

  return (
    <section className="py-12 bg-primary/5 rounded-lg my-12">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Get Travel Inspiration</h2>
        <p className="text-muted-foreground mb-6">
          Subscribe to our newsletter and receive exclusive offers and vacation ideas
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  )
}

