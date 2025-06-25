"use client"

import { Badge } from "@/components/ui/badge"
import { useGetNewsById } from "@/hooks/useNewsQuery"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import Head from "next/head"
import { useEffect } from "react"

export default function NewsDetailPage() {
  const params = useParams()
  const newsId = parseInt(params.id as string)

  const { data: news, isLoading, error } = useGetNewsById(newsId)

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return 'Unknown date'
    }
  }
    useEffect(() => {
        if (news) {
            document.title = `${news.title} - News`;
        } else {
            document.title = "Loading...";
        }
    }, [news]);

  return (
    <>
      <Head>
        <title>{news ? `${news.title} - News` : 'Loading...'}</title>
      </Head>
      
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/news"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to news
        </Link>

        {isLoading && (
          <div className="space-y-4 animate-pulse">
            <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-md" />
            <div className="flex gap-4">
              <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-md" />
              <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded-md" />
            </div>
            <div className="h-[400px] w-full bg-gray-200 dark:bg-gray-800 rounded-md mt-6" />
            <div className="space-y-2 mt-6">
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-md" />
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-md" />
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-md" />
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-10">
            <h2 className="text-xl font-bold text-red-500 mb-2">Error Loading Article</h2>
            <p className="text-muted-foreground">Failed to load the article. Please try again later.</p>
          </div>
        )}

        {news && (
          <article className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title}</h1>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge>{news.category.name || 'Uncategorized'}</Badge>
              <span className="text-sm text-muted-foreground">
                {formatDate(news.postDate)}
              </span>
              <span className="text-sm text-muted-foreground">
                By{' '}
                <a className="hover:text-primary hover:underline underline-offset-4 transition-all duration-200" href={"/author/"+news.author!.id}>
                  {news.author!.name}
                </a>
              </span>
            </div>

            {news.imageUrl && (
              <div className="my-6 rounded-lg overflow-hidden">
                <img
                  src={news.imageUrl}
                  alt={news.title}
                  className="w-full object-cover max-h-[500px]"
                />
              </div>
            )}

            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: news.body }}
            />
          </article>
        )}
      </div>
    </>
  )
}
