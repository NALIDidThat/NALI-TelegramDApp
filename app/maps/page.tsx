"use client"

import { useState, useEffect } from "react"
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF, Circle } from "@react-google-maps/api"
import { School, Library, Heart, Book, MapPin, Star, Users, Trophy, Building2, Activity, Navigation, Loader2, ChevronUp, Home, Search, Map, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const mockLocations: Location[] = [
  // Schools
  {
    id: "school-1",
    name: "Community Learning Center",
    type: "school",
    position: { lat: 51.5080, lng: -0.1280 },
    description: "Adult education and evening classes for the community",
    address: "45 Education Lane",
    openingHours: "Mon-Fri: 8:00 AM - 8:00 PM",
    contact: "020 7123 4567",
    accessibility: {
      wheelchair: true,
      parking: true,
      elevator: true,
    }
  },
  {
    id: "school-2",
    name: "Digital Skills Academy",
    type: "school",
    position: { lat: 51.5082, lng: -0.1282 },
    description: "Tech and digital skills training for all ages",
    address: "12 Tech Street",
    openingHours: "Mon-Sat: 9:00 AM - 6:00 PM",
    contact: "020 7123 4568",
    accessibility: {
      wheelchair: true,
      parking: false,
      elevator: true,
    }
  },

  // Libraries
  {
    id: "library-1",
    name: "Central Community Library",
    type: "library",
    position: { lat: 51.5074, lng: -0.1278 },
    description: "Public library with study spaces, free WiFi, and computer access",
    address: "123 Reading Street",
    openingHours: "Mon-Sun: 9:00 AM - 8:00 PM",
    contact: "020 7123 4569",
    accessibility: {
      wheelchair: true,
      parking: true,
      elevator: true,
      computerAccess: true,
    }
  },
  {
    id: "library-2",
    name: "Innovation Hub Library",
    type: "library",
    position: { lat: 51.5076, lng: -0.1276 },
    description: "Modern library with maker space and digital resources",
    address: "78 Innovation Avenue",
    openingHours: "Mon-Sat: 10:00 AM - 6:00 PM",
    contact: "020 7123 4570",
    accessibility: {
      wheelchair: true,
      parking: true,
      elevator: true,
      computerAccess: true,
    }
  },

  // Experiences
  {
    id: "exp-1",
    name: "Web3 Workshop Series",
    type: "experience",
    position: { lat: 51.5078, lng: -0.1274 },
    description: "Learn blockchain basics and Web3 development",
    address: "34 Blockchain Boulevard",
    openingHours: "Workshops: Tue & Thu 6:00 PM - 8:00 PM",
    contact: "020 7123 4571",
    points: 100,
    participants: 15,
    accessibility: {
      wheelchair: true,
      virtual: true,
    }
  },
  {
    id: "exp-2",
    name: "Community Gardening",
    type: "experience",
    position: { lat: 51.5079, lng: -0.1273 },
    description: "Learn sustainable gardening practices",
    address: "89 Garden Grove",
    openingHours: "Wed & Sat: 10:00 AM - 2:00 PM",
    contact: "020 7123 4572",
    points: 75,
    participants: 20,
    accessibility: {
      wheelchair: true,
      outdoorSpace: true,
    }
  },

  // Activities
  {
    id: "act-1",
    name: "Digital Art Workshop",
    type: "activity",
    position: { lat: 51.5081, lng: -0.1271 },
    description: "Create digital art using tablets and computers",
    address: "56 Creative Court",
    openingHours: "Mon & Wed: 4:00 PM - 6:00 PM",
    contact: "020 7123 4573",
    points: 50,
    participants: 12,
    accessibility: {
      wheelchair: true,
      equipmentProvided: true,
    }
  },
  {
    id: "act-2",
    name: "Coding Club",
    type: "activity",
    position: { lat: 51.5083, lng: -0.1269 },
    description: "Learn programming basics in a fun environment",
    address: "23 Code Lane",
    openingHours: "Tue & Thu: 4:00 PM - 6:00 PM",
    contact: "020 7123 4574",
    points: 60,
    participants: 15,
    accessibility: {
      wheelchair: true,
      equipmentProvided: true,
      virtual: true,
    }
  },

  // Clinics
  {
    id: "clinic-1",
    name: "Community Health Center",
    type: "clinic",
    position: { lat: 51.5085, lng: -0.1267 },
    description: "General health services and vaccinations",
    address: "67 Health Street",
    openingHours: "Mon-Fri: 8:00 AM - 6:00 PM",
    contact: "020 7123 4575",
    accessibility: {
      wheelchair: true,
      parking: true,
      elevator: true,
      hearingLoop: true,
    }
  },
  {
    id: "clinic-2",
    name: "Mental Health Support Hub",
    type: "clinic",
    position: { lat: 51.5087, lng: -0.1265 },
    description: "Mental health services and counseling",
    address: "90 Wellbeing Way",
    openingHours: "Mon-Sat: 9:00 AM - 5:00 PM",
    contact: "020 7123 4576",
    accessibility: {
      wheelchair: true,
      parking: true,
      hearingLoop: true,
      quietSpace: true,
    }
  },

  // Community Centers
  {
    id: "comm-1",
    name: "Neighborhood Hub",
    type: "community",
    position: { lat: 51.5089, lng: -0.1263 },
    description: "Multi-purpose community space for events and activities",
    address: "45 Community Road",
    openingHours: "Mon-Sun: 8:00 AM - 9:00 PM",
    contact: "020 7123 4577",
    accessibility: {
      wheelchair: true,
      parking: true,
      elevator: true,
      hearingLoop: true,
      familyRoom: true,
    }
  },
  {
    id: "comm-2",
    name: "Youth Center",
    type: "community",
    position: { lat: 51.5091, lng: -0.1261 },
    description: "Safe space for young people with various activities",
    address: "12 Youth Avenue",
    openingHours: "Mon-Fri: 3:00 PM - 9:00 PM, Sat: 10:00 AM - 6:00 PM",
    contact: "020 7123 4578",
    accessibility: {
      wheelchair: true,
      parking: true,
      sensoryRoom: true,
      quietSpace: true,
    }
  },
]

interface Accessibility {
  wheelchair: boolean
  parking?: boolean
  elevator?: boolean
  hearingLoop?: boolean
  computerAccess?: boolean
  equipmentProvided?: boolean
  virtual?: boolean
  quietSpace?: boolean
  sensoryRoom?: boolean
  familyRoom?: boolean
  outdoorSpace?: boolean
}

interface Location {
  id: string
  name: string
  type: "school" | "library" | "clinic" | "experience" | "journey" | "community" | "activity"
  position: google.maps.LatLngLiteral
  description: string
  points?: number
  participants?: number
  address?: string
  openingHours?: string
  contact?: string
  distance?: number
  accessibility: Accessibility
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "1.5rem",
}

const defaultCenter = {
  lat: 51.5074,
  lng: -0.1278,
}

export default function MapsPage() {
  const pathname = usePathname()
  const [userLocation, setUserLocation] = useState(defaultCenter)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [locations, setLocations] = useState<Location[]>(mockLocations)
  const [isLocating, setIsLocating] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [userRadius, setUserRadius] = useState(2) // 2km radius
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [isMapExpanded, setIsMapExpanded] = useState(false)
  const [nearbyCount, setNearbyCount] = useState({
    total: 0,
    experiences: 0,
    activities: 0
  })

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  })

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  const getUserLocation = () => {
    setIsLocating(true)
    setLocationError(null)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newUserLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(newUserLocation)
          // Update distances for all locations
          const updatedLocations = locations.map(loc => ({
            ...loc,
            distance: calculateDistance(
              newUserLocation.lat,
              newUserLocation.lng,
              loc.position.lat,
              loc.position.lng
            )
          }))
          setLocations(updatedLocations)
          setIsLocating(false)
        },
        (error) => {
          setLocationError("Could not get your location. Please check your settings.")
          setIsLocating(false)
        }
      )
    } else {
      setLocationError("Geolocation is not supported by your browser")
      setIsLocating(false)
    }
  }

  useEffect(() => {
    getUserLocation()
  }, [])

  // Update nearby counts whenever locations or user location changes
  useEffect(() => {
    const counts = locations.reduce((acc, loc) => {
      if (loc.distance && loc.distance <= userRadius) {
        acc.total++
        if (loc.type === 'experience') acc.experiences++
        if (loc.type === 'activity') acc.activities++
      }
      return acc
    }, { total: 0, experiences: 0, activities: 0 })
    setNearbyCount(counts)
  }, [locations, userRadius])

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "school":
        return { icon: <School className="h-5 w-5 text-blue-500" />, color: "text-blue-500", bg: "bg-blue-500" }
      case "library":
        return { icon: <Library className="h-5 w-5 text-green-500" />, color: "text-green-500", bg: "bg-green-500" }
      case "clinic":
        return { icon: <Heart className="h-5 w-5 text-red-500" />, color: "text-red-500", bg: "bg-red-500" }
      case "experience":
        return { icon: <Star className="h-5 w-5 text-[#f20789]" />, color: "text-[#f20789]", bg: "bg-[#f20789]" }
      case "journey":
        return { icon: <Book className="h-5 w-5 text-[#6805f2]" />, color: "text-[#6805f2]", bg: "bg-[#6805f2]" }
      case "community":
        return { icon: <Building2 className="h-5 w-5 text-orange-500" />, color: "text-orange-500", bg: "bg-orange-500" }
      case "activity":
        return { icon: <Activity className="h-5 w-5 text-purple-500" />, color: "text-purple-500", bg: "bg-purple-500" }
      default:
        return { icon: <MapPin className="h-5 w-5 text-gray-500" />, color: "text-gray-500", bg: "bg-gray-500" }
    }
  }

  const LocationCard = ({ location }: { location: Location }) => {
    const { icon, color, bg } = getLocationIcon(location.type)
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <h3 className="font-medium">{location.name}</h3>
          </div>
          {location.distance && (
            <Badge variant="secondary" className="text-xs">
              {location.distance.toFixed(1)}km away
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{location.description}</p>
        
        {/* Location Details */}
        <div className="space-y-2 text-sm">
          {location.address && (
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {location.address}
            </p>
          )}
          {location.openingHours && (
            <p className="flex items-center gap-2">
              🕒 {location.openingHours}
            </p>
          )}
          {location.contact && (
            <p className="flex items-center gap-2">
              📞 {location.contact}
            </p>
          )}
        </div>

        {/* Accessibility Features */}
        <div className="flex flex-wrap gap-2 pt-2">
          {Object.entries(location.accessibility).map(([feature, available]) => 
            available && (
              <Badge 
                key={feature} 
                variant="secondary" 
                className="text-xs capitalize"
                title={`This location has ${feature.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              >
                {feature.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </Badge>
            )
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            className={`flex-1 ${bg} hover:${bg}/90`}
            onClick={() => {
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${location.position.lat},${location.position.lng}`,
                '_blank'
              )
            }}
          >
            Get Directions
          </Button>
          {(location.type === 'experience' || location.type === 'activity') && (
            <Button variant="outline" className="flex-1">
              Join Now ({location.points} points)
            </Button>
          )}
        </div>
      </div>
    )
  }

  if (loadError) return <div className="p-4 text-red-500">Error loading maps</div>
  if (!isLoaded) return <div className="p-4">Loading...</div>

  return (
    <main className="flex flex-col min-h-screen bg-[#1F2937]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-[#1F2937] pb-3">
        <div className="px-4 pt-4">
          <h1 className="text-lg font-semibold text-white flex items-center gap-2">
            <Map className="h-5 w-5" />
            Explore Local Area
          </h1>
          <p className="text-sm text-gray-400">
            {nearbyCount.total} places within {userRadius}km
          </p>
        </div>

        {/* Category Scrollable */}
        <div className="mt-3 px-4">
          <ScrollArea className="w-full">
            <div className="flex space-x-2">
              {[
                { type: 'all', icon: <Map className="h-4 w-4" />, label: 'All' },
                { type: 'school', icon: <School className="h-4 w-4" />, label: 'Schools' },
                { type: 'library', icon: <Library className="h-4 w-4" />, label: 'Libraries' },
                { type: 'experience', icon: <Star className="h-4 w-4" />, label: 'Experiences' },
                { type: 'activity', icon: <Activity className="h-4 w-4" />, label: 'Activities' },
                { type: 'clinic', icon: <Heart className="h-4 w-4" />, label: 'Clinics' },
                { type: 'community', icon: <Building2 className="h-4 w-4" />, label: 'Community' },
              ].map(category => (
                <Button
                  key={category.type}
                  variant={selectedLocation?.type === category.type ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap border-gray-700",
                    "hover:bg-gray-800 hover:text-white",
                    selectedLocation?.type === category.type 
                      ? "bg-[#f20789] text-white border-[#f20789] hover:bg-[#f20789]/90" 
                      : "bg-transparent text-gray-300"
                  )}
                  onClick={() => {
                    const filteredLocations = category.type === 'all' 
                      ? locations 
                      : locations.filter(loc => loc.type === category.type)
                    if (filteredLocations.length > 0) {
                      setSelectedLocation(filteredLocations[0])
                    }
                  }}
                  aria-label={`${category.label} - ${
                    category.type === 'all' 
                      ? nearbyCount.total 
                      : locations.filter(loc => loc.type === category.type && loc.distance && loc.distance <= userRadius).length
                  } nearby`}
                >
                  {category.icon}
                  <span>{category.label}</span>
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="bg-gray-700" />
          </ScrollArea>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-16">
        {/* Map Container */}
        <div className="relative w-full h-[35vh] bg-gray-800">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMapExpanded(!isMapExpanded)}
            className="absolute top-4 left-4 z-10 bg-gray-900/80 backdrop-blur-sm 
                     hover:bg-gray-800 border-gray-700 text-white"
          >
            <ChevronUp className={cn(
              "h-4 w-4 transition-transform",
              isMapExpanded ? "rotate-180" : ""
            )} />
          </Button>

          <Button
            className="absolute top-4 right-4 z-10 bg-gray-900/80 backdrop-blur-sm 
                     hover:bg-gray-800 border-gray-700 text-white"
            size="sm"
            onClick={getUserLocation}
            disabled={isLocating}
          >
            {isLocating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Navigation className="h-4 w-4" />
            )}
          </Button>

          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "100%",
            }}
            zoom={15}
            center={userLocation}
            options={{
              styles: [
                {
                  featureType: "all",
                  elementType: "labels.text.fill",
                  stylers: [{ color: "#6805f2" }],
                },
                {
                  featureType: "all",
                  elementType: "labels.text.stroke",
                  stylers: [{ visibility: "on" }, { color: "#ffffff" }],
                },
              ],
              zoomControl: false,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
              gestureHandling: 'greedy',
              mapTypeId: 'roadmap',
              backgroundColor: '#1F2937',
            }}
          >
            {/* User's radius circle */}
            <Circle
              center={userLocation}
              radius={userRadius * 1000} // Convert km to meters
              options={{
                fillColor: "#f207893f",
                fillOpacity: 0.2,
                strokeColor: "#f20789",
                strokeOpacity: 0.8,
                strokeWeight: 2,
              }}
            />

            {/* User Location Marker */}
            <MarkerF
              position={userLocation}
              icon={{
                url: "/user-marker.png",
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />

            {/* Location Markers */}
            {locations.map((location) => (
              <MarkerF
                key={location.id}
                position={location.position}
                onClick={() => setSelectedLocation(location)}
                icon={{
                  url: `/markers/${location.type}-marker.png`,
                  scaledSize: new window.google.maps.Size(32, 32),
                }}
              />
            ))}

            {/* Info Window */}
            {selectedLocation && (
              <InfoWindowF
                position={selectedLocation.position}
                onCloseClick={() => setSelectedLocation(null)}
              >
                <div className="p-2 max-w-xs">
                  <div className="flex items-center gap-2 mb-2">
                    {getLocationIcon(selectedLocation.type).icon}
                    <h3 className="font-medium">{selectedLocation.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{selectedLocation.description}</p>
                  <Button 
                    className="w-full text-sm"
                    size="sm"
                    onClick={() => setIsBottomSheetOpen(true)}
                  >
                    View Details
                  </Button>
                </div>
              </InfoWindowF>
            )}
          </GoogleMap>
        </div>

        {/* Location Cards */}
        <div className="px-4 py-4 space-y-3">
          {locations
            .filter(loc => selectedLocation?.type === loc.type || !selectedLocation)
            .sort((a, b) => (a.distance || 0) - (b.distance || 0))
            .map(location => (
              <div 
                key={location.id}
                className="bg-gray-800 rounded-lg p-4 space-y-3 border border-gray-700"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getLocationIcon(location.type).icon}
                    <h3 className="font-medium text-white">{location.name}</h3>
                  </div>
                  {location.distance && (
                    <Badge variant="outline" className="bg-gray-900 text-gray-300 border-gray-700">
                      {location.distance.toFixed(1)}km
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-gray-400">{location.description}</p>

                {/* Location Details */}
                <div className="space-y-2 text-sm text-gray-300">
                  {location.address && (
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {location.address}
                    </p>
                  )}
                  {location.openingHours && (
                    <p className="flex items-center gap-2">
                      🕒 {location.openingHours}
                    </p>
                  )}
                  {location.contact && (
                    <p className="flex items-center gap-2">
                      📞 {location.contact}
                    </p>
                  )}
                </div>

                {/* Accessibility Features */}
                <div className="flex flex-wrap gap-2">
                  {Object.entries(location.accessibility).map(([feature, available]) => 
                    available && (
                      <Badge 
                        key={feature}
                        variant="outline"
                        className="bg-gray-900 text-gray-300 border-gray-700 capitalize text-xs"
                        title={`This location has ${feature.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                      >
                        {feature.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </Badge>
                    )
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    className="flex-1 bg-[#f20789] hover:bg-[#f20789]/90 text-white"
                    onClick={() => {
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${location.position.lat},${location.position.lng}`,
                        '_blank'
                      )
                    }}
                  >
                    Get Directions
                  </Button>
                  {(location.type === 'experience' || location.type === 'activity') && (
                    <Button 
                      variant="outline" 
                      className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      Join Now ({location.points} points)
                    </Button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav 
        className="fixed bottom-0 left-0 right-0 bg-[#1F2937] border-t border-gray-700"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-around h-16">
          {[
            { href: '/', icon: <Home className="h-5 w-5" />, label: 'Home' },
            { href: '/search', icon: <Search className="h-5 w-5" />, label: 'Search' },
            { href: '/maps', icon: <Map className="h-5 w-5" />, label: 'Map' },
            { href: '/profile', icon: <UserCircle className="h-5 w-5" />, label: 'Profile' },
          ].map(item => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full",
                  "text-xs font-medium transition-colors",
                  isActive 
                    ? "text-[#f20789]" 
                    : "text-gray-400 hover:text-white"
                )}
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
              >
                {item.icon}
                <span className="mt-1">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </main>
  )
} 