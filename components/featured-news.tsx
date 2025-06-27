"use client";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTrendingNews } from "@/hooks/useNewsQuery";
import { getCategoryColor } from "@/lib/categoryColors";

export default function FeaturedNews() {
  const { data: trendingNews, isLoading, isError } = useGetTrendingNews();

  function formatDate(dateString: string) {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Unknown date";
    }
  }

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Top Stories</h2>
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 lg:col-span-2 overflow-hidden group border border-gray-200 dark:border-gray-800">
            <div className="relative h-[400px] overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </Card>
          <div className="col-span-1 space-y-6">
            {[1, 2].map((_, index) => (
              <Card key={index} className="overflow-hidden group border border-gray-200 dark:border-gray-800">
                <div className="relative h-[180px] overflow-hidden">
                  <Skeleton className="w-full h-full" />
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !trendingNews || trendingNews.length < 3) {
    return null;
  }

  const [mainStory, ...secondaryStories] = trendingNews;

  return (
      <section className='space-y-6'>
          <div className='flex items-center justify-between'>
              <h2 className='text-2xl font-bold text-foreground'>
                  Top Stories
              </h2>
              <Link
                  href='/news'
                  className='text-sm font-medium text-primary hover:underline'
              >
                  View all news
              </Link>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
              <Card className='col-span-1 lg:col-span-2 overflow-hidden group border border-gray-200 dark:border-gray-800'>
                  <a href={"news/" + mainStory.id} className='block'>
                      <div className='relative h-[400px] overflow-hidden'>
                          <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10' />
                          <img
                              src={mainStory.imageUrl || "/placeholder.svg"}
                              alt={mainStory.title}
                              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                          />
                      </div>
                      <div className='p-4 space-y-3'>
                          <div className='flex items-center gap-2'>
                              <a
                                  href={`/category/${mainStory.category.id}`}
                                  className='text-xs px-2 py-1 rounded-full'
                                  style={{
                                      backgroundColor: getCategoryColor(
                                          mainStory.category.name,
                                      ),
                                      color: "#fff",
                                  }}
                              >
                                  {mainStory.category.name}
                              </a>
                              <span className='text-xs opacity-75'>
                                  {formatDate(mainStory.postDate)}
                              </span>
                          </div>
                          <h3 className='text-xl md:text-2xl font-bold'>
                              {mainStory.title}
                          </h3>
                          <p className='text-sm opacity-90 line-clamp-2'>
                              {(() => {
                                  const tempDiv = document.createElement("div");
                                  tempDiv.innerHTML = mainStory.body;
                                  return (
                                      tempDiv.textContent ||
                                      tempDiv.innerText ||
                                      ""
                                  );
                              })()}
                          </p>
                          <Link
                              href={mainStory.url}
                              className='text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1 w-fit'
                          >
                              Read full story
                              <ArrowUpRight className='h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                          </Link>
                      </div>
                  </a>
              </Card>
              <div className='col-span-1 space-y-6'>
                  {secondaryStories.slice(0, 2).map((news, index) => (
                      <Card
                          key={index}
                          className='overflow-hidden group border border-gray-200 dark:border-gray-800'
                      >
                          <div className='relative h-[180px] overflow-hidden'>
                              <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10' />
                              <img
                                  src={news.imageUrl || "/placeholder.svg"}
                                  alt={news.title}
                                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                              />
                          </div>
                          <div className='p-4 space-y-3'>
                              <div className='flex items-center justify-between'>
                                  <a
                                      href={`/category/${news.category.id}`}
                                      className='text-xs px-2 py-1 rounded-full'
                                      style={{
                                          backgroundColor: getCategoryColor(
                                              news.category.name,
                                          ),
                                          color: "#fff",
                                      }}
                                  >
                                      {news.category.name}
                                  </a>
                                  <span className='text-xs opacity-75'>
                                      {formatDate(news.postDate)}
                                  </span>
                              </div>
                              <a href={"news/" + news.id}>
                                  <h3 className='text-base font-bold'>
                                      {news.title}
                                  </h3>
                                  <p className='text-sm opacity-90 line-clamp-2'>
                                      {(() => {
                                          const tempDiv =
                                              document.createElement("div");
                                          tempDiv.innerHTML = news.body;
                                          return (
                                              tempDiv.textContent ||
                                              tempDiv.innerText ||
                                              ""
                                          );
                                      })()}
                                  </p>
                              </a>
                              <Link
                                  href={news.url}
                                  className='text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1 w-fit'
                              >
                                  Read full story
                                  <ArrowUpRight className='h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                              </Link>
                          </div>
                      </Card>
                  ))}
              </div>
          </div>
      </section>
  );
}