"use client"

import { useEffect, useRef, useState } from "react"

declare global {
  interface Window {
    L: any
  }
}

const MapPage = () => {
  // State to track if the Leaflet script and CSS have been loaded
  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false)

  // A ref to hold the map instance to prevent re-initialization
  const mapRef = useRef<any>(null)

  // --- Effect for loading Leaflet assets from a CDN ---
  useEffect(() => {
    // If Leaflet is already available in the window, we don't need to load it again
    if (typeof window !== "undefined" && window.L) {
      setIsLeafletLoaded(true)
      return
    }

    // --- Load Leaflet CSS ---
    const leafletCss = document.createElement("link")
    leafletCss.rel = "stylesheet"
    leafletCss.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    leafletCss.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    leafletCss.crossOrigin = ""
    document.head.appendChild(leafletCss)

    // --- Load Leaflet JavaScript ---
    const leafletScript = document.createElement("script")
    leafletScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    leafletScript.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    leafletScript.crossOrigin = ""

    // Set the state to true once the script has finished loading
    leafletScript.onload = () => {
      setIsLeafletLoaded(true)
    }

    leafletScript.onerror = () => {
      console.error("Failed to load Leaflet script")
    }

    document.head.appendChild(leafletScript)

    // --- Cleanup function ---
    return () => {
      // Remove the script and CSS to keep the application clean
      try {
        if (document.head.contains(leafletCss)) {
          document.head.removeChild(leafletCss)
        }
        if (document.head.contains(leafletScript)) {
          document.head.removeChild(leafletScript)
        }
      } catch (error) {
        console.warn("Error during cleanup:", error)
      }
    }
  }, [])

  // --- Effect for initializing the map ---
  useEffect(() => {
    // This effect runs only after Leaflet has been successfully loaded
    if (!isLeafletLoaded || mapRef.current || typeof window === "undefined" || !window.L) {
      return
    }

    // The global 'L' object is now available from the loaded script
    const L = window.L

    try {
      // --- 1. Initialize the Map ---
      const map = L.map("map-container", {
        center: [20, 10],
        zoom: 2,
        worldCopyJump: false,
        scrollWheelZoom: true,
        maxBoundsViscosity: 0.9,
        zoomControl: false,
      })

      mapRef.current = map

      // Add custom zoom control in top-right
      L.control
        .zoom({
          position: "topright",
        })
        .addTo(map)

      // --- 2. Set Map Boundaries ---
      const southWest = L.latLng(-85, -180)
      const northEast = L.latLng(85, 180)
      const bounds = L.latLngBounds(southWest, northEast)
      map.setMaxBounds(bounds)

      // --- 3. Add Light Elegant Tile Layer ---
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 10,
        minZoom: 2,
      }).addTo(map)

      // --- 4. Fetch and Add GeoJSON Data for Countries ---
      let geoJsonLayer: any

      fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
        .then((response) => response.json())
        .then((data) => {
          // Harmonious light color palette with excellent synergy
          const defaultStyle = {
            fillColor: "#e0f2fe", // Sky-100 - Very light blue fill
            weight: 1.2,
            opacity: 1,
            color: "#0ea5e9", // Sky-500 - Clean blue border
            fillOpacity: 0.6,
          }

          const highlightStyle = {
            fillColor: "#0284c7", // Sky-600 - Rich blue for hover
            weight: 2.5,
            color: "#0c4a6e", // Sky-900 - Deep blue border on hover
            fillOpacity: 0.8,
          }

          function highlightFeature(e: any) {
            const layer = e.target
            layer.setStyle(highlightStyle)
            layer.bringToFront()
          }

          function resetHighlight(e: any) {
            geoJsonLayer.resetStyle(e.target)
          }

          function onEachFeature(feature: any, layer: any) {
            if (feature.properties && feature.properties.name) {
              // Create custom popup with harmonious styling
              const popupContent = `
                <div style="
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  font-size: 15px;
                  font-weight: 600;
                  color: #0c4a6e;
                  padding: 8px 12px;
                  text-align: center;
                  min-width: 140px;
                  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                  border-radius: 6px;
                  border: 1px solid #0ea5e9;
                ">
                  ${feature.properties.name}
                </div>
              `

              layer.bindPopup(popupContent, {
                className: "custom-popup-light",
                closeButton: false,
                offset: [0, -10],
              })
            }

            layer.on({
              mouseover: highlightFeature,
              mouseout: resetHighlight,
            })
          }

          geoJsonLayer = L.geoJSON(data, {
            style: defaultStyle,
            onEachFeature: onEachFeature,
          }).addTo(map)
        })
        .catch((error) => console.error("Error loading GeoJSON data:", error))
    } catch (error) {
      console.error("Error initializing map:", error)
    }

    // --- Cleanup function for the map ---
    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.remove()
          mapRef.current = null
        } catch (error) {
          console.warn("Error during map cleanup:", error)
        }
      }
    }
  }, [isLeafletLoaded])

  return (
    <main className="h-screen w-screen bg-gradient-to-br from-sky-50 to-blue-50 relative overflow-hidden">
      {/* Header overlay with light theme */}
      <div className="absolute top-0 left-0 right-0 z-[1000] bg-gradient-to-b from-white/95 to-transparent backdrop-blur-sm p-6 border-b border-sky-200/50">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Interactive World Map
        </h1>
        <p className="text-sky-700 text-sm font-medium">
          Hover over countries to explore • Scroll to zoom • Drag to pan
        </p>
      </div>

      {/* Loading overlay with light theme */}
      {!isLeafletLoaded && (
        <div className="absolute inset-0 z-[1001] bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center">
          <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-sky-200">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-sky-200 border-t-sky-600 mb-4"></div>
            <p className="text-sky-800 text-xl font-semibold">Loading Interactive Map...</p>
            <p className="text-sky-600 text-sm mt-2">Preparing your global experience</p>
          </div>
        </div>
      )}

      {/* Map container */}
      <div
        id="map-container"
        className="h-full w-full rounded-lg"
        style={{
          filter: !isLeafletLoaded ? "blur(4px)" : "none",
          transition: "filter 0.3s ease-in-out",
        }}
      />

      {/* Custom styles for light theme Leaflet elements */}
      <style jsx global>{`
        .custom-popup-light .leaflet-popup-content-wrapper {
          background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
          backdrop-filter: blur(12px);
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(14, 165, 233, 0.15), 0 4px 12px rgba(14, 165, 233, 0.1);
          border: 2px solid rgba(14, 165, 233, 0.2);
          padding: 0;
        }
        
        .custom-popup-light .leaflet-popup-tip {
          background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
          border: 2px solid rgba(14, 165, 233, 0.2);
          box-shadow: 0 4px 8px rgba(14, 165, 233, 0.1);
        }
        
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 8px 25px rgba(14, 165, 233, 0.15) !important;
          border-radius: 12px !important;
          overflow: hidden;
        }
        
        .leaflet-control-zoom a {
          background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%) !important;
          color: #0ea5e9 !important;
          border: 1px solid rgba(14, 165, 233, 0.2) !important;
          backdrop-filter: blur(10px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          font-weight: 600 !important;
          width: 34px !important;
          height: 34px !important;
          line-height: 32px !important;
        }
        
        .leaflet-control-zoom a:hover {
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%) !important;
          color: white !important;
          border-color: rgba(12, 74, 110, 0.3) !important;
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
        }
        
        .leaflet-container {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%) !important;
          border-radius: 8px;
        }

        /* Custom scrollbar for webkit browsers */
        .leaflet-container::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .leaflet-container::-webkit-scrollbar-track {
          background: rgba(240, 249, 255, 0.5);
          border-radius: 4px;
        }
        
        .leaflet-container::-webkit-scrollbar-thumb {
          background: rgba(14, 165, 233, 0.3);
          border-radius: 4px;
        }
        
        .leaflet-container::-webkit-scrollbar-thumb:hover {
          background: rgba(14, 165, 233, 0.5);
        }
      `}</style>
    </main>
  )
}

export default MapPage
