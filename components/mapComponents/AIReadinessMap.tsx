"use client";

import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Feature, GeoJsonProperties, Geometry } from 'geojson';
import type { Layer, Map } from 'leaflet';

import { aiReadinessDataArray } from '@/data/aiReadinessData';

// Define a mapping for country names that may differ between data sources
const COUNTRY_NAME_MAP: { [key: string]: string } = {
  "United States of America": "United States",
  "Russian Federation": "Russia",
  "Dem. Rep. Congo": "Congo, Dem. Rep. of the",
  "Congo": "Congo, Republic of",
  "Republic of Korea": "South Korea",
  "Korea, Republic of": "South Korea",
  "Hong Kong S.A.R.": "Hong Kong SAR",
  "Macao S.A.R": "Macao SAR",
  "Republic of Turkey": "Turkey",
  "Czechia": "Czech Republic"
};

// Define a custom properties type to include our new data
interface CountryProperties extends GeoJsonProperties {
  name: string;
  aiReadiness?: number; // Score from 0-100
}

// Use the custom properties in our Feature type
type CountryFeature = Feature<Geometry, CountryProperties>;

// Define the items for our legend with uniform blue shades
const legendColorItems = [
    { score: '1-40', color: '#bfdbfe', label: 'Emerging' },      // blue-200
    { score: '41-60', color: '#93c5fd', label: 'Developing' },   // blue-300
    { score: '61-70', color: '#60a5fa', label: 'Advanced' },     // blue-400
    { score: '71+', color: '#3b82f6', label: 'Leading' },        // blue-500
];

const AIReadinessMap = () => {
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryFeature | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const geoJsonRef = useRef<any>(null);
  const mapRef = useRef<Map>(null);

  useEffect(() => {
    const fetchAndMergeData = async () => {
      try {
        setIsLoading(true);
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
            const getAllCoordinates = (geometry: any): number[][][] => {
              if (geometry.type === 'MultiPolygon') {
                return geometry.coordinates.flat();
              } else if (geometry.type === 'Polygon') {
                return [geometry.coordinates];
              }
              return [];
            };
            
            const moroccoPolygons = getAllCoordinates(moroccoFeature.geometry);
            const westernSaharaPolygons = getAllCoordinates(westernSaharaFeature.geometry);
            
            const allPolygons = [...moroccoPolygons, ...westernSaharaPolygons];
            
            mergedGeometry = {
              type: 'MultiPolygon',
              coordinates: allPolygons.map(poly => poly)
            };
          }
          
          // Create the merged Morocco feature with custom properties to handle unified rendering
          const mergedMorocco: CountryFeature = {
            ...moroccoFeature,
            geometry: mergedGeometry,
            properties: {
              ...moroccoFeature.properties,
              name: "Morocco",
              unified: true // Custom flag to handle special rendering
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
      } finally {
        setIsLoading(false);
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
    
    const isMorocco = feature?.properties?.name === "Morocco";
    
    // Dynamically color countries based on their readiness score using blue shades
    const score = feature?.properties?.aiReadiness ?? 0;
    let fillColor = '#f8fafc'; // Default light gray for countries with no data
    if (score > 0) fillColor = '#bfdbfe';   // blue-200 - Emerging
    if (score > 40) fillColor = '#93c5fd';  // blue-300 - Developing
    if (score > 60) fillColor = '#60a5fa';  // blue-400 - Advanced
    if (score > 70) fillColor = '#3b82f6';  // blue-500 - Leading

    return {
      fillColor: isSelected ? '#f97316' : fillColor,
      weight: isMorocco ? 0.3 : (isSelected ? 3 : 0.5),
      opacity: isMorocco ? 0.2 : (isSelected ? 1 : 0.4),
      color: isSelected ? '#ea580c' : (isMorocco ? fillColor : '#64748b'),
      fillOpacity: isSelected ? 0.95 : 0.85,
      lineCap: 'round',
      lineJoin: 'round'
    };
  };

  const onEachFeature = (feature: CountryFeature, layer: Layer) => {
    layer.on({
      click: () => setSelectedCountry(feature),
      mouseover: (e) => {
        const layer = e.target;
        if (selectedCountry?.id !== feature.id) {
          layer.setStyle({
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.9
          });
        }
      },
      mouseout: (e) => {
        if (selectedCountry?.id !== feature.id) {
          geoJsonRef.current?.resetStyle(e.target);
        }
      }
    });
  };

  // Filter countries based on search term
  const filteredCountries = countries
    .filter(c => c.properties.aiReadiness && c.properties.aiReadiness > 0)
    .filter((country) =>
      country.properties?.name && country.properties.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a,b) => (b.properties.aiReadiness ?? 0) - (a.properties.aiReadiness ?? 0));

  const getScoreCategory = (score: number) => {
    if (score > 70) return { label: 'Leading', color: 'text-blue-700', bg: 'bg-blue-50' };
    if (score > 60) return { label: 'Advanced', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (score > 40) return { label: 'Developing', color: 'text-blue-500', bg: 'bg-blue-50' };
    return { label: 'Emerging', color: 'text-blue-400', bg: 'bg-blue-50' };
  };
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-lg font-semibold text-slate-600">Loading AI Readiness Data...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-96 bg-white/90 backdrop-blur-sm border-r border-slate-200/50 flex flex-col shadow-xl">
          <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Global Rankings</h2>
                <p className="text-sm text-slate-500">{filteredCountries.length} countries ranked</p>
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search countries..."
                className="w-full p-3 pl-11 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm transition-all bg-white/80 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              <div className="p-2 space-y-1">
                {filteredCountries.map((country, index) => {
                  const category = getScoreCategory(country.properties.aiReadiness ?? 0);
                  return (
                    <div
                      key={country.id ?? country.properties?.name}
                      onClick={() => handleCountryClick(country)}
                      className={`flex items-center justify-between p-4 cursor-pointer transition-all duration-200 rounded-xl group hover:shadow-md
                        ${selectedCountry?.id === country.id
                          ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 shadow-lg transform scale-[1.02]'
                          : 'hover:bg-slate-50 border-2 border-transparent'}
                      `}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                          ${index < 3 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white' : 'bg-slate-100 text-slate-600'}
                        `}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 group-hover:text-slate-900">
                            {country.properties?.name ?? 'Unknown'}
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${category.bg} ${category.color}`}>
                            {category.label}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="text-lg font-bold text-slate-800">{country.properties.aiReadiness}</div>
                          <div className="text-xs text-slate-500">Score</div>
                        </div>
                        <div className="w-16 bg-slate-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-700" 
                            style={{ width: `${country.properties.aiReadiness}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-slate-500">No countries found</p>
              </div>
            )}
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative flex flex-col">
          <div className="flex-1 m-4 rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden relative bg-white z-0">
            <MapContainer 
              ref={mapRef}
              center={[20, 0]} 
              zoom={2} 
              className="h-full w-full"
              scrollWheelZoom={true}
              style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
                attribution='&copy; OpenStreetMap contributors'
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
          </div>

          {/* Legend */}
          <div className="m-4 mt-0 bg-white/90 backdrop-blur-sm p-6 shadow-xl border border-slate-200/50 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">AI Readiness Scale</h3>
                <p className="text-sm text-slate-500">Click on any country to explore details</p>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-slate-200"></div>
                  <span className="text-slate-600">No Data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                  <span className="text-slate-600">Selected</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {legendColorItems.map((item, idx) => (
                <div key={item.score} className="flex items-center space-x-3">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-6 h-6 rounded-lg shadow-sm border border-white/50" 
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="text-xs font-medium text-slate-600 mt-1">{item.score}</div>
                  </div>
                  <div className="text-sm font-medium text-slate-700">{item.label}</div>
                  {idx < legendColorItems.length - 1 && (
                    <div className="w-8 h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-96 bg-white/90 backdrop-blur-sm border-l border-slate-200/50 flex flex-col shadow-xl">
          <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Country Analysis</h2>
                <p className="text-sm text-slate-500">Detailed AI readiness insights</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {selectedCountry ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                    <span className="text-2xl font-bold text-slate-600">
                      {selectedCountry.properties?.name?.slice(0,2)?.toUpperCase() ?? '--'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    {selectedCountry.properties?.name ?? 'Unknown'}
                  </h3>
                  {(() => {
                    const category = getScoreCategory(selectedCountry.properties.aiReadiness ?? 0);
                    return (
                      <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${category.bg} ${category.color}`}>
                        {category.label} AI Readiness
                      </div>
                    );
                  })()}
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100/50 shadow-sm">
                  <div className="text-center">
                    <p className="text-sm font-medium text-slate-600 mb-2">Overall AI Readiness Score</p>
                    <div className="flex items-end justify-center space-x-2 mb-4">
                      <span className="text-5xl font-bold text-slate-800">
                        {selectedCountry.properties.aiReadiness ?? 'N/A'}
                      </span>
                      <span className="text-2xl font-semibold text-slate-500 pb-2">/100</span>
                    </div>
                    <div className="w-full bg-white/50 rounded-full h-3 shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000 shadow-sm" 
                        style={{ width: `${selectedCountry.properties.aiReadiness}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">Global Ranking</span>
                      <span className="text-lg font-bold text-slate-800">
                        #{(filteredCountries.findIndex(c => c.id === selectedCountry.id) + 1)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-600">Readiness Level</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full transition-all duration-700" 
                          style={{ width: `${selectedCountry.properties.aiReadiness}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">
                        {selectedCountry.properties.aiReadiness}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-amber-800 mb-1">AI Readiness Insights</p>
                      <p className="text-xs text-amber-700">
                        This score reflects the country's infrastructure, policy framework, and technological adoption for AI development.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                  <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800">Explore AI Readiness</h3>
                  <p className="text-slate-500 max-w-xs leading-relaxed">
                    Select any country from the map or rankings to discover detailed AI readiness metrics and insights.
                  </p>
                  <div className="flex flex-col space-y-2 text-sm text-slate-400">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                      <span>Click on countries in the map</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                      <span>Browse the rankings list</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                      <span>Search for specific countries</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-6 border-t border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-gray-50/50">
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl transition-all font-semibold flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={() => window.open('https://oxfordinsights.com/ai-readiness/ai-readiness-index/', '_blank')}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Full Report
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Custom Styles */}
      <style jsx global>{`
        /* Custom scrollbar styling */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #cbd5e1, #94a3b8);
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #94a3b8, #64748b);
        }
        
        /* Smooth animations */
        .transition-all {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Map container styling */
        .leaflet-container {
          font-family: inherit;
        }
        
        /* Enhanced focus states */
        .focus\:ring-2:focus {
          outline: 2px solid transparent;
          outline-offset: 2px;
        }
        
        /* Backdrop blur support */
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
        
        /* Smooth gradient overlays */
        .bg-gradient-to-br {
          background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
        }
        
        /* Enhanced shadow effects */
        .shadow-2xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .shadow-xl {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        /* Improved button hover effects */
        .transform:hover {
          transform: scale(1.02);
        }
        
        /* Loading animation */
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        /* Improved card styling */
        .border-slate-200\/50 {
          border-color: rgba(226, 232, 240, 0.5);
        }
        
        /* Enhanced map interaction */
        .leaflet-interactive {
          cursor: pointer;
        }
        
        .leaflet-interactive:hover {
          filter: brightness(1.1);
        }
      `}</style>
    </div>
  );
};

export default AIReadinessMap;