"use client"

import { useRef, useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react"
import Link from "next/link"

type TrendingTopic = {
  name: string
  count: number
  change: number
  url: string
}

export default function TrendingTopics() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const trendingTopics: TrendingTopic[] = [
    { name: "Generative AI", count: 15243, change: 28, url: "/topics/generative-ai" },
    { name: "AI Regulation", count: 8765, change: 45, url: "/topics/ai-regulation" },
    { name: "Neural Interfaces", count: 5432, change: 12, url: "/topics/neural-interfaces" },
    { name: "Autonomous Vehicles", count: 7651, change: 8, url: "/topics/autonomous-vehicles" },
    { name: "Healthcare AI", count: 9876, change: 34, url: "/topics/healthcare-ai" },
    { name: "AI Ethics", count: 6543, change: 19, url: "/topics/ai-ethics" },
    { name: "AI Chips", count: 4321, change: 23, url: "/topics/ai-chips" },
    { name: "Computer Vision", count: 5678, change: 15, url: "/topics/computer-vision" },
    { name: "NLP", count: 7890, change: 9, url: "/topics/nlp" },
    { name: "AI in Education", count: 3456, change: 41, url: "/topics/ai-education" },
  ]

  const checkScroll = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScroll)
      // Check initial scroll state
      checkScroll()

      return () => scrollContainer.removeEventListener("scroll", checkScroll)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const { clientWidth } = scrollContainerRef.current
    const scrollAmount = clientWidth * 0.8

    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  const formatCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Trending Topics
        </h2>
        <Link href="/topics" className="text-sm font-medium text-primary hover:underline">
          View all topics
        </Link>
      </div>

      <div className="relative group">
        {canScrollLeft && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-background shadow-md opacity-90 hover:opacity-100"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-1 px-1 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {trendingTopics.map((topic, index) => (
            <Link href={topic.url} key={index} className="min-w-[200px] md:min-w-[220px]">
              <Card className="p-4 hover:shadow-md transition-all hover:border-primary/50 h-full flex flex-col justify-between">
                <h3 className="font-semibold text-foreground/90 mb-2">#{topic.name}</h3>
                <div className="flex justify-between items-end mt-2">
                  <div className="text-sm text-muted-foreground">{formatCount(topic.count)} mentions</div>
                  <div
                    className={`text-sm ${topic.change > 0 ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"} flex items-center`}
                  >
                    {topic.change > 0 ? "+" : ""}
                    {topic.change}%
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {canScrollRight && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-background shadow-md opacity-90 hover:opacity-100"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </section>
  )
}
