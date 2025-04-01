import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">StayScape</h3>
            <p className="text-muted-foreground mb-4">
              Find your perfect vacation rental with StayScape. Discover unique places to stay around the world.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties" className="text-muted-foreground hover:text-primary">
                  All Properties
                </Link>
              </li>
              <li>
                <Link href="/featured" className="text-muted-foreground hover:text-primary">
                  Featured Rentals
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-muted-foreground hover:text-primary">
                  Popular Destinations
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-muted-foreground hover:text-primary">
                  Special Deals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Host</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/host" className="text-muted-foreground hover:text-primary">
                  Become a Host
                </Link>
              </li>
              <li>
                <Link href="/host/resources" className="text-muted-foreground hover:text-primary">
                  Host Resources
                </Link>
              </li>
              <li>
                <Link href="/host/community" className="text-muted-foreground hover:text-primary">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link href="/host/responsible" className="text-muted-foreground hover:text-primary">
                  Responsible Hosting
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} StayScape. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

