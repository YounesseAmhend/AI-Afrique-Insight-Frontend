"use client"

import { useEffect, useRef, useState } from "react"

const MapPage = () => {
  // State to track if the Leaflet script and CSS have been loaded
  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false)

  // A ref to hold the map instance to prevent re-initialization
  const mapRef = useRef(null)

  // --- Effect for loading Leaflet assets from a CDN ---
  useEffect(() => {
    // If Leaflet is already available in the window, we don't need to load it again
    if (window.L) {
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

    document.head.appendChild(leafletScript)

    // --- Cleanup function ---
    return () => {
      // Remove the script and CSS to keep the application clean
      if (document.head.contains(leafletCss)) {
        document.head.removeChild(leafletCss)
      }
      if (document.head.contains(leafletScript)) {
        document.head.removeChild(leafletScript)
      }
    }
  }, []) // The empty dependency array ensures this effect runs only once

  // --- Effect for initializing the map ---
  useEffect(() => {
    // This effect runs only after Leaflet has been successfully loaded
    if (!isLeafletLoaded || mapRef.current) {
      return
    }

    // The global 'L' object is now available from the loaded script
    const L = window.L

    // --- 1. Initialize the Map ---
    const map = L.map("map-container", {
      center: [20, 10],
      zoom: 2,
      worldCopyJump: false,
      scrollWheelZoom: true,
      maxBoundsViscosity: 0.9,
      zoomControl: false, // We'll add custom zoom controls
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

    // --- 3. Add Modern Dark Tile Layer ---
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 10,
      minZoom: 2,
    }).addTo(map)

    // --- 4. Fetch and Add GeoJSON Data for Countries ---
    let geoJsonLayer

    fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
      .then((response) => response.json())
      .then((data) => {
        // Modern color palette
        const defaultStyle = {
          fillColor: "#1e293b", // Slate-800 - Dark elegant fill
          weight: 0.8,
          opacity: 1,
          color: "#475569", // Slate-600 - Subtle border
          fillOpacity: 0.8,
        }

        const highlightStyle = {
          fillColor: "#3b82f6", // Blue-500 - Modern blue for hover
          weight: 2,
          color: "#1d4ed8", // Blue-700 - Darker blue border on hover
          fillOpacity: 0.9,
        }

        function highlightFeature(e) {
          const layer = e.target
          layer.setStyle(highlightStyle)
          layer.bringToFront()

          // Add smooth transition effect
          layer.getElement()?.style.setProperty("transition", "all 0.2s ease-in-out")
        }

        function resetHighlight(e) {
          geoJsonLayer.resetStyle(e.target)
        }

        function onEachFeature(feature, layer) {
          if (feature.properties && feature.properties.name) {
            // Create custom popup with better styling
            const popupContent = `
              <div style="
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 14px;
                font-weight: 600;
                color: #1f2937;
                padding: 4px 0;
                text-align: center;
                min-width: 120px;
              ">
                ${feature.properties.name}
              </div>
            `

            layer.bindPopup(popupContent, {
              className: "custom-popup",
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

    // --- Cleanup function for the map ---
    return () => {
      if (mapRef.current) {
        map.remove()
        mapRef.current = null
      }
    }
  }, [isLeafletLoaded])

  return (
    <main className="h-screen w-screen bg-slate-900 relative overflow-hidden">
      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 z-[1000] bg-gradient-to-b from-slate-900/80 to-transparent p-6">
        <h1 className="text-2xl font-bold text-white mb-2">Interactive World Map</h1>
        <p className="text-slate-300 text-sm">Hover over countries to explore • Scroll to zoom • Drag to pan</p>
      </div>

      {/* Loading overlay */}
      {!isLeafletLoaded && (
        <div className="absolute inset-0 z-[1001] bg-slate-900 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-slate-300 text-lg font-medium">Loading Interactive Map...</p>
            <p className="text-slate-500 text-sm mt-2">Preparing your global experience</p>
          </div>
        </div>
      )}

      {/* Map container */}
      <div
        id="map-container"
        className="h-full w-full"
        style={{
          filter: !isLeafletLoaded ? "blur(4px)" : "none",
          transition: "filter 0.3s ease-in-out",
        }}
      />

      {/* Custom styles for Leaflet popups */}
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .custom-popup .leaflet-popup-tip {
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
        }
        
        .leaflet-control-zoom a {
          background: rgba(30, 41, 59, 0.9) !important;
          color: white !important;
          border: 1px solid rgba(71, 85, 105, 0.5) !important;
          backdrop-filter: blur(10px);
          transition: all 0.2s ease-in-out !important;
        }
        
        .leaflet-control-zoom a:hover {
          background: rgba(59, 130, 246, 0.9) !important;
          border-color: rgba(29, 78, 216, 0.8) !important;
          transform: scale(1.05);
        }
        
        .leaflet-container {
          background: #0f172a !important;
        }
      `}</style>
    </main>
  )
}

export default MapPage
