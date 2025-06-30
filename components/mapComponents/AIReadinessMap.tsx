"use client";

import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Feature, GeoJsonProperties, Geometry } from 'geojson';
import type { Layer, Map } from 'leaflet';

// Import the AI readiness data from your local file
import { aiReadinessDataArray } from '@/data/aiReadinessData';

// Define a mapping for country names that may differ between data sources
const COUNTRY_NAME_MAP: { [key: string]: string } = {
  "United States of America": "United States",
  "Russian Federation": "Russian Federation",
  "Dem. Rep. Congo": "Congo, Dem. Rep. of the",
  "Congo": "Congo, Republic of",
  "Republic of Korea": "Korea, Republic of",
  "Hong Kong S.A.R.": "Hong Kong SAR",
  "Macao S.A.R": "Macao SAR",
  "Republic of Turkey": "Türkiye, Republic of",
  "Czechia": "Czech Republic"
};


// Define a custom properties type to include our new data
interface CountryProperties extends GeoJsonProperties {
  name: string;
  aiReadiness?: number; // Score from 0-100
}

// Use the custom properties in our Feature type
type CountryFeature = Feature<Geometry, CountryProperties>;

// Define the items for our legend, ordered from low to high score.
const legendColorItems = [
    { score: '1-40', color: '#a1d99b' },
    { score: '41-60', color: '#74c476' },
    { score: '61-70', color: '#41ab5d' },
    { score: '71+', color: '#238b45' },
];

const AIReadinessMap = () => {
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryFeature | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const geoJsonRef = useRef<any>(null);
  const mapRef = useRef<Map>(null);

  useEffect(() => {
    const fetchAndMergeData = async () => {
      try {
        // 1. Create a lookup map from your local AI readiness data
        const readinessDataMap = new Map(
          aiReadinessDataArray.map(data => [data.name, data.value])
        );

        // 2. Fetch the GeoJSON for map shapes
        const response = await fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json');
        if (!response.ok) throw new Error('Failed to fetch country data');
        const geoJsonData = await response.json();
        
        // 3. Handle Morocco and Western Sahara merger
        let moroccoFeature: CountryFeature | null = null;
        let westernSaharaFeature: CountryFeature | null = null;
        
        // Find Morocco and Western Sahara features
        const otherFeatures = geoJsonData.features.filter((f: CountryFeature) => {
          if (f.properties.name === "Morocco") {
            moroccoFeature = f;
            return false;
          } else if (f.properties.name === "Western Sahara") {
            westernSaharaFeature = f;
            return false;
          } else if (f.properties.name === "Antarctica") {
            return false;
          }
          return true;
        });

        // Merge Morocco and Western Sahara geometries
        const mergedFeatures: CountryFeature[] = [];
        
        if (moroccoFeature) {
          let mergedGeometry = moroccoFeature.geometry;
          
          // If Western Sahara exists, merge its geometry with Morocco
          if (westernSaharaFeature && westernSaharaFeature.geometry) {
            // Handle different geometry types
            const moroccoCoords = moroccoFeature.geometry.type === 'MultiPolygon' 
              ? moroccoFeature.geometry.coordinates 
              : [moroccoFeature.geometry.coordinates];
            
            const westernSaharaCoords = westernSaharaFeature.geometry.type === 'MultiPolygon' 
              ? westernSaharaFeature.geometry.coordinates 
              : [westernSaharaFeature.geometry.coordinates];
            
            // Combine coordinates
            const combinedCoords = [...moroccoCoords, ...westernSaharaCoords];
            
            mergedGeometry = {
              type: 'MultiPolygon',
              coordinates: combinedCoords
            };
          }
          
          // Create the merged Morocco feature
          const mergedMorocco: CountryFeature = {
            ...moroccoFeature,
            geometry: mergedGeometry,
            properties: {
              ...moroccoFeature.properties,
              name: "Morocco"
            }
          };
          
          mergedFeatures.push(mergedMorocco);
        }
        
        // Add all other features
        mergedFeatures.push(...otherFeatures);
        
        // 4. Merge the GeoJSON data with your AI readiness data
        const finalFeatures: CountryFeature[] = mergedFeatures.map((feature: CountryFeature) => {
          const geoJsonName = feature.properties.name;
          // Check for a mapped name first, otherwise use the original
          const lookupName = COUNTRY_NAME_MAP[geoJsonName] || geoJsonName;
          const readinessValue = readinessDataMap.get(lookupName);

          // Add the aiReadiness score to the feature's properties
          // The score is scaled from 0-1 to 0-100 and fixed to an integer
          feature.properties.aiReadiness = readinessValue ? Math.round(readinessValue * 100) : 0;

          return feature;
        });

        setCountries(finalFeatures);
      } catch (error) {
        console.error("Error loading or merging country data:", error);
      }
    };

    fetchAndMergeData();
  }, []);

  const handleCountryClick = (country: CountryFeature) => {
    setSelectedCountry(country);
  };

  const styleFeature = (feature?: CountryFeature) => {
    const isSelected =
      selectedCountry &&
      feature?.id === selectedCountry.id;
    
    // Dynamically color countries based on their readiness score
    const score = feature?.properties?.aiReadiness ?? 0;
    let fillColor = '#d1d5db'; // Default gray for countries with no data
    if (score > 0) fillColor = '#a1d99b';
    if (score > 40) fillColor = '#74c476';
    if (score > 60) fillColor = '#41ab5d';
    if (score > 70) fillColor = '#238b45';

    return {
      fillColor: isSelected ? '#F59E0B' : fillColor,
      weight: 1.5,
      opacity: 1,
      color: 'white',
      fillOpacity: isSelected ? 0.9 : 0.7,
    };
  };

  const onEachFeature = (feature: CountryFeature, layer: Layer) => {
    layer.on({
      click: () => setSelectedCountry(feature),
    });
  };

  // Filter countries based on search term
  const filteredCountries = countries
    .filter(c => c.properties.aiReadiness && c.properties.aiReadiness > 0) // Only show countries with data in the list
    .filter((country) =>
      country.properties?.name && country.properties.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a,b) => (b.properties.aiReadiness ?? 0) - (a.properties.aiReadiness ?? 0)); // Sort by score descending


  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-gray-100 font-sans">
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-96 bg-white border-r border-blue-100 flex flex-col">
          <div className="p-5 border-b border-blue-100">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Country Rankings</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search countries..."
                className="w-full p-2.5 pl-11 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-base shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="w-5 h-5 absolute left-4 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredCountries.length > 0 ? (
              <ul className="divide-y divide-blue-50">
                {filteredCountries.map((country, index) => (
                  <li
                    key={country.id ?? country.properties?.name}
                    onClick={() => handleCountryClick(country)}
                    className={`flex items-center justify-between p-4 cursor-pointer transition-all duration-200 rounded-lg mx-2 my-1 group
                      ${selectedCountry?.id === country.id
                        ? 'bg-blue-100 border-l-4 border-blue-600 shadow'
                        : 'hover:bg-blue-50 border-l-4 border-transparent'}
                    `}
                  >
                    <div className="flex items-center">
                        <span className="font-bold text-gray-400 w-8">{index + 1}</span>
                        <span className={`font-medium text-base truncate pr-4 transition-colors duration-200
                        ${selectedCountry?.id === country.id
                            ? 'text-blue-900'
                            : 'text-gray-700 group-hover:text-blue-700'}
                        `}>
                        {country.properties?.name ?? 'Unknown'}
                        </span>
                    </div>
                    
                    {/* AI Readiness Meter */}
                    <div className="flex items-center flex-shrink-0 w-[120px]">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{ width: `${country.properties.aiReadiness}%` }}></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-600 ml-2 w-8 text-right">{country.properties.aiReadiness}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-2 text-gray-500">No countries found</p>
              </div>
            )}
          </div>
        </div>

        {/* Map Container with Legend */}
        <div className="flex-1 relative flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white z-0">
          <div className="w-[98%] flex-1 rounded-3xl shadow-2xl border border-blue-100 overflow-hidden relative z-0 mb-4">
            <MapContainer 
              ref={mapRef}
              center={[20, 0]} 
              zoom={2} 
              className="h-full w-full bg-blue-50 z-0"
              scrollWheelZoom={true}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              {countries.length > 0 && (
                <GeoJSON
                  ref={geoJsonRef}
                  data={{ type: 'FeatureCollection', features: countries }}
                  style={styleFeature}
                  onEachFeature={onEachFeature}
                />
              )}
            </MapContainer>
            {/* Map Controls */}
            <div className="absolute top-5 right-5 bg-white rounded-xl shadow-lg p-2 flex flex-col gap-2 border border-blue-100">
              <button className="p-2 hover:bg-blue-50 rounded-md transition-colors">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </button>
              <button className="p-2 hover:bg-blue-50 rounded-md transition-colors">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* AI Readiness Score Legend - Now positioned under the map */}
          <div className="w-[98%] bg-white p-4 shadow-lg border border-blue-100 rounded-2xl mb-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-3">
                <h3 className="text-lg font-bold text-blue-900 mb-1">AI Readiness Score Scale</h3>
                <p className="text-sm text-blue-600">Color coding represents the readiness level of each country</p>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span className="font-medium">Low Readiness</span>
                <span className="text-center font-medium">Medium Readiness</span>
                <span className="text-right font-medium">High Readiness</span>
              </div>
              
              <div className="flex h-6 rounded-full overflow-hidden border-2 border-gray-200 shadow-inner mb-2">
                {legendColorItems.map((item) => (
                  <div key={item.score} style={{ backgroundColor: item.color }} className="w-1/4 transition-all duration-300 hover:brightness-110"></div>
                ))}
              </div>
              
              <div className="flex justify-between text-sm text-gray-700 font-semibold mb-3">
                <span>0</span>
                <span>40</span>
                <span>60</span>
                <span className="text-right">70+</span>
              </div>
              
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full mr-2 border-2 border-gray-300" style={{backgroundColor: '#d1d5db'}}></div>
                  <span className="text-sm text-gray-600 font-medium">No Data Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full mr-2 border-2 border-amber-400" style={{backgroundColor: '#F59E0B'}}></div>
                  <span className="text-sm text-gray-600 font-medium">Selected Country</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-96 bg-white border-l border-blue-100 flex flex-col">
          <div className="p-6 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white">
            <h2 className="text-2xl font-extrabold text-blue-900">AI Readiness Analysis</h2>
            <p className="text-sm text-blue-500 mt-1">Metrics and data points</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {selectedCountry ? (
              <div className="space-y-6 animate-fade-in">
                {/* Country Header */}
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-2xl w-14 h-14 flex-shrink-0 flex items-center justify-center text-gray-500 text-2xl font-bold">
                    {selectedCountry.properties?.name?.slice(0,2)?.toUpperCase() ?? '--'}
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-blue-900">{selectedCountry.properties?.name ?? 'Unknown'}</h3>
                  </div>
                </div>

                {/* Overall Score */}
                <div className="bg-green-50 p-5 rounded-xl shadow-sm text-center">
                    <p className="text-base text-green-700 font-semibold">Overall AI Readiness Score</p>
                    <p className="text-5xl font-extrabold mt-2 text-green-900">{selectedCountry.properties.aiReadiness ?? 'N/A'}<span className="text-3xl text-green-400">/100</span></p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                        <div className="bg-gradient-to-r from-green-500 to-green-700 h-2.5 rounded-full transition-all duration-700" style={{ width: `${selectedCountry.properties.aiReadiness}%` }}></div>
                    </div>
                </div>
                
                <div className="pt-4 text-gray-600 text-center">
                    <p>Select another country to see its detailed AI readiness score.</p>
                </div>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-blue-700 mb-1">No Country Selected</h3>
                <p className="text-blue-400 max-w-xs">
                  Select a country from the list or on the map to view its AI readiness data.
                </p>
              </div>
            )}
          </div>
          
          <div className="p-5 border-t bg-gradient-to-r from-blue-50 to-white border-blue-100">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all font-semibold flex items-center justify-center shadow focus:outline-none focus:ring-2 focus:ring-blue-400">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
              </svg>
              Download Full Report (PDF)
            </button>
          </div>
        </div>
      </div>
      {/* Custom scrollbar and fade-in animation */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e0e7ef;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
};

export default AIReadinessMap;