"use client";


// import { useEffect, useRef, useState } from 'react';
// import * as am5 from '@amcharts/amcharts5';
// import * as am5map from '@amcharts/amcharts5/map';
// import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
// import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

// // AI Readiness data for countries
// const aiReadinessData = [
//   { id: "AL", name: "Albania", value: 0.5267925411 },
//   { id: "DZ", name: "Algeria", value: 0.3704386652 },
//   { id: "AO", name: "Angola", value: 0.2596592419 },
//   { id: "AR", name: "Argentina", value: 0.473809436 },
//   { id: "AM", name: "Armenia", value: 0.4928866848 },
//   { id: "AU", name: "Australia", value: 0.7271003276 },
//   { id: "AT", name: "Austria", value: 0.7245657593 },
//   { id: "AZ", name: "Azerbaijan", value: 0.4709397778 },
//   { id: "BS", name: "Bahamas", value: 0.4575124606 },
//   { id: "BH", name: "Bahrain", value: 0.5152552128 },
//   { id: "BD", name: "Bangladesh", value: 0.3840644881 },
//   { id: "BB", name: "Barbados", value: 0.5046559796 },
//   { id: "BY", name: "Belarus", value: 0.4707805738 },
//   { id: "BE", name: "Belgium", value: 0.6724778414 },
//   { id: "BZ", name: "Belize", value: 0.4226269051 },
//   { id: "BJ", name: "Benin", value: 0.3631641939 },
//   { id: "BT", name: "Bhutan", value: 0.4419174641 },
//   { id: "BO", name: "Bolivia", value: 0.3766047582 },
//   { id: "BA", name: "Bosnia and Herzegovina", value: 0.427913107 },
//   { id: "BW", name: "Botswana", value: 0.4128481001 },
//   { id: "BR", name: "Brazil", value: 0.5013404191 },
//   { id: "BN", name: "Brunei", value: 0.495252721 },
//   { id: "BG", name: "Bulgaria", value: 0.5772901177 }
// ];

// // Sort data by value for the rankings
// const sortedData = [...aiReadinessData].sort((a, b) => b.value - a.value);

// export default function AIReadinessMap() {
//   const chartRef = useRef(null);
//   const [selectedCountry, setSelectedCountry] = useState(null);
  
//   useEffect(() => {
//     // Dispose of chart when component unmounts
//     return () => {
//       if (chartRef.current) {
//         chartRef.current.dispose();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     // Create root element
//     const root = am5.Root.new("chartdiv");
    
//     // Set themes
//     root.setThemes([am5themes_Animated.new(root)]);
    
//     // Create the map chart
//     const chart = root.container.children.push(
//       am5map.MapChart.new(root, {
//         panX: "translateX",
//         panY: "translateY",
//         projection: am5map.geoMercator(),
//         homeZoomLevel: 1,
//         homeGeoPoint: { longitude: 0, latitude: 0 }
//       })
//     );
    
//     // Create polygon series for countries
//     const polygonSeries = chart.series.push(
//       am5map.MapPolygonSeries.new(root, {
//         geoJSON: am5geodata_worldLow,
//         valueField: "value",
//         calculateAggregates: true,
//         fill: am5.color(0xaaaaaa)
//       })
//     );
    
//     // Configure polygon series
//     polygonSeries.set("heatRules", [{
//       target: polygonSeries.mapPolygons.template,
//       dataField: "value",
//       min: am5.color(0xe5f5e0),
//       max: am5.color(0x31a354),
//       key: "fill"
//     }]);
    
//     // Set data
//     polygonSeries.data.setAll(aiReadinessData);
    
//     // Configure polygon template
//     const polygonTemplate = polygonSeries.mapPolygons.template;
    
//     polygonTemplate.setAll({
//       tooltipText: "{name}: {value}",
//       interactive: true,
//       strokeWidth: 0.5,
//       stroke: am5.color(0xffffff)
//     });
    
//     // Events for interaction
//     polygonTemplate.events.on("pointerover", function(ev) {
//       const country = ev.target.dataItem.dataContext;
//       setSelectedCountry(country);
//       ev.target.set("stroke", am5.color(0x000000));
//       ev.target.set("strokeWidth", 2);
//     });
    
//     polygonTemplate.events.on("pointerout", function(ev) {
//       setSelectedCountry(null);
//       ev.target.set("strokeWidth", 0.5);
//       ev.target.set("stroke", am5.color(0xffffff));
//     });
    
//     // Add heat legend
//     const heatLegend = chart.children.push(
//       am5.HeatLegend.new(root, {
//         orientation: "horizontal",
//         startText: "Low",
//         endText: "High",
//         startValue: 0,
//         endValue: 1,
//         stepCount: 5,
//         width: am5.percent(60),
//         y: am5.percent(95),
//         centerX: am5.percent(50)
//       })
//     );
    
//     heatLegend.startLabel.setAll({
//       fontSize: 12,
//       fill: am5.color(0x000000)
//     });
    
//     heatLegend.endLabel.setAll({
//       fontSize: 12,
//       fill: am5.color(0x000000)
//     });
    
//     // Set the legend gradient colors
//     heatLegend.startText = "Low AI Readiness";
//     heatLegend.endText = "High AI Readiness";
    
//     chartRef.current = root;
    
//     return () => {
//       root.dispose();
//     };
//   }, []);
  
//   // Format value as percentage
//   const formatScore = (value) => {
//     return `${(value * 100).toFixed(1)}%`;
//   };
  
//   return (
//     <div className="flex flex-col md:flex-row w-full h-screen bg-gray-50 p-6 overflow-hidden">
//       <div className="flex-grow md:w-3/4 overflow-hidden rounded-xl shadow-lg bg-white p-4">
//         <h1 className="text-2xl font-bold text-gray-800 mb-2 ml-2">Global AI Readiness Index</h1>
//         <div id="chartdiv" className="w-full h-full min-h-96" />
//       </div>
      
//       <div className="mt-4 md:mt-0 md:ml-6 md:w-1/4 flex flex-col">
//         <div className="bg-white rounded-xl shadow-lg p-4 mb-4 flex-shrink-0">
//           <h2 className="text-lg font-semibold text-gray-800 mb-3">Selected Country</h2>
//           {selectedCountry ? (
//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-bold text-xl text-gray-800">{selectedCountry.name}</h3>
//               <div className="mt-2 flex items-center">
//                 <div className="w-full bg-gray-200 rounded-full h-4">
//                   <div
//                     className="bg-green-600 h-4 rounded-full"
//                     style={{ width: `${selectedCountry.value * 100}%` }}
//                   ></div>
//                 </div>
//                 <span className="ml-2 font-medium text-gray-800">
//                   {formatScore(selectedCountry.value)}
//                 </span>
//               </div>
//             </div>
//           ) : (
//             <p className="text-gray-500 italic">Hover over a country to see details</p>
//           )}
//         </div>
        
//         <div className="bg-white rounded-xl shadow-lg p-4 overflow-y-auto flex-grow">
//           <h2 className="text-lg font-semibold text-gray-800 mb-3">Country Rankings</h2>
//           <div className="space-y-2">
//             {sortedData.map((country, index) => (
//               <div
//                 key={country.id}
//                 className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 <div className="flex items-center">
//                   <span className="w-6 text-right font-semibold text-gray-500">{index + 1}.</span>
//                   <span className="ml-2 text-gray-800">{country.name}</span>
//                 </div>
//                 <span className="font-medium text-gray-700">{formatScore(country.value)}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useRef, useState } from 'react';
// import * as am5 from '@amcharts/amcharts5';
// import * as am5map from '@amcharts/amcharts5/map';
// import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
// import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

// // AI Readiness data for countries
// const aiReadinessData = [
//   { id: "AL", name: "Albania", value: 0.5267925411 },
//   { id: "DZ", name: "Algeria", value: 0.3704386652 },
//   { id: "AO", name: "Angola", value: 0.2596592419 },
//   { id: "AR", name: "Argentina", value: 0.473809436 },
//   { id: "AM", name: "Armenia", value: 0.4928866848 },
//   { id: "AU", name: "Australia", value: 0.7271003276 },
//   { id: "AT", name: "Austria", value: 0.7245657593 },
//   { id: "AZ", name: "Azerbaijan", value: 0.4709397778 },
//   { id: "BS", name: "Bahamas", value: 0.4575124606 },
//   { id: "BH", name: "Bahrain", value: 0.5152552128 },
//   { id: "BD", name: "Bangladesh", value: 0.3840644881 },
//   { id: "BB", name: "Barbados", value: 0.5046559796 },
//   { id: "BY", name: "Belarus", value: 0.4707805738 },
//   { id: "BE", name: "Belgium", value: 0.6724778414 },
//   { id: "BZ", name: "Belize", value: 0.4226269051 },
//   { id: "BJ", name: "Benin", value: 0.3631641939 },
//   { id: "BT", name: "Bhutan", value: 0.4419174641 },
//   { id: "BO", name: "Bolivia", value: 0.3766047582 },
//   { id: "BA", name: "Bosnia and Herzegovina", value: 0.427913107 },
//   { id: "BW", name: "Botswana", value: 0.4128481001 },
//   { id: "BR", name: "Brazil", value: 0.5013404191 },
//   { id: "BN", name: "Brunei", value: 0.495252721 },
//   { id: "BG", name: "Bulgaria", value: 0.5772901177 }
// ];

// // Sort data by value for the rankings
// const sortedData = [...aiReadinessData].sort((a, b) => b.value - a.value);

// // Color scale for the map
// const colorScale = [
//   { threshold: 0.2, color: "#edf8e9" },
//   { threshold: 0.3, color: "#c7e9c0" },
//   { threshold: 0.4, color: "#a1d99b" },
//   { threshold: 0.5, color: "#74c476" },
//   { threshold: 0.6, color: "#41ab5d" },
//   { threshold: 0.7, color: "#238b45" },
//   { threshold: 0.8, color: "#005a32" }
// ];

// // Separate component for the color scale legend
// const ColorScale = () => {
//   return (
//     <div className="flex flex-col items-center w-full mt-4 mb-6">
//       <h3 className="text-lg font-medium text-gray-700 mb-2">AI Readiness Index Scale</h3>
//       <div className="flex items-center w-full max-w-2xl">
//         <span className="text-xs font-medium mr-2">0%</span>
//         <div className="flex-grow flex h-6 rounded-md overflow-hidden">
//           {colorScale.map((item, index) => (
//             <div
//               key={index}
//               className="flex-grow h-full flex items-center justify-center text-xs text-white font-medium"
//               style={{ backgroundColor: item.color }}
//             >
//               {(item.threshold * 100).toFixed(0)}%
//             </div>
//           ))}
//         </div>
//         <span className="text-xs font-medium ml-2">100%</span>
//       </div>
//     </div>
//   );
// };

// // Separate component for the country rankings
// const CountryRankings = ({ selectedCountry }) => {
//   // Format value as percentage
//   const formatScore = (value) => {
//     return `${(value * 100).toFixed(1)}%`;
//   };
  
//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6 overflow-y-auto h-full">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">Country Rankings</h2>
//       <div className="space-y-2">
//         {sortedData.map((country, index) => (
//           <div
//             key={country.id}
//             className={`flex items-center justify-between py-2 px-4 rounded-lg transition-colors ${
//               selectedCountry && selectedCountry.id === country.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
//             }`}
//           >
//             <div className="flex items-center">
//               <span className="w-8 text-right font-semibold text-gray-500">{index + 1}.</span>
//               <span className="ml-3 text-gray-800 font-medium">{country.name}</span>
//             </div>
//             <div className="flex items-center">
//               <div className="w-16 h-3 rounded-full mr-2" style={{
//                 backgroundColor: colorScale.find(item => item.threshold > country.value)?.color || colorScale[colorScale.length-1].color
//               }}></div>
//               <span className="font-medium text-gray-700">{formatScore(country.value)}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Separate component for the country detail
// const CountryDetail = ({ country }) => {
//   const formatScore = (value) => {
//     return `${(value * 100).toFixed(1)}%`;
//   };
  
//   if (!country) {
//     return (
//       <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-2">Country Details</h2>
//         <p className="text-gray-500">Click on a country to view details</p>
//       </div>
//     );
//   }
  
//   // Find rank of the selected country
//   const rank = sortedData.findIndex(item => item.id === country.id) + 1;
  
//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">Country Details</h2>
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="font-bold text-2xl text-gray-800">{country.name}</h3>
//         <div className="bg-gray-100 rounded-lg px-3 py-1">
//           <span className="font-semibold text-gray-600">Rank: </span>
//           <span className="font-bold text-gray-800">{rank}</span>
//           <span className="text-gray-500 text-sm"> of {sortedData.length}</span>
//         </div>
//       </div>
//       <div className="mb-4">
//         <div className="flex justify-between mb-1">
//           <span className="font-medium text-gray-700">AI Readiness Score:</span>
//           <span className="font-bold text-gray-800">{formatScore(country.value)}</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
//           <div
//             className="h-4 rounded-full"
//             style={{
//               width: `${country.value * 100}%`,
//               backgroundColor: colorScale.find(item => item.threshold > country.value)?.color || colorScale[colorScale.length-1].color
//             }}
//           ></div>
//         </div>
//       </div>
//       <div className="bg-gray-50 rounded-lg p-4">
//         <h4 className="font-medium text-gray-700 mb-2">Comparison</h4>
//         <div className="space-y-2 text-sm">
//           <div className="flex justify-between">
//             <span>Global Average:</span>
//             <span className="font-medium">{formatScore(aiReadinessData.reduce((sum, country) => sum + country.value, 0) / aiReadinessData.length)}</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Top Country:</span>
//             <span className="font-medium">{sortedData[0].name} ({formatScore(sortedData[0].value)})</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function AIReadinessMap() {
//   const chartRef = useRef(null);
//   const [selectedCountry, setSelectedCountry] = useState(null);
  
//   useEffect(() => {
//     // Create root element
//     const root = am5.Root.new("chartdiv");
    
//     // Set themes
//     root.setThemes([am5themes_Animated.new(root)]);
    
//     // Create the map chart
//     const chart = root.container.children.push(
//       am5map.MapChart.new(root, {
//         panX: "translateX",
//         panY: "translateY",
//         projection: am5map.geoMercator(),
//         homeZoomLevel: 1,
//         homeGeoPoint: { longitude: 0, latitude: 5 }
//       })
//     );
    
//     // Create polygon series for countries
//     const polygonSeries = chart.series.push(
//       am5map.MapPolygonSeries.new(root, {
//         geoJSON: am5geodata_worldLow,
//         valueField: "value",
//         calculateAggregates: true,
//         fill: am5.color(0xEEEEEE)
//       })
//     );
    
//     // Set up the custom color logic for the map
//     const polygonTemplate = polygonSeries.mapPolygons.template;
    
//     // Set data with custom color application
//     const processedData = aiReadinessData.map(country => {
//       // Find the appropriate color scale item
//       const scaleItem = colorScale.find(item => item.threshold > country.value) || colorScale[colorScale.length-1];
//       return {
//         ...country,
//         // Convert hex to amCharts color
//         fill: am5.color(scaleItem.color)
//       };
//     });
    
//     polygonSeries.data.setAll(processedData);
    
//     // Configure polygon template
//     polygonTemplate.setAll({
//       tooltipText: "{name}",
//       interactive: true,
//       strokeWidth: 0.5,
//       stroke: am5.color(0xFFFFFF)
//     });
    
//     // Events for interaction - now using click
//     polygonTemplate.events.on("click", function(ev) {
//       const country = ev.target.dataItem.dataContext;
//       setSelectedCountry(country);
      
//       // Reset all countries' stroke
//       polygonSeries.mapPolygons.each(function(polygon) {
//         polygon.set("stroke", am5.color(0xFFFFFF));
//         polygon.set("strokeWidth", 0.5);
//       });
      
//       // Highlight selected country
//       ev.target.set("stroke", am5.color(0x000000));
//       ev.target.set("strokeWidth", 2);
//     });
    
//     // Add zoom control
//     chart.set("zoomControl", am5map.ZoomControl.new(root, {
//       x: 10,
//       y: 10,
//       centerX: 0,
//       centerY: 0
//     }));
    
//     chartRef.current = root;
    
//     return () => {
//       root.dispose();
//     };
//   }, []);
  
//   return (
//     <div className="flex flex-col w-full h-screen bg-gray-50 p-6 overflow-hidden">
//       {/* Main container */}
//       <div className="flex flex-col md:flex-row w-full h-full gap-6">
//         {/* Left column - Map and Scale */}
//         <div className="flex flex-col w-full md:w-2/3 h-full">
//           {/* Map container */}
//           <div className="flex-grow flex flex-col bg-white rounded-xl shadow-lg p-6 overflow-hidden">
//             <h1 className="text-2xl font-bold text-gray-800 mb-2">Global AI Readiness Index</h1>
//             <p className="text-gray-600 mb-4">Click on a country to view detailed information</p>
//             <div id="chartdiv" className="w-full flex-grow min-h-96" />
//           </div>
          
//           {/* Scale container - separate component */}
//           <div className="bg-white rounded-xl shadow-lg p-4 mt-6">
//             <ColorScale />
//           </div>
//         </div>
        
//         {/* Right column - Country details and rankings */}
//         <div className="flex flex-col w-full md:w-1/3 h-full">
//           {/* Country detail - separate component */}
//           <CountryDetail country={selectedCountry} />
          
//           {/* Rankings - separate component */}
//           <div className="flex-grow">
//             <CountryRankings selectedCountry={selectedCountry} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useRef, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import { AIReadinessCountryData, MapChartDataItem } from '@/types/aiReadiness';
import { aiReadinessDataArray, getColorByValue } from '@/data/aiReadinessData'; // Adjust path

import ColorScaleLegend from './ai_readiness/ColorScaleLegend'; // Adjust path
import CountryRankings from './ai_readiness/CountryRankings';   // Adjust path
import CountryDetail from './ai_readiness/CountryDetail';     // Adjust path

