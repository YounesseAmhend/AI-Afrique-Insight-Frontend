"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Building2, LineChart, TrendingUp, DollarSign } from "lucide-react"
import Link from "next/link"
import { fetchCompanies } from "@/apis/companyApi"

type Company = {
  name: string
  logo: string
  description: string
  funding: string
  region: string
  category: string
  growth: string
  url: string
  image: string
}

export default function TopCompanies() {
  const [region, setRegion] = useState("all")
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchCompanies()
      .then((data) => {
        setCompanies(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load companies.")
        setLoading(false)
      })
  }, [])

  const filteredCompanies = region === "all"
    ? companies
    : companies.filter((company) => company.region === region)
  const displayedCompanies = filteredCompanies.slice(0, 6)

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Top AI Companies
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Leading innovators in artificial intelligence</p>
          </div>
        </div>
        <Link
            href='/news'
            className='text-sm font-medium text-primary hover:underline flex items-center gap-1 group relative overflow-hidden px-4 py-2 rounded-lg hover:bg-primary/10 transition-all duration-300'
        >
            <span className="relative z-10">View all </span>
            <ArrowUpRight className='h-3 w-3 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110' />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </Link>
      </div>

      <Tabs defaultValue="all" onValueChange={setRegion} className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="mb-8 h-12 p-1 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <TabsTrigger
              value="all"
              className="px-6 py-2 rounded-lg font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white"
            >
              All Regions
            </TabsTrigger>
            <TabsTrigger
              value="north-america"
              className="px-6 py-2 rounded-lg font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white"
            >
              North America
            </TabsTrigger>
            <TabsTrigger
              value="europe"
              className="px-6 py-2 rounded-lg font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white"
            >
              Europe
            </TabsTrigger>
            <TabsTrigger
              value="asia"
              className="px-6 py-2 rounded-lg font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white"
            >
              Asia
            </TabsTrigger>
            <TabsTrigger
              value="other"
              className="px-6 py-2 rounded-lg font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white"
            >
              Other
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={region} className="mt-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="animate-spin w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full mb-4"></div>
              <span className="text-lg font-medium text-gray-600 dark:text-gray-400">Loading companies...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
                <Building2 className="h-8 w-8 text-red-500" />
              </div>
              <span className="text-lg font-medium text-red-600 dark:text-red-400">{error}</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedCompanies.map((company, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl hover:shadow-xl hover:shadow-gray-200/20 dark:hover:shadow-gray-900/20 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300/50 dark:hover:border-gray-600/50"
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <CardContent className="relative p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center overflow-hidden border-2 border-white/50 dark:border-gray-600/50 shadow-lg">
                            <img
                              src={company.image || "/placeholder.svg"}
                              alt={`${company.name} logo`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {/* Online indicator */}
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 shadow-sm" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {company.name}
                          </h3>
                          <Badge 
                            variant="secondary" 
                            className="mt-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-0 font-medium text-xs px-3 py-1"
                          >
                            {company.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <Link
                        href={company.url}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 hover:scale-110"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ArrowUpRight className="h-4 w-4 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" />
                      </Link>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 line-clamp-2">
                      {company.description}
                    </p>

                    {/* Metrics */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-gray-50/50 dark:bg-gray-800/30 rounded-xl border border-gray-200/30 dark:border-gray-700/30">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mt-0.5">
                          <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">Funding</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{company.funding}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-gray-50/50 dark:bg-gray-800/30 rounded-xl border border-gray-200/30 dark:border-gray-700/30">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mt-0.5">
                          <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">Growth</p>
                          <p className="text-sm font-bold text-green-600 dark:text-green-400 leading-tight flex items-start gap-1">
                            <span className="flex-1">{company.growth}</span>
                            <LineChart className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && !error && displayedCompanies.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-6">
                <Building2 className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">No companies found</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                There are no AI companies listed for this region yet. Check back soon for updates.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  )
}