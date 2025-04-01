"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function FirebaseStatus() {
  const [status, setStatus] = useState<"loading" | "configured" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Check if Firebase environment variables are set
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
    const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID

    if (!apiKey || !authDomain || !projectId) {
      setStatus("error")
      setMessage("Firebase configuration is missing. Please check your environment variables.")
      return
    }

    // If we get here, basic config is present
    setStatus("configured")
    setMessage("Firebase configuration detected.")
  }, [])

  if (status === "loading") {
    return null
  }

  if (status === "error") {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Firebase Configuration Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    )
  }

  return null // Don't show anything when configured correctly
}

