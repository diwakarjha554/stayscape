"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/components/auth-provider"
import { PropertyList } from "@/components/admin/property-list"
import { BookingList } from "@/components/admin/booking-list"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { PlusCircle } from "lucide-react"

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.push("/")
    } else if (user && user.isAdmin) {
      setIsAuthorized(true)
    }
  }, [user, loading, router])

  if (loading || !isAuthorized) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{loading ? "Loading..." : "Access Denied"}</h1>
            {!loading && <p className="mb-6">You don't have permission to access this page.</p>}
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button asChild>
            <a href="/admin/properties/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Property
            </a>
          </Button>
        </div>

        <DashboardStats />

        <Tabs defaultValue="properties" className="mt-8">
          <TabsList className="mb-4">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <Card>
              <CardHeader>
                <CardTitle>Manage Properties</CardTitle>
                <CardDescription>View, edit, and manage all your rental properties</CardDescription>
              </CardHeader>
              <CardContent>
                <PropertyList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Manage Bookings</CardTitle>
                <CardDescription>View and manage all bookings across your properties</CardDescription>
              </CardHeader>
              <CardContent>
                <BookingList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Manage Users</CardTitle>
                <CardDescription>View and manage user accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">User management functionality coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </>
  )
}

