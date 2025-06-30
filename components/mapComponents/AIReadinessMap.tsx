"use client";

import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Feature, GeoJsonProperties, Geometry } from 'geojson';
import type { Layer } from 'leaflet';
import type { Map } from 'leaflet';

// Define a custom properties type to include our new data
interface CountryProperties extends GeoJsonProperties {
  name: string;
  aiReadiness?: number;
  governmentInvestment?: number;
  innovationScore?: number;
  dataInfrastructure?: number;
  humanCapital?: number;
  aiStartups?: number;
  ethicsRating?: 'A' | 'B' | 'C' | 'D';
}

// Use the custom properties in our Feature type
type CountryFeature = Feature<Geometry, CountryProperties>;


const AIReadinessMap = () => {
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryFeature | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const geoJsonRef = useRef<any>(null);
  const mapRef = useRef<Map>(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json');
        if (!response.ok) throw new Error('Failed to fetch country data');
        const data = await response.json();
        
        // Filter out Antarctica and add a random AI readiness score for demonstration
        const featuresWithAIReadiness: CountryFeature[] = data.features
          .filter((f: CountryFeature) => f.properties.name !== "Antarctica")
          .map((feature: CountryFeature) => ({
            ...feature,
            properties: {
              ...feature.properties,
              // Simulate a range of AI-related data points
              aiReadiness: Math.floor(Math.random() * 101),
              governmentInvestment: Math.floor(Math.random() * 101),
              innovationScore: Math.floor(Math.random() * 101),
              dataInfrastructure: Math.floor(Math.random() * 101),
              humanCapital: Math.floor(Math.random() * 101),
              aiStartups: Math.floor(Math.random() * 491) + 10, // Random number between 10 and 500
              ethicsRating: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)] as 'A' | 'B' | 'C' | 'D',
            },
          }));

        setCountries(featuresWithAIReadiness);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountryData();
  }, []);

  const handleCountryClick = (country: CountryFeature) => {
    setSelectedCountry(country);
  };

  const styleFeature = (feature?: CountryFeature) => {
    const isSelected =
      selectedCountry &&
      feature?.id === selectedCountry.id;
    return {
      fillColor: isSelected ? '#F59E0B' : '#3B82F6',
      weight: 1.5,
      opacity: 1,
      color: 'white',
      fillOpacity: isSelected ? 0.8 : 0.6,
    };
  };

  const onEachFeature = (feature: CountryFeature, layer: Layer) => {
    layer.on({
      click: () => setSelectedCountry(feature),
    });
  };

  // Filter countries based on search term
  const filteredCountries = countries.filter((country) =>
    country.properties?.name && country.properties.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-gray-100 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-white via-blue-50 to-white shadow-lg py-5 px-8 border-b border-blue-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Global AI Readiness Index
          </h1>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-base font-semibold shadow-sm">Beta</div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow transition-all font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400">Download Report</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-96 bg-white border-r border-blue-100 flex flex-col">
          <div className="p-5 border-b border-blue-100">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Countries</h2>
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
                {filteredCountries.map((country) => (
                  <li
                    key={country.id ?? country.properties?.name}
                    onClick={() => handleCountryClick(country)}
                    className={`flex items-center justify-between p-4 cursor-pointer transition-all duration-200 rounded-lg mx-2 my-1 group
                      ${selectedCountry?.id === country.id
                        ? 'bg-blue-100 border-l-4 border-blue-600 shadow'
                        : 'hover:bg-blue-50 border-l-4 border-transparent'}
                    `}
                  >
                    <span className={`font-medium text-base truncate pr-4 transition-colors duration-200
                      ${selectedCountry?.id === country.id
                        ? 'text-blue-900'
                        : 'text-gray-700 group-hover:text-blue-700'}
                    `}>
                      {country.properties?.name ?? 'Unknown'}
                    </span>
                    
                    {/* AI Readiness Meter */}
                    <div className="flex items-center flex-shrink-0 w-[120px]">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{ width: `${country.properties.aiReadiness}%` }}></div>
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

        {/* Map Container */}
        <div className="flex-1 relative flex items-center justify-center bg-gradient-to-br from-blue-50 to-white z-0">
          <div className="w-[98%] h-[96%] rounded-3xl shadow-2xl border border-blue-100 overflow-hidden relative z-0">
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
                <div className="bg-blue-50 p-5 rounded-xl shadow-sm text-center">
                    <p className="text-base text-blue-700 font-semibold">Overall AI Readiness Score</p>
                    <p className="text-5xl font-extrabold mt-2 text-blue-900">{selectedCountry.properties.aiReadiness ?? 'N/A'}<span className="text-3xl text-blue-400">/100</span></p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-2.5 rounded-full transition-all duration-700" style={{ width: `${selectedCountry.properties.aiReadiness}%` }}></div>
                    </div>
                </div>

                {/* Core Pillars */}
                <div>
                    <h4 className="font-bold text-blue-800 mb-3">Core Pillars</h4>
                    <div className="space-y-3">
                        {[
                            { label: 'Gov. Investment', value: selectedCountry.properties.governmentInvestment, color: 'from-sky-400 to-sky-600' },
                            { label: 'Innovation', value: selectedCountry.properties.innovationScore, color: 'from-purple-400 to-purple-600' },
                            { label: 'Data Infrastructure', value: selectedCountry.properties.dataInfrastructure, color: 'from-emerald-400 to-emerald-600' },
                            { label: 'Human Capital', value: selectedCountry.properties.humanCapital, color: 'from-amber-400 to-amber-600' },
                        ].map(pillar => (
                            <div key={pillar.label}>
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-sm font-semibold text-gray-600">{pillar.label}</p>
                                    <p className="text-sm font-bold text-gray-800">{pillar.value}/100</p>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className={`bg-gradient-to-r ${pillar.color} h-2 rounded-full`} style={{ width: `${pillar.value}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Stats */}
                 <div>
                    <h4 className="font-bold text-blue-800 mb-3">Additional Stats</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-xl shadow-sm text-center">
                           <p className="text-sm text-gray-500 font-semibold">AI Startups</p>
                           <p className="text-2xl font-extrabold mt-1 text-gray-800">{selectedCountry.properties.aiStartups}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl shadow-sm text-center">
                           <p className="text-sm text-gray-500 font-semibold">Ethics & Gov. Rating</p>
                           <p className="text-2xl font-extrabold mt-1 text-gray-800">{selectedCountry.properties.ethicsRating}</p>
                        </div>
                    </div>
                </div>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-blue-700 mb-1">No Country Selected</h3>
                <p className="text-blue-400 max-w-xs">
                  Select a country from the list to view its AI readiness data.
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