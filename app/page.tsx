import { Hero } from "@/components/hero"
import { SearchBar } from "@/components/search-bar"
import { PropertyGrid } from "@/components/property-grid"
import { FeaturedDestinations } from "@/components/featured-destinations"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <SearchBar />
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Discover weekend getaways</h2>
          <p className="text-gray-600 mb-8">Showing deals for: Apr 25 - Apr 27</p>
          <PropertyGrid />
        </section>
        <FeaturedDestinations />
        <Newsletter />
      </div>
      <Footer />
    </main>
  )
}

