import type { Property } from "@/types/property"

// Mock data for initial development
const MOCK_PROPERTIES: Property[] = [
  {
    id: "1",
    title: "The Perfect Family Get Away!",
    description: "Enjoy this beautiful family-friendly property with lake access and plenty of outdoor activities.",
    location: "Elysian, MN",
    images: ["/placeholder.svg?height=400&width=600"],
    pricePerNight: 671,
    totalPrice: 1342,
    rating: 9.6,
    reviewCount: 123,
    amenities: ["Wifi", "Kitchen", "Washer", "Dryer", "Pool", "Hot tub"],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 10,
    featured: true,
    host: {
      id: "host1",
      name: "John Smith",
      image: "/placeholder.svg?height=100&width=100",
      joinedDate: "2019-01-01",
    },
    availability: {
      "2023-04-25": true,
      "2023-04-26": true,
      "2023-04-27": true,
    },
  },
  {
    id: "2",
    title: "Lakefront Home with Amazing Sunsets, Private Dock & Firepit",
    description: "Beautiful lakefront property with private dock, firepit, and stunning sunset views.",
    location: "Chappells, SC",
    images: ["/placeholder.svg?height=400&width=600"],
    pricePerNight: 450,
    totalPrice: 900,
    rating: 10,
    reviewCount: 168,
    amenities: ["Wifi", "Kitchen", "Washer", "Dryer", "Fireplace", "Waterfront"],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 8,
    featured: true,
    host: {
      id: "host2",
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=100&width=100",
      joinedDate: "2020-03-15",
    },
    availability: {
      "2023-04-25": true,
      "2023-04-26": true,
      "2023-04-27": true,
    },
  },
  {
    id: "3",
    title: "*** Ski in/Ski Out Condo THE Closest in Ski Trails to Village ***",
    description: "Perfect ski-in/ski-out condo located right next to the village and ski trails.",
    location: "Truckee, CA",
    images: ["/placeholder.svg?height=400&width=600"],
    pricePerNight: 388,
    totalPrice: 775,
    rating: 10,
    reviewCount: 113,
    amenities: ["Wifi", "Kitchen", "Washer", "Dryer", "Fireplace", "Ski-in/Ski-out"],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 6,
    featured: false,
    host: {
      id: "host3",
      name: "Michael Brown",
      image: "/placeholder.svg?height=100&width=100",
      joinedDate: "2018-11-20",
    },
    availability: {
      "2023-04-25": true,
      "2023-04-26": true,
      "2023-04-27": true,
    },
  },
]

// Get all properties
export async function getProperties(): Promise<Property[]> {
  try {
    // For development, return mock data
    // In production, this would fetch from Firestore
    return MOCK_PROPERTIES

    // Firestore implementation:
    /*
    const propertiesRef = collection(db, "properties");
    const propertiesSnapshot = await getDocs(propertiesRef);
    
    return propertiesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Property[];
    */
  } catch (error) {
    console.error("Error fetching properties:", error)
    throw error
  }
}

// Get a single property by ID
export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    // For development, return mock data
    const property = MOCK_PROPERTIES.find((p) => p.id === id)
    return property || null

    // Firestore implementation:
    /*
    const propertyRef = doc(db, "properties", id);
    const propertySnap = await getDoc(propertyRef);
    
    if (propertySnap.exists()) {
      return {
        id: propertySnap.id,
        ...propertySnap.data()
      } as Property;
    } else {
      return null;
    }
    */
  } catch (error) {
    console.error(`Error fetching property with ID ${id}:`, error)
    throw error
  }
}

// Search properties by location, dates, guests
export async function searchProperties(
  location?: string,
  checkIn?: Date,
  checkOut?: Date,
  guests?: number,
): Promise<Property[]> {
  try {
    // For development, filter mock data
    let filteredProperties = [...MOCK_PROPERTIES]

    if (location) {
      filteredProperties = filteredProperties.filter((p) => p.location.toLowerCase().includes(location.toLowerCase()))
    }

    if (guests) {
      filteredProperties = filteredProperties.filter((p) => p.maxGuests >= guests)
    }

    // In production, this would use Firestore queries
    return filteredProperties
  } catch (error) {
    console.error("Error searching properties:", error)
    throw error
  }
}

// Add a new property
export async function AddProperty(propertyData: Omit<Property, "id">): Promise<string> {
  try {
    // Firestore implementation:
    /*
    const propertiesRef = collection(db, "properties");
    const newPropertyRef = await addDoc(propertiesRef, {
      ...propertyData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return newPropertyRef.id;
    */

    // For development
    return "new-property-id"
  } catch (error) {
    console.error("Error adding property:", error)
    throw error
  }
}

// Update a property
export async function updateProperty(id: string, propertyData: Partial<Property>): Promise<void> {
  try {
    // Firestore implementation:
    /*
    const propertyRef = doc(db, "properties", id);
    await updateDoc(propertyRef, {
      ...propertyData,
      updatedAt: serverTimestamp()
    });
    */

    // For development
    console.log(`Property ${id} updated with:`, propertyData)
  } catch (error) {
    console.error(`Error updating property with ID ${id}:`, error)
    throw error
  }
}

// Delete a property
export async function deleteProperty(id: string): Promise<void> {
  try {
    // Firestore implementation:
    /*
    const propertyRef = doc(db, "properties", id);
    await deleteDoc(propertyRef);
    */

    // For development
    console.log(`Property ${id} deleted`)
  } catch (error) {
    console.error(`Error deleting property with ID ${id}:`, error)
    throw error
  }
}

