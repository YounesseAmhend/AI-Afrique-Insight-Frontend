import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { CategoryResponseDto } from "@/types/categoryType"
import { getCategoryColor } from "@/lib/categoryColors"

type NewsCardProps = {
  title: string
  description: string
  image: string
  category: CategoryResponseDto
  time: string
  url: string

  externalUrl?: string
  size?: "small" | "medium" | "large"
}

export default function NewsCard({ 
  title, 
  description, 
  image, 
  category, 
  time, 
  url, 
  externalUrl,
  size = "medium" 
}: NewsCardProps) {
  const imageHeight = {
    small: "h-[120px]",
    medium: "h-[180px]",
    large: "h-[240px]",
  }

  const titleSize = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg md:text-xl",
  }

  const descriptionSize = {
    small: "text-xs line-clamp-2",
    medium: "text-sm line-clamp-2",
    large: "text-base line-clamp-3",
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 group border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50">
      <Link href={url} className="block">
        <div className={`relative ${imageHeight[size]} overflow-hidden`}>
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <a 
            href={`/category/${category.id}`}
            className="text-xs px-2 py-1 rounded-full"
            style={{ 
              backgroundColor: getCategoryColor(category.name),
              color: '#fff'
            }}
          >
            {category.name}
          </a>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <Link href={url} className="block">
          <h3 className={`font-bold mb-2 ${titleSize[size]} group-hover:text-primary transition-colors cursor-pointer`}>{title}</h3>
        </Link>
        <p className={`text-muted-foreground mb-4 ${descriptionSize[size]}`}>{description}</p>
        {externalUrl && (
          <Link
            href={externalUrl}
            className="text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1 w-fit"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read full story
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
      </CardContent>
    </Card>
  )
}
