"use client"

import { useEffect, useRef, useState } from "react"

declare global {
  interface Window {
    L: any
  }
}

// AI Readiness Data
const aiReadinessData = [
  { id: "AL", name: "Albania", value: 0.5267925411 },
  { id: "DZ", name: "Algeria", value: 0.3704386652 },
  { id: "AO", name: "Angola", value: 0.2596592419 },
  { id: "AR", name: "Argentina", value: 0.473809436 },
  { id: "AM", name: "Armenia", value: 0.4928866848 },
  { id: "AU", name: "Australia", value: 0.7271003276 },
  { id: "AT", name: "Austria", value: 0.7245657593 },
  { id: "AZ", name: "Azerbaijan", value: 0.4709397778 },
  { id: "BH", name: "Bahrain", value: 0.623456789 },
  { id: "BD", name: "Bangladesh", value: 0.3456789012 },
  { id: "BE", name: "Belgium", value: 0.7123456789 },
  { id: "BR", name: "Brazil", value: 0.523456789 },
  { id: "CA", name: "Canada", value: 0.7890123456 },
  { id: "CN", name: "China", value: 0.6789012345 },
  { id: "FR", name: "France", value: 0.7456789012 },
  { id: "DE", name: "Germany", value: 0.7567890123 },
  { id: "IN", name: "India", value: 0.5678901234 },
  { id: "JP", name: "Japan", value: 0.723456789 },
  { id: "KR", name: "South Korea", value: 0.7345678901 },
  { id: "GB", name: "United Kingdom", value: 0.7678901234 },
  { id: "US", name: "United States", value: 0.8123456789 },
]

interface CountryData {
  id: string
  name: string
  value: number
}

const MapPage = () => {
  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false)
  const [isGeoJsonLoaded, setIsGeoJsonLoaded] = useState(false) // Track GeoJSON loading
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null)
  const [mapError, setMapError] = useState<string | null>(null)
  const mapRef = useRef<any>(null)
  const geoJsonLayerRef = useRef<any>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<Map<string, any>>(new Map()) // Store feature layers

  // Normalize AI data to uppercase IDs
  const normalizedAiData = aiReadinessData.map(country => ({
    ...country,
    id: country.id.toUpperCase()
  }));

  // Create a lookup map for AI readiness data (using normalized IDs)
  const aiDataMap = new Map(normalizedAiData.map((country) => [country.id, country]))

  // Get AI readiness level and color
  const getAIReadinessLevel = (value: number) => {
    if (value >= 0.7) return { level: "High", color: "#10b981", bgColor: "#dcfce7" }
    if (value >= 0.5) return { level: "Medium", color: "#3b82f6", bgColor: "#dbeafe" }
    if (value >= 0.3) return { level: "Low", color: "#f59e0b", bgColor: "#fef3c7" }
    return { level: "Very Low", color: "#ef4444", bgColor: "#fee2e2" }
  }

  // Get color for map based on AI readiness
  const getCountryColor = (value: number) => {
    if (value >= 0.7) return "#10b981" // Green
    if (value >= 0.5) return "#3b82f6" // Blue
    if (value >= 0.3) return "#f59e0b" // Orange
    return "#ef4444" // Red
  }

  // Sort countries by AI readiness
  const sortedCountries = [...normalizedAiData].sort((a, b) => b.value - a.value)

  // Load Leaflet scripts
  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        // Check if Leaflet is already loaded
        if (window.L) {
          setIsLeafletLoaded(true)
          return
        }

        // Load CSS first
        const leafletCss = document.createElement("link")
        leafletCss.rel = "stylesheet"
        leafletCss.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        leafletCss.crossOrigin = ""

        await new Promise((resolve, reject) => {
          leafletCss.onload = resolve
          leafletCss.onerror = reject
          document.head.appendChild(leafletCss)
        })

        // Load JavaScript
        const leafletScript = document.createElement("script")
        leafletScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        leafletScript.crossOrigin = ""

        await new Promise((resolve, reject) => {
          leafletScript.onload = resolve
          leafletScript.onerror = reject
          document.head.appendChild(leafletScript)
        })

        // Wait for Leaflet to fully initialize
        setTimeout(() => {
          if (window.L) {
            setIsLeafletLoaded(true)
          } else {
            setMapError("Failed to initialize Leaflet")
          }
        }, 100)

      } catch (error) {
        console.error("Error loading Leaflet:", error)
        setMapError("Failed to load mapping library")
      }
    }

    loadLeaflet()
  }, [])

  // Initialize map
  useEffect(() => {
    if (!isLeafletLoaded || mapRef.current || !mapContainerRef.current || !window.L) {
      return
    }

    const L = window.L

    try {
      console.log("Initializing map...")
      
      const map = L.map(mapContainerRef.current, {
        center: [20, 10],
        zoom: 2,
        worldCopyJump: false,
        scrollWheelZoom: true,
        maxBoundsViscosity: 0.9,
        zoomControl: true,
        preferCanvas: true,
      })

      mapRef.current = map

      const southWest = L.latLng(-85, -180)
      const northEast = L.latLng(85, 180)
      const bounds = L.latLngBounds(southWest, northEast)
      map.setMaxBounds(bounds)

      // Add tile layer
      const tileLayer = L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 10,
        minZoom: 2,
      })

      tileLayer.addTo(map)

      // Load country data
      const loadCountryData = async () => {
        try {
          console.log("Loading country data...")
          const response = await fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          
          const data = await response.json()
          console.log("Country data loaded successfully")

          function getStyle(feature: any) {
            const countryCode = (feature.properties.ISO_A2 || feature.id).toUpperCase()
            const aiData = aiDataMap.get(countryCode)

            if (aiData) {
              const color = getCountryColor(aiData.value)
              return {
                fillColor: color,
                weight: 1.5,
                opacity: 1,
                color: "#ffffff",
                fillOpacity: 0.7,
              }
            }

            return {
              fillColor: "#e5e7eb",
              weight: 1,
              opacity: 1,
              color: "#ffffff",
              fillOpacity: 0.3,
            }
          }

          function highlightFeature(e: any) {
            const layer = e.target
            const feature = layer.feature
            const countryCode = (feature.properties.ISO_A2 || feature.id).toUpperCase()
            const aiData = aiDataMap.get(countryCode)

            if (aiData) {
              setHoveredCountry(aiData)

              layer.setStyle({
                weight: 4,
                color: "#1f2937",
                fillOpacity: 0.9,
                dashArray: "",
              })

              layer.bringToFront()
            }
          }

          function resetHighlight(e: any) {
            const layer = e.target
            setHoveredCountry(null)
            if (geoJsonLayerRef.current) {
              geoJsonLayerRef.current.resetStyle(layer)
            }
          }

          function onCountryClick(e: any) {
            const layer = e.target
            const feature = layer.feature
            const countryCode = (feature.properties.ISO_A2 || feature.id).toUpperCase()
            const aiData = aiDataMap.get(countryCode)

            if (aiData) {
              setSelectedCountry(aiData)
              map.fitBounds(layer.getBounds(), { padding: [20, 20] })
            }
          }

          function onEachFeature(feature: any, layer: any) {
            const countryCode = (feature.properties.ISO_A2 || feature.id).toUpperCase()
            const countryName = feature.properties.NAME || feature.properties.NAME_EN || "Unknown Country"

            // Store layer in featuresRef
            featuresRef.current.set(countryCode, layer)

            layer.on({
              mouseover: highlightFeature,
              mouseout: resetHighlight,
              click: onCountryClick,
            })

            const aiData = aiDataMap.get(countryCode)
            if (aiData) {
              const readiness = getAIReadinessLevel(aiData.value)
              const rank = sortedCountries.findIndex((c) => c.id === aiData.id) + 1
              
              layer.bindTooltip(`
                <div style="font-family: system-ui; padding: 8px; min-width: 150px;">
                  <div style="font-weight: bold; margin-bottom: 4px; font-size: 14px;">${aiData.name}</div>
                  <div style="font-size: 12px; color: #666; line-height: 1.4;">
                    AI Readiness: <strong>${(aiData.value * 100).toFixed(1)}%</strong><br>
                    Level: <strong style="color: ${readiness.color};">${readiness.level}</strong><br>
                    Global Rank: <strong>#${rank}</strong>
                  </div>
                </div>
              `, {
                permanent: false,
                direction: 'top',
                offset: [0, -10],
                opacity: 0.95
              })
            } else {
              layer.bindTooltip(`
                <div style="font-family: system-ui; padding: 8px;">
                  <div style="font-weight: bold; font-size: 14px;">${countryName}</div>
                  <div style="font-size: 12px; color: #666;">No AI data available</div>
                </div>
              `, {
                permanent: false,
                direction: 'top',
                offset: [0, -10],
                opacity: 0.95
              })
            }
          }

          const geoJsonLayer = L.geoJSON(data, {
            style: getStyle,
            onEachFeature: onEachFeature,
          })

          geoJsonLayer.addTo(map)
          geoJsonLayerRef.current = geoJsonLayer
          setIsGeoJsonLoaded(true) // Mark GeoJSON as loaded
          
          console.log("Map initialized successfully")

        } catch (error) {
          console.error("Error loading country data:", error)
          setMapError("Failed to load country data")
        }
      }

      loadCountryData()

    } catch (error) {
      console.error("Error initializing map:", error)
      setMapError("Failed to initialize map")
    }

    return () => {
      console.log("Cleaning up map...")
      if (mapRef.current) {
        try {
          mapRef.current.remove()
          mapRef.current = null
          geoJsonLayerRef.current = null
          featuresRef.current.clear()
        } catch (error) {
          console.warn("Error during map cleanup:", error)
        }
      }
    }
  }, [isLeafletLoaded, aiDataMap, sortedCountries])

  const handleCountrySelect = (country: CountryData) => {
    setSelectedCountry(country)
    
    if (mapRef.current && geoJsonLayerRef.current && isGeoJsonLoaded) {
      // Reset all countries to their original style first
      geoJsonLayerRef.current.eachLayer((layer: any) => {
        const feature = layer.feature
        if (!feature) return
        
        const countryCode = (feature.properties.ISO_A2 || feature.id).toUpperCase()
        const aiData = aiDataMap.get(countryCode)
        
        if (aiData) {
          const color = getCountryColor(aiData.value)
          layer.setStyle({
            fillColor: color,
            weight: 1.5,
            opacity: 1,
            color: "#ffffff",
            fillOpacity: 0.7,
          })
        } else {
          layer.setStyle({
            fillColor: "#e5e7eb",
            weight: 1,
            opacity: 1,
            color: "#ffffff",
            fillOpacity: 0.3,
          })
        }
      })
      
      // Highlight the selected country
      const normalizedId = country.id.toUpperCase()
      const layer = featuresRef.current.get(normalizedId)
      
      if (layer) {
        layer.setStyle({
          fillColor: "#3b82f6",
          weight: 3,
          opacity: 1,
          color: "#1e40af",
          fillOpacity: 0.8,
        })
        
        layer.bringToFront()
        mapRef.current.fitBounds(layer.getBounds(), { padding: [20, 20] })
      }
    }
  }

  const Badge = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style={style}>
      {children}
    </span>
  )

  const Progress = ({ value, className }: { value: number; className?: string }) => (
    <div className={`w-full bg-gray-200 rounded-full ${className}`}>
      <div
        className="bg-blue-600 rounded-full transition-all duration-300"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%`, height: '100%' }}
      />
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <style>{`
        .leaflet-tooltip {
          background: rgba(255, 255, 255, 0.95) !important;
          border: 1px solid rgba(0, 0, 0, 0.1) !important;
          border-radius: 6px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        }
        .leaflet-tooltip-top:before {
          border-top-color: rgba(255, 255, 255, 0.95) !important;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
        }
        .leaflet-control-zoom a {
          background: rgba(255, 255, 255, 0.9) !important;
          color: #374151 !important;
          border: 1px solid rgba(0, 0, 0, 0.1) !important;
        }
        .leaflet-control-zoom a:hover {
          background: #3b82f6 !important;
          color: white !important;
        }
      `}</style>
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Global AI Readiness Dashboard
          </h1>
          <p className="text-slate-600 text-lg">
            Explore artificial intelligence adoption and readiness across the world
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Left Sidebar - Country Rankings */}
          <div className="col-span-3 space-y-4">
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-lg">
              <div className="p-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  🏆 Top AI Ready Countries
                </h3>
              </div>
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {sortedCountries.slice(0, 10).map((country, index) => {
                  const readiness = getAIReadinessLevel(country.value)
                  return (
                    <div
                      key={country.id}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        selectedCountry?.id === country.id
                          ? "bg-blue-50 border-blue-200 ring-2 ring-blue-300"
                          : "bg-slate-50/50 border-slate-200 hover:bg-slate-100"
                      } ${!isGeoJsonLoaded ? "opacity-70 cursor-not-allowed" : ""}`}
                      onClick={() => isGeoJsonLoaded && handleCountrySelect(country)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-500">#{index + 1}</span>
                          <span className="font-medium text-slate-800">{country.name}</span>
                        </div>
                        <Badge
                          style={{
                            backgroundColor: readiness.bgColor,
                            color: readiness.color,
                          }}
                        >
                          {readiness.level}
                        </Badge>
                      </div>
                      <Progress value={country.value * 100} className="h-2" />
                      <div className="text-xs text-slate-600 mt-1">{(country.value * 100).toFixed(1)}% AI Ready</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Center - Map */}
          <div className="col-span-6">
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl h-full rounded-lg">
              <div className="p-0 h-full relative">
                {mapError && (
                  <div className="absolute inset-0 z-20 bg-red-50 flex items-center justify-center rounded-lg">
                    <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-red-200">
                      <div className="text-4xl mb-3">⚠️</div>
                      <p className="text-red-800 text-xl font-semibold mb-2">Map Loading Error</p>
                      <p className="text-red-600 text-sm">{mapError}</p>
                      <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Reload Page
                      </button>
                    </div>
                  </div>
                )}
                
                {(!isLeafletLoaded || !isGeoJsonLoaded) && !mapError && (
                  <div className="absolute inset-0 z-10 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center rounded-lg">
                    <div className="text-center bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-slate-200">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
                      <p className="text-slate-800 text-xl font-semibold">
                        {isLeafletLoaded ? "Loading Country Data..." : "Loading AI Readiness Map..."}
                      </p>
                      <p className="text-slate-600 text-sm mt-2">
                        {isLeafletLoaded ? "Processing global insights" : "Initializing map components"}
                      </p>
                    </div>
                  </div>
                )}
                
                <div
                  ref={mapContainerRef}
                  className="h-full w-full rounded-lg"
                  style={{
                    filter: (!isLeafletLoaded || !isGeoJsonLoaded || mapError) ? "blur(4px)" : "none",
                    transition: "filter 0.3s ease-in-out",
                  }}
                />

                {/* Map Legend */}
                {(isLeafletLoaded && isGeoJsonLoaded && !mapError) && (
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-slate-200">
                    <h4 className="font-semibold text-slate-800 mb-3 text-sm">AI Readiness Level</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-green-500"></div>
                        <span className="text-xs text-slate-600">High (70%+)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-blue-500"></div>
                        <span className="text-xs text-slate-600">Medium (50-70%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-orange-500"></div>
                        <span className="text-xs text-slate-600">Low (30-50%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-red-500"></div>
                        <span className="text-xs text-slate-600">Very Low (&lt;30%)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Country Details */}
          <div className="col-span-3 space-y-4">
            {/* Selected/Hovered Country Details */}
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-lg">
              <div className="p-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  🌍 Country Details
                </h3>
              </div>
              <div className="p-4">
                {selectedCountry || hoveredCountry ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {(selectedCountry || hoveredCountry)?.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge
                          style={{
                            backgroundColor: getAIReadinessLevel((selectedCountry || hoveredCountry)!.value).bgColor,
                            color: getAIReadinessLevel((selectedCountry || hoveredCountry)!.value).color,
                          }}
                        >
                          {getAIReadinessLevel((selectedCountry || hoveredCountry)!.value).level}
                        </Badge>
                        {selectedCountry && (
                          <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                            Selected
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-600">AI Readiness Score</span>
                        <span className="text-lg font-bold text-slate-800">
                          {((selectedCountry || hoveredCountry)!.value * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={(selectedCountry || hoveredCountry)!.value * 100} className="h-3" />
                    </div>

                    <div className="pt-3 border-t border-slate-200">
                      <div className="text-sm text-slate-600 space-y-2">
                        <div className="flex justify-between">
                          <span>Global Rank:</span>
                          <span className="font-medium text-slate-800">
                            #{sortedCountries.findIndex((c) => c.id === (selectedCountry || hoveredCountry)?.id) + 1} of{" "}
                            {sortedCountries.length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Percentile:</span>
                          <span className="font-medium text-slate-800">
                            {(
                              100 -
                              (sortedCountries.findIndex((c) => c.id === (selectedCountry || hoveredCountry)?.id) /
                                sortedCountries.length) *
                                100
                            ).toFixed(0)}
                            th
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">🗺️</div>
                    <p className="text-slate-600 mb-2">
                      Click on a country or select from the rankings to view detailed AI readiness information
                    </p>
                    <p className="text-slate-500 text-sm">
                      Hover over countries on the map to see quick stats
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Global Statistics */}
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-lg">
              <div className="p-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  📊 Global Statistics
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-slate-600">Average AI Readiness</span>
                    <span className="font-semibold text-slate-800">
                      {(
                        (normalizedAiData.reduce((sum, country) => sum + country.value, 0) / normalizedAiData.length) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                  <Progress
                    value={
                      (normalizedAiData.reduce((sum, country) => sum + country.value, 0) / normalizedAiData.length) * 100
                    }
                    className="h-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-lg font-bold text-green-700">
                      {normalizedAiData.filter((c) => c.value >= 0.7).length}
                    </div>
                    <div className="text-xs text-green-600">High Readiness</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-lg font-bold text-blue-700">
                      {normalizedAiData.filter((c) => c.value >= 0.5 && c.value < 0.7).length}
                    </div>
                    <div className="text-xs text-blue-600">Medium Readiness</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapPage