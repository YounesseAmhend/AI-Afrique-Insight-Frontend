"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

type RegionData = {
  name: string
  startups: number
  funding: string
  topSector: string
  growth: string
}

export default function WorldMap() {
  const [hoveredRegion, setHoveredRegion] = useState<RegionData | null>(null)

  const regions: Record<string, RegionData> = {
    northAmerica: {
      name: "North America",
      startups: 3245,
      funding: "$142B",
      topSector: "Generative AI",
      growth: "+24% YoY",
    },
    europe: {
      name: "Europe",
      startups: 1876,
      funding: "$68B",
      topSector: "AI Infrastructure",
      growth: "+18% YoY",
    },
    asia: {
      name: "Asia",
      startups: 2543,
      funding: "$98B",
      topSector: "Computer Vision",
      growth: "+32% YoY",
    },
    africa: {
      name: "Africa",
      startups: 412,
      funding: "$8.5B",
      topSector: "FinTech AI",
      growth: "+45% YoY",
    },
    southAmerica: {
      name: "South America",
      startups: 587,
      funding: "$12B",
      topSector: "AgTech AI",
      growth: "+28% YoY",
    },
    oceania: {
      name: "Oceania",
      startups: 324,
      funding: "$9.2B",
      topSector: "Healthcare AI",
      growth: "+15% YoY",
    },
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center">
      <div className="w-full md:w-2/3 relative">
        <svg viewBox="0 0 1000 500" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* North America */}
          <path
            d="M150,120 C170,100 210,80 250,70 C290,60 330,90 350,120 C370,150 360,200 340,220 C320,240 280,260 240,250 C200,240 180,220 160,190 C140,160 130,140 150,120 Z"
            fill={hoveredRegion?.name === "North America" ? "#3b82f6" : "#475569"}
            stroke="#1e293b"
            strokeWidth="2"
            onMouseEnter={() => setHoveredRegion(regions.northAmerica)}
            onMouseLeave={() => setHoveredRegion(null)}
            className="cursor-pointer transition-colors duration-200"
          />
          <text x="240" y="170" fill="white" fontSize="14" textAnchor="middle">
            N. America
          </text>

          {/* Europe */}
          <path
            d="M450,100 C470,90 500,85 520,90 C540,95 550,110 560,130 C570,150 565,170 550,185 C535,200 510,205 490,200 C470,195 455,180 450,160 C445,140 440,110 450,100 Z"
            fill={hoveredRegion?.name === "Europe" ? "#3b82f6" : "#475569"}
            stroke="#1e293b"
            strokeWidth="2"
            onMouseEnter={() => setHoveredRegion(regions.europe)}
            onMouseLeave={() => setHoveredRegion(null)}
            className="cursor-pointer transition-colors duration-200"
          />
          <text x="505" y="150" fill="white" fontSize="14" textAnchor="middle">
            Europe
          </text>

          {/* Asia */}
          <path
            d="M550,120 C580,100 620,90 660,85 C700,80 730,90 760,110 C790,130 800,160 790,190 C780,220 750,240 710,245 C670,250 630,240 600,220 C570,200 550,170 550,140 C550,110 550,120 550,120 Z"
            fill={hoveredRegion?.name === "Asia" ? "#3b82f6" : "#475569"}
            stroke="#1e293b"
            strokeWidth="2"
            onMouseEnter={() => setHoveredRegion(regions.asia)}
            onMouseLeave={() => setHoveredRegion(null)}
            className="cursor-pointer transition-colors duration-200"
          />
          <text x="670" y="170" fill="white" fontSize="14" textAnchor="middle">
            Asia
          </text>

          {/* Africa */}
          <path
            d="M450,230 C470,210 500,200 530,205 C560,210 580,230 590,260 C600,290 590,320 570,340 C550,360 520,370 490,365 C460,360 440,340 430,310 C420,280 430,250 450,230 Z"
            fill={hoveredRegion?.name === "Africa" ? "#3b82f6" : "#475569"}
            stroke="#1e293b"
            strokeWidth="2"
            onMouseEnter={() => setHoveredRegion(regions.africa)}
            onMouseLeave={() => setHoveredRegion(null)}
            className="cursor-pointer transition-colors duration-200"
          />
          <text x="510" y="290" fill="white" fontSize="14" textAnchor="middle">
            Africa
          </text>

          {/* South America */}
          <path
            d="M280,250 C300,230 330,225 350,235 C370,245 380,270 380,300 C380,330 370,360 350,380 C330,400 300,405 280,395 C260,385 250,360 250,330 C250,300 260,270 280,250 Z"
            fill={hoveredRegion?.name === "South America" ? "#3b82f6" : "#475569"}
            stroke="#1e293b"
            strokeWidth="2"
            onMouseEnter={() => setHoveredRegion(regions.southAmerica)}
            onMouseLeave={() => setHoveredRegion(null)}
            className="cursor-pointer transition-colors duration-200"
          />
          <text x="315" y="320" fill="white" fontSize="14" textAnchor="middle">
            S. America
          </text>

          {/* Oceania */}
          <path
            d="M750,310 C765,300 785,295 800,300 C815,305 825,320 830,340 C835,360 830,380 820,395 C810,410 790,415 775,410 C760,405 750,390 745,370 C740,350 735,320 750,310 Z"
            fill={hoveredRegion?.name === "Oceania" ? "#3b82f6" : "#475569"}
            stroke="#1e293b"
            strokeWidth="2"
            onMouseEnter={() => setHoveredRegion(regions.oceania)}
            onMouseLeave={() => setHoveredRegion(null)}
            className="cursor-pointer transition-colors duration-200"
          />
          <text x="785" y="355" fill="white" fontSize="14" textAnchor="middle">
            Oceania
          </text>
        </svg>
      </div>

      <div className="w-full md:w-1/3">
        {hoveredRegion ? (
          <Card className="p-6 bg-gray-800 border-gray-700 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-white">{hoveredRegion.name}</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">AI Startups</span>
                <span className="font-medium text-white">{hoveredRegion.startups.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Total Funding</span>
                <span className="font-medium text-white">{hoveredRegion.funding}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Top AI Sector</span>
                <span className="font-medium text-white">{hoveredRegion.topSector}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Growth Rate</span>
                <span className="font-medium text-green-500">{hoveredRegion.growth}</span>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-6 bg-gray-800 border-gray-700 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-white">Global AI Statistics</h3>
            <p className="text-gray-400 mb-6">Hover over a region to see detailed AI statistics.</p>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Total AI Startups</span>
                <span className="font-medium text-white">8,987</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Global AI Funding</span>
                <span className="font-medium text-white">$337.7B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Fastest Growing Region</span>
                <span className="font-medium text-white">Africa (+45%)</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
