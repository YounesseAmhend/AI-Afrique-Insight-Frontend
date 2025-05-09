"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Building2, LineChart } from "lucide-react"
import Link from "next/link"

type Company = {
  name: string
  logo: string
  description: string
  funding: string
  region: string
  category: string
  growth: string
  url: string
}

export default function TopCompanies() {
  const [region, setRegion] = useState("all")

  const companies: Company[] = [
    {
      name: "NeuralSphere",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Developing next-generation neural interfaces for direct brain-computer interaction",
      funding: "$245M",
      region: "north-america",
      category: "Neural Tech",
      growth: "+156%",
      url: "/companies/neuralsphere",
    },
    {
      name: "QuantumAI",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Quantum computing solutions for complex AI model training and optimization",
      funding: "$189M",
      region: "europe",
      category: "Quantum AI",
      growth: "+92%",
      url: "/companies/quantumai",
    },
    {
      name: "SynthBio",
      logo: "/placeholder.svg?height=80&width=80",
      description: "AI-powered synthetic biology platform accelerating drug discovery and development",
      funding: "$210M",
      region: "asia",
      category: "BioTech AI",
      growth: "+118%",
      url: "/companies/synthbio",
    },
    {
      name: "ClimateAI",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Climate modeling and prediction using advanced machine learning algorithms",
      funding: "$87M",
      region: "europe",
      category: "Climate Tech",
      growth: "+74%",
      url: "/companies/climateai",
    },
    {
      name: "AfriLearn",
      logo: "/placeholder.svg?height=80&width=80",
      description: "AI-powered educational platform tailored for African educational systems",
      funding: "$42M",
      region: "africa",
      category: "EdTech",
      growth: "+205%",
      url: "/companies/afrilearn",
    },
    {
      name: "AgroIntel",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Precision agriculture solutions using computer vision and predictive analytics",
      funding: "$65M",
      region: "south-america",
      category: "AgTech",
      growth: "+88%",
      url: "/companies/agrointel",
    },
  ]

  const filteredCompanies = region === "all" ? companies : companies.filter((company) => company.region === region)

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          Top AI Companies
        </h2>
        <Link href="/companies" className="text-sm font-medium text-primary hover:underline">
          View all companies
        </Link>
      </div>

      <Tabs defaultValue="all" onValueChange={setRegion} className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="mb-6 h-10">
            <TabsTrigger
              value="all"
              className="px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              All Regions
            </TabsTrigger>
            <TabsTrigger
              value="north-america"
              className="px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              North America
            </TabsTrigger>
            <TabsTrigger
              value="europe"
              className="px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Europe
            </TabsTrigger>
            <TabsTrigger
              value="asia"
              className="px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Asia
            </TabsTrigger>
            <TabsTrigger
              value="africa"
              className="px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Africa
            </TabsTrigger>
            <TabsTrigger
              value="south-america"
              className="px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              South America
            </TabsTrigger>
            <TabsTrigger
              value="oceania"
              className="px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Oceania
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={region} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-all hover:border-primary/50 dark:hover:border-primary/50"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-md bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                      <img
                        src={company.logo || "/placeholder.svg"}
                        alt={`${company.name} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">{company.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {company.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{company.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4">
                          <div>
                            <span className="text-xs text-muted-foreground">Funding</span>
                            <p className="font-medium">{company.funding}</p>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">Growth</span>
                            <p className="font-medium text-green-600 dark:text-green-500 flex items-center">
                              {company.growth}
                              <LineChart className="h-3 w-3 ml-1" />
                            </p>
                          </div>
                        </div>
                        <Link
                          href={company.url}
                          className="text-primary hover:text-primary/80 transition-colors p-2 rounded-full hover:bg-primary/10"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No companies found</h3>
              <p className="text-muted-foreground">There are no AI companies listed for this region yet.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  )
}
