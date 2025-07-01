import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowUpRight, Newspaper, Eye, Calendar, Share2, BookOpen } from "lucide-react"
import { CategoryResponseDto } from "@/types/categoryType"
import { getCategoryColor } from "@/lib/categoryColors"
import { NewsResponseDto } from "@/types/newsType"

type NewsCardProps = {
  description: string
  image: string // unused, but kept for prop compatibility
  category: CategoryResponseDto
  time: string
  url: string
  item: NewsResponseDto
  externalUrl?: string
  size?: "small" | "medium" | "large"
}

export default function NewsCard({ 
  description,
  category, 
  time, 
  url, 
  item,
  externalUrl,
  size = "medium" 
}: NewsCardProps) {
  const titleSize = {
    small: "text-base font-semibold line-clamp-2",
    medium: "text-lg font-bold line-clamp-2",
    large: "text-xl font-extrabold line-clamp-2",
  }

  const descriptionSize = {
    small: "text-xs text-gray-600 dark:text-gray-300 line-clamp-2",
    medium: "text-sm text-gray-600 dark:text-gray-300 line-clamp-2",
    large: "text-base text-gray-600 dark:text-gray-300 line-clamp-2",
  }

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
    return views.toString()
  }

  const categoryColor = getCategoryColor(category.name)

  return (
    <div 
      className="relative group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 w-full h-80 sm:h-96"
      style={{ minWidth: '0' }}
    >
      <Card className="relative w-full h-full flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50 shadow-xl dark:shadow-2xl hover:shadow-2xl transition-all duration-500">
        {/* Animated Background Glow */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${categoryColor}15, transparent 70%)`
          }}
        />
        <CardContent className="relative p-5 flex flex-col gap-2 flex-1 min-h-0">
          {/* Category badge with premium styling */}
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 group-hover:scale-105 mb-2"
            style={{ 
              background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}dd)`,
              color: '#fff'
            }}
          >
            <div className="w-2 h-2 bg-white rounded-full mr-2" />
            {category.name}
          </span>
          {/* Title with premium styling */}
          <Link href={url} className="block">
            <h3 className={`flex items-start gap-2 ${titleSize[size]} mb-2 text-gray-900 dark:text-gray-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300 cursor-pointer leading-tight`}>
              <Newspaper 
                className="w-5 h-5 mt-0.5 flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ color: categoryColor }}
              />
              {item.title}
            </h3>
          </Link>
          {/* Description */}
          <p className={`${descriptionSize[size]} mb-3 leading-relaxed flex-1 overflow-hidden`}>{description}</p>
          {/* Stats Bar */}
          <div className="flex items-center justify-between p-2 mb-3 bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-4">
              {/* Time */}
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-medium">{time}</span>
              </div>
              {/* Views Counter */}
              {item.viewsCount >= 0 && (
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <Eye className="w-4 h-4" />
                  <span className="text-xs font-medium">{formatViews(item.viewsCount)}</span>
                </div>
              )}
            </div>
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-110">
              </button>
              <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-110">
                <BookOpen className="w-3 h-3 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
          {/* External URL Button */}
          {externalUrl && (
            <Link
              href={externalUrl}
              className="group/btn relative w-full inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-white font-semibold text-sm transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}dd)`
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              <span className="relative flex items-center gap-2">
                Read full story
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              </span>
            </Link>
          )}
        </CardContent>
        {/* Subtle border glow on hover */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `0 0 0 1px ${categoryColor}40, 0 0 20px ${categoryColor}20`
          }}
        />
      </Card>
      {/* Floating shadow effect */}
      <div 
        className="absolute inset-0 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-4"
        style={{
          background: `linear-gradient(135deg, ${categoryColor}20, transparent)`,
          filter: 'blur(20px)'
        }}
      />
    </div>
  )
}