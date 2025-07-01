"use client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTrendingNews } from "@/hooks/useNewsQuery";
import { getCategoryColor } from "@/lib/categoryColors";
import { getCategoryIcon } from "@/lib/categoryIcons";
import { ArrowUpRight, Clock, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";

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
            <section className='space-y-6'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-2xl font-bold text-foreground flex items-center gap-2'>
                        <Sparkles className="h-5 w-5 text-primary" />
                        Top Stories
                    </h2>
                    <Skeleton className='h-4 w-24' />
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    <Card className='col-span-1 lg:col-span-2 overflow-hidden group border-0 shadow-lg bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5'>
                        <div className='p-6 space-y-4'>
                            <div className='flex items-center justify-between'>
                                <Skeleton className='h-6 w-24 rounded-full' />
                                <Skeleton className='h-4 w-20' />
                            </div>
                            <Skeleton className='h-8 w-3/4' />
                            <Skeleton className='h-4 w-full' />
                            <Skeleton className='h-4 w-2/3' />
                        </div>
                    </Card>
                    <div className='col-span-1 space-y-6'>
                        {[1, 2].map((_, index) => (
                            <Card
                                key={index}
                                className='overflow-hidden group border-0 shadow-md bg-gradient-to-br from-muted/30 to-muted/10'
                            >
                                <div className='p-4 space-y-3'>
                                    <div className='flex items-center justify-between'>
                                        <Skeleton className='h-5 w-20 rounded-full' />
                                        <Skeleton className='h-4 w-16' />
                                    </div>
                                    <Skeleton className='h-5 w-3/4' />
                                    <Skeleton className='h-4 w-full' />
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
                <h2 className='text-2xl font-bold text-foreground flex items-center gap-2'>
                    <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                    Top Stories
                </h2>
                <Link
                    href='/news'
                    className='text-sm font-medium text-primary hover:underline flex items-center gap-1 group'
                >
                    View all news
                    <ArrowUpRight className='h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                </Link>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Main Story Card */}
                <Card className='col-span-1 lg:col-span-2 overflow-hidden group border-0 shadow-xl bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]'>
                    <a href={"news/" + mainStory.id} className='block'>
                        <div className='p-6 space-y-4'>
                            <div className='flex items-center gap-3'>
                                <div
                                    className='flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm'
                                    style={{
                                        backgroundColor: getCategoryColor(mainStory.category.name),
                                        color: "#fff",
                                    }}
                                >
                                    {(() => {
                                        const IconComponent = getCategoryIcon(mainStory.category.name);
                                        return <IconComponent className="h-3 w-3" />;
                                    })()}
                                    {mainStory.category.name}
                                </div>
                                <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                                    <Clock className='h-3 w-3' />
                                    {formatDate(mainStory.postDate)}
                                </div>
                            </div>
                            
                            <div className='space-y-3'>
                                <h3 className='text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors'>
                                    {mainStory.title}
                                </h3>
                                <p className='text-sm text-muted-foreground line-clamp-3 leading-relaxed'>
                                    {(() => {
                                        const tempDiv = document.createElement("div");
                                        tempDiv.innerHTML = mainStory.body;
                                        return tempDiv.textContent || tempDiv.innerText || "";
                                    })()}
                                </p>
                            </div>

                            <div className='flex items-center justify-between pt-2'>
                                <Link
                                    href={mainStory.url}
                                    className='text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1 w-fit group/link'
                                >
                                    Read full story
                                    <ArrowUpRight className='h-3 w-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5' />
                                </Link>
                                <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                                    <TrendingUp className='h-3 w-3 text-green-500' />
                                    Trending
                                </div>
                            </div>
                        </div>
                    </a>
                </Card>

                {/* Secondary Stories */}
                <div className='col-span-1 space-y-6'>
                    {secondaryStories.slice(0, 2).map((news, index) => (
                        <Card
                            key={index}
                            className='overflow-hidden group border-0 shadow-md bg-gradient-to-br from-muted/30 to-muted/10 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]'
                        >
                            <div className='p-4 space-y-3'>
                                <div className='flex items-center justify-between'>
                                    <div
                                        className='flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shadow-sm'
                                        style={{
                                            backgroundColor: getCategoryColor(news.category.name),
                                            color: "#fff",
                                        }}
                                    >
                                        {(() => {
                                            const IconComponent = getCategoryIcon(news.category.name);
                                            return <IconComponent className="h-3 w-3" />;
                                        })()}
                                        {news.category.name}
                                    </div>
                                    <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                                        <Clock className='h-3 w-3' />
                                        {formatDate(news.postDate)}
                                    </div>
                                </div>
                                
                                <a href={"news/" + news.id} className='block'>
                                    <h3 className='text-base font-bold text-foreground group-hover:text-primary transition-colors mb-2'>
                                        {news.title}
                                    </h3>
                                    <p className='text-sm text-muted-foreground line-clamp-2 leading-relaxed'>
                                        {(() => {
                                            const tempDiv = document.createElement("div");
                                            tempDiv.innerHTML = news.body;
                                            return tempDiv.textContent || tempDiv.innerText || "";
                                        })()}
                                    </p>
                                </a>

                                <div className='flex items-center justify-between pt-1'>
                                    <Link
                                        href={news.url}
                                        className='text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1 w-fit group/link'
                                    >
                                        Read full story
                                        <ArrowUpRight className='h-3 w-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5' />
                                    </Link>
                                    <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                                        <TrendingUp className='h-3 w-3 text-green-500' />
                                        Hot
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