const AIReadinessMap: React.FC = () => {
  const chartDivRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<am5.Root | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<AIReadinessCountryData | null>(null);
  const selectedPolygonRef = useRef<am5map.MapPolygon | null>(null);


  useEffect(() => {
    if (!chartDivRef.current) {
      return;
    }

    // Dispose previous root if it exists
    if (rootRef.current) {
      rootRef.current.dispose();
    }

    const root = am5.Root.new(chartDivRef.current);
    rootRef.current = root;

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        projection: am5map.geoMercator(),
        homeZoomLevel: 1,
        homeGeoPoint: { longitude: 0, latitude: 20 }, // Adjusted for better initial view
      })
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        valueField: "value", // For potential use with heat rules, though we use adapter now
        exclude: ["AQ"], // Exclude Antarctica
      })
    );

    // Prepare data for the series with direct fill for custom color scale
    const processedMapData: MapChartDataItem[] = aiReadinessDataArray.map(country => ({
      ...country,
      // The fill will be set by the adapter, but you could pre-calculate here if not using adapter
    }));
    polygonSeries.data.setAll(processedMapData);


    const polygonTemplate = polygonSeries.mapPolygons.template;

    polygonTemplate.setAll({
      tooltipText: "{name}: {value}", // Shows name and original value on hover
      interactive: true,
      strokeWidth: 0.5,
      stroke: am5.color(0xffffff), // White borders
      templateField: "polygonSettings" // Allows custom settings per polygon if needed
    });

    // Adapter for custom fill color based on value
    polygonTemplate.adapters.add("fill", (fill, target) => {
      const dataContext = target.dataItem?.dataContext as MapChartDataItem | undefined;
      if (dataContext?.value !== undefined) {
        return am5.color(getColorByValue(dataContext.value));
      }
      return am5.color(0xCCCCCC); // Default fill for countries with no data
    });

    // Hover effect
    polygonTemplate.states.create("hover", {
      fillOpacity: 0.7, // Slightly change opacity or use a different fill
       strokeWidth: 1,
       stroke: am5.color(0xb0b0b0)
    });


    // Click event for selection
    polygonTemplate.events.on("click", (ev) => {
      const clickedPolygon = ev.target as am5map.MapPolygon;
      const dataContext = clickedPolygon.dataItem?.dataContext as AIReadinessCountryData | undefined;

      if (dataContext) {
        setSelectedCountry(dataContext);

        // Reset previous selected polygon's highlight (if any)
        if (selectedPolygonRef.current && selectedPolygonRef.current !== clickedPolygon) {
          selectedPolygonRef.current.set("stroke", am5.color(0xffffff));
          selectedPolygonRef.current.set("strokeWidth", 0.5);
        }

        // Highlight newly selected polygon
        clickedPolygon.set("stroke", am5.color(0x3B82F6)); // Tailwind blue-500
        clickedPolygon.set("strokeWidth", 2);
        selectedPolygonRef.current = clickedPolygon;

         // Optionally, zoom to the country
        // chart.zoomToDataItem(clickedPolygon.dataItem as am5.DataItem<am5map.IMapPolygonSeriesDataItem>);

      }
    });


    chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

    return () => {
      if (rootRef.current) {
        rootRef.current.dispose();
        rootRef.current = null;
      }
    };
  }, []); // Empty dependency array: runs once on mount

  const handleSelectCountryFromList = (country: AIReadinessCountryData | null) => {
      setSelectedCountry(country);

      if (rootRef.current) { // Ensure chart is initialized
          const chart = rootRef.current.container.getChildAt(0) as am5map.MapChart | undefined;
          const series = chart?.series.getIndex(0) as am5map.MapPolygonSeries | undefined;

          // Reset previous highlight
          if (selectedPolygonRef.current) {
              selectedPolygonRef.current.set("stroke", am5.color(0xffffff));
              selectedPolygonRef.current.set("strokeWidth", 0.5);
              selectedPolygonRef.current = null;
          }

          if (country && series) {
              series.mapPolygons.each((polygon) => {
                  const dataItem = polygon.dataItem?.dataContext as AIReadinessCountryData | undefined;
                  if (dataItem?.id === country.id) {
                      polygon.set("stroke", am5.color(0x3B82F6)); // Tailwind blue-500
                      polygon.set("strokeWidth", 2);
                      selectedPolygonRef.current = polygon;
                      // chart?.zoomToDataItem(polygon.dataItem as am5.DataItem<am5map.IMapPolygonSeriesDataItem>);
                      return; // Exit early
                  }
              });
          }
      }
  };


  return (
    <div className="flex flex-col w-full h-screen bg-gray-100 p-4 md:p-6 overflow-hidden">
      <div className="flex flex-col md:flex-row w-full h-full gap-4 md:gap-6">
        {/* Left column - Map and Scale */}
        <div className="flex flex-col w-full md:w-2/3 h-full md:max-h-full">
          <div className="flex-grow flex flex-col bg-white rounded-xl shadow-lg p-4 md:p-6 overflow-hidden">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">Global AI Readiness Index</h1>
            <p className="text-sm text-gray-600 mb-3 md:mb-4">Click on a country or list item for details.</p>
            <div ref={chartDivRef} id="chartdiv" className="w-full flex-grow min-h-[300px] md:min-h-[400px]" />
          </div>
          <div className="bg-white rounded-xl shadow-lg p-2 md:p-4 mt-4 md:mt-6">
            <ColorScaleLegend />
          </div>
        </div>

        {/* Right column - Country details and rankings */}
        <div className="flex flex-col w-full md:w-1/3 h-full md:max-h-full overflow-hidden">
          <CountryDetail country={selectedCountry} />
          <div className="flex-grow overflow-hidden"> {/* Ensure ranking list takes remaining space and scrolls */}
            <CountryRankings selectedCountry={selectedCountry} onCountrySelect={handleSelectCountryFromList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIReadinessMap;