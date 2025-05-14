"use client"

import { useState, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';

// This component will only run on the client side
const AIReadinessMap = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [aiReadinessData, setAiReadinessData] = useState({});
  const mapRef = useRef(null);
  const geoJsonRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // AI readiness data provided
  useEffect(() => {
    // This would typically come from an API or database
    const readinessData = {
      "Albania": 0.5267925411,
  "Algeria": 0.3704386652,
  "Angola": 0.2596592419,
  "Argentina": 0.473809436,
  "Armenia": 0.4928866848,
  "Australia": 0.7271003276,
  "Austria": 0.7245657593,
  "Azerbaijan": 0.4709397778,
  "Bahamas": 0.4575124606,
  "Bahrain": 0.5152552128,
  "Bangladesh": 0.3840644881,
  "Barbados": 0.5046559796,
  "Belarus": 0.4707805738,
  "Belgium": 0.6724778414,
  "Belize": 0.4226269051,
  "Benin": 0.3631641939,
  "Bhutan": 0.4419174641,
  "Bolivia": 0.3766047582,
  "Bosnia and Herzegovina": 0.427913107,
  "Botswana": 0.4128481001,
  "Brazil": 0.5013404191,
  "Brunei": 0.495252721,
  "Bulgaria": 0.5772901177,
  "Burkina Faso": 0.3118198998,
  "Burundi": 0.2945838682,
  "Cabo Verde": 0.4325874969,
  "Cambodia": 0.3699649274,
  "Cameroon": 0.3412863761,
  "Canada": 0.7131513506,
  "Central African Republic": 0.1844374854,
  "Chad": 0.2336060721,
  "Chile": 0.5857511684,
  "China": 0.6354544014,
  "Colombia": 0.4894939214,
  "Comoros": 0.2541744448,
  "Congo, Dem. Rep. of the": 0.2474736646,
  "Congo, Republic of": 0.2766119055,
  "Costa Rica": 0.5401517823,
  "Croatia": 0.5816958994,
  "Cyprus": 0.6323937923,
  "Czech Republic": 0.6462222636,
  "Côte d'Ivoire": 0.3655039445,
  "Denmark": 0.778522253,
  "Djibouti": 0.3188972175,
  "Dominican Republic": 0.4688114077,
  "Ecuador": 0.4420759678,
  "Egypt": 0.3940544575,
  "El Salvador": 0.3897207454,
  "Estonia": 0.7643821985,
  "Eswatini": 0.3062105589,
  "Ethiopia": 0.2535972483,
  "Fiji": 0.4488119557,
  "Finland": 0.7580173612,
  "France": 0.697508648,
  "Gabon": 0.322529301,
  "Gambia": 0.3599762432,
  "Georgia": 0.5298935696,
  "Germany": 0.7533288151,
  "Ghana": 0.42519968,
  "Greece": 0.5819787532,
  "Guatemala": 0.3901057094,
  "Guinea": 0.3235260881,
  "Guinea-Bissau": 0.2648987435,
  "Guyana": 0.4241799712,
  "Haiti": 0.2682539858,
  "Honduras": 0.341811832,
  "Hong Kong": 0.7005674094,
  "Hungary": 0.5629620552,
  "Iceland": 0.700100854,
  "India": 0.4925031066,
  "Indonesia": 0.516303286,
  "Iran": 0.3783258945,
  "Iraq": 0.2698363438,
  "Ireland": 0.6931281686,
  "Israel": 0.7254701853,
  "Italy": 0.6207230389,
  "Jamaica": 0.4337519929,
  "Japan": 0.7331584096,
  "Jordan": 0.4828312397,
  "Kazakhstan": 0.5523871183,
  "Kenya": 0.445192121,
  "Korea, Republic of": 0.7265744358,
  "Kuwait": 0.4613324776,
  "Kyrgyz Republic": 0.4258418009,
  "Lao P.D.R.": 0.3304923177,
  "Latvia": 0.6323978007,
  "Lebanon": 0.4178484976,
  "Lesotho": 0.3553587049,
  "Liberia": 0.3702549636,
  "Libya": 0.2449759804,
  "Lithuania": 0.664883852,
  "Luxembourg": 0.7352711707,
  "Madagascar": 0.3054498844,
  "Malawi": 0.3400474451,
  "Malaysia": 0.6320262998,
  "Mali": 0.2961464524,
  "Malta": 0.6592013389,
  "Mauritania": 0.2329010069,
  "Mauritius": 0.5251129717,
  "Mexico": 0.5320441872,
  "Moldova": 0.4806292579,
  "Mongolia": 0.4843766093,
  "Montenegro": 0.5036933348,
  "Morocco": 0.4291108549,
  "Mozambique": 0.2573649622,
  "Myanmar": 0.3274729885,
  "Namibia": 0.4196117297,
  "Nepal": 0.3509792909,
  "Netherlands": 0.7664931118,
  "New Zealand": 0.7536797822,
  "Nicaragua": 0.3313940018,
  "Niger": 0.325826142,
  "Nigeria": 0.3362846896,
  "North Macedonia": 0.4819860309,
  "Norway": 0.7057610154,
  "Oman": 0.5327769667,
  "Pakistan": 0.3686380237,
  "Panama": 0.5012808219,
  "Papua New Guinea": 0.2901029624,
  "Paraguay": 0.4097598791,
  "Peru": 0.4911330715,
  "Philippines": 0.498485662,
  "Poland": 0.5968846828,
  "Portugal": 0.6460198164,
  "Qatar": 0.5345921367,
  "Romania": 0.5836483091,
  "Russia": 0.5592233092,
  "Rwanda": 0.4374002144,
  "Saint Lucia": 0.3741867021,
  "Saint Vincent and the Grenadines": 0.3418518081,
  "Saudi Arabia": 0.5769030005,
  "Senegal": 0.3959680274,
  "Serbia": 0.5374747142,
  "Seychelles": 0.5306526497,
  "Sierra Leone": 0.2978129052,
  "Singapore": 0.800566718,
  "Slovak Republic": 0.5916225016,
  "Slovenia": 0.6338621378,
  "South Africa": 0.4967651442,
  "Spain": 0.6483311951,
  "Sri Lanka": 0.4360671416,
  "Sudan": 0.2329067122,
  "Suriname": 0.417907849,
  "Sweden": 0.7477999032,
  "Switzerland": 0.7570124269,
  "Syria": 0.2981490139,
  "Tajikistan": 0.366445981,
  "Tanzania": 0.3524204865,
  "Thailand": 0.5357170999,
  "Timor-Leste": 0.427734755,
  "Togo": 0.3156863898,
  "Trinidad and Tobago": 0.4356224835,
  "Tunisia": 0.4654096887,
  "Türkiye": 0.5401873589,
  "Uganda": 0.3539346606,
  "Ukraine": 0.5124830604,
  "United Arab Emirates": 0.6281846315,
  "United Kingdom": 0.730945304,
  "United States": 0.771269083,
  "Uruguay": 0.5486409888,
  "Venezuela": 0.274582522,
  "Vietnam": 0.4818687364,
  "Yemen": 0.2533275578,
  "Zambia": 0.3707199767,
  "Zimbabwe": 0.3047910891,
  "Asia and Pacific": 0.52,
  "Europe": 0.63,
  "North America": 0.74,
  "Sub-Saharan Africa": 0.34,
  "ASEAN-5": 0.6,
  "Advanced economies": 0.682974195,
  "Emerging market economies": 0.4649250086,
  "Euro area": 0.67,
  "European Union": 0.66,
  "Latin America and the Caribbean": 0.43,
  "Low-income countries": 0.3224417757,
  "Major advanced economies (G7)": 0.72,
  "Middle East and Central Asia": 0.4
    };
    setAiReadinessData(readinessData);
  }, []);

  // Fetch GeoJSON data
  useEffect(() => {
    const fetchGeoJson = async () => {
      try {
        setLoading(true);
        // Natural Earth Data provides a free GeoJSON of world countries
        const response = await fetch(
          'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch GeoJSON data');
        }
        
        const data = await response.json();
        setGeoJsonData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching GeoJSON:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGeoJson();
  }, []);

  // Function to get color based on AI readiness score
  const getColor = (score) => {
    // Default color for countries with no data
    if (score === undefined) return '#cccccc';
    
    // Color gradient from brighter to darker based on score
    // Higher scores get darker colors (more intense blue)
    const hue = 210; // Blue hue
    const saturation = 100; // Full saturation
    const lightness = Math.min(80, Math.max(20, 80 - (score * 60))); // Lightness decreases with higher scores
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  // Style function for GeoJSON
  const countryStyle = (feature) => {
    const countryName = feature.properties.name;
    let score = aiReadinessData[countryName];
    
    // Handle name mismatches - some common examples
    if (!score) {
      if (countryName === "United States of America") score = aiReadinessData["United States"];
      else if (countryName === "United Kingdom") score = aiReadinessData["UK"];
      else if (countryName === "The Bahamas") score = aiReadinessData["Bahamas"];
      else if (countryName === "Brunei Darussalam") score = aiReadinessData["Brunei"];
    }
    
    return {
      fillColor: getColor(score),
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  };

  // Handle hover events
  const onEachFeature = (feature, layer) => {
    const countryName = feature.properties.name;
    let score = aiReadinessData[countryName];
    
    // Handle name mismatches
    if (!score) {
      if (countryName === "United States of America") score = aiReadinessData["United States"];
      else if (countryName === "United Kingdom") score = aiReadinessData["UK"];
      else if (countryName === "The Bahamas") score = aiReadinessData["Bahamas"];
      else if (countryName === "Brunei Darussalam") score = aiReadinessData["Brunei"];
    }
    
    const tooltipContent = score !== undefined
      ? `${countryName}: ${score.toFixed(4)}`
      : `${countryName}: No data`;
    
    layer.bindTooltip(tooltipContent);
    
    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 2,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.9
        });
        layer.bringToFront();
      },
      mouseout: (e) => {
        geoJsonRef.current.resetStyle(e.target);
      },
      click: (e) => {
        // You could implement additional functionality here
        // when a country is clicked
      }
    });
  };

  const renderLegend = () => {
    return (
      <div className="absolute bottom-5 right-5 bg-white p-3 rounded shadow z-50">
        <div className="text-sm font-bold mb-2">AI Readiness Score</div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 mr-2" style={{ backgroundColor: getColor(0.1) }}></div>
          <span className="text-xs">Low (0.1-0.3)</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 mr-2" style={{ backgroundColor: getColor(0.4) }}></div>
          <span className="text-xs">Medium (0.3-0.5)</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 mr-2" style={{ backgroundColor: getColor(0.6) }}></div>
          <span className="text-xs">High (0.5-0.7)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2" style={{ backgroundColor: getColor(0.8) }}></div>
          <span className="text-xs">Very High (0.7-0.9)</span>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading map data...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="relative w-full h-96 md:h-screen">
      {geoJsonData && (
        <MapContainer
          center={[20, 0]}
          zoom={2}
          className="h-full w-full"
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeoJSON
            data={geoJsonData}
            style={countryStyle}
            onEachFeature={onEachFeature}
            ref={geoJsonRef}
          />
          {renderLegend()}
        </MapContainer>
      )}
    </div>
  );
};

export default AIReadinessMap;