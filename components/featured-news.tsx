import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function FeaturedNews() {
  const mainStory = {
    title: "OpenAI Unveils GPT-5 with Unprecedented Reasoning Capabilities",
    description:
      "The new model demonstrates human-like problem-solving abilities and can understand complex visual inputs, marking a significant leap in artificial intelligence development.",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Breaking",
    time: "2 hours ago",
    url: "/news/openai-gpt5",
  }

  const secondaryStories = [
    {
      title: "EU Passes Comprehensive AI Regulation Framework",
      description: "New legislation aims to balance innovation with ethical considerations and consumer protection.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Policy",
      time: "5 hours ago",
      url: "/news/eu-ai-regulation",
    },
    {
      title: "AI Startup Funding Reaches Record $42B in Q1",
      description:
        "Investment in artificial intelligence companies continues to surge despite broader tech market corrections.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Business",
      time: "Yesterday",
      url: "/news/ai-funding-q1",
    },
  ]

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Top Stories</h2>
        <Link href="/news" className="text-sm font-medium text-primary hover:underline">
          View all news
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 overflow-hidden group border border-gray-200 dark:border-gray-800 rounded-xl">
          <div className="relative h-[300px] md:h-[400px] overflow-hidden">
            <img
              src={mainStory.image || "/placeholder.svg"}
              alt={mainStory.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="destructive" className="bg-red-600 hover:bg-red-700">
                  {mainStory.category}
                </Badge>
                <span className="text-xs opacity-75">{mainStory.time}</span>
              </div>
              <h3 className="text-xl md:text-3xl font-bold mb-2 text-white">{mainStory.title}</h3>
              <p className="text-sm md:text-base opacity-90 line-clamp-2 md:line-clamp-3 text-gray-100">
                {mainStory.description}
              </p>
              <Link
                href={mainStory.url}
                className="inline-block mt-4 text-sm font-medium hover:underline bg-primary text-primary-foreground px-4 py-2 rounded-md transition-colors"
              >
                Read full story
              </Link>
            </div>
          </div>
        </Card>

        <div className="col-span-1 space-y-6">
          {secondaryStories.map((story, index) => (
            <Card key={index} className="overflow-hidden group border border-gray-200 dark:border-gray-800 rounded-xl">
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="secondary" className="bg-blue-600 hover:bg-blue-700 text-white">
                      {story.category}
                    </Badge>
                    <span className="text-xs opacity-75">{story.time}</span>
                  </div>
                  <h3 className="text-base md:text-lg font-bold mb-1 text-white">{story.title}</h3>
                  <p className="text-xs opacity-90 line-clamp-2 text-gray-100">{story.description}</p>
                  <Link href={story.url} className="inline-block mt-2 text-xs font-medium hover:underline text-primary">
                    Read more
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
