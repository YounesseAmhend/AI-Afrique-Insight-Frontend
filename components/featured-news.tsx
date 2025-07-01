"use client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTrendingNews } from "@/hooks/useNewsQuery";
import { getCategoryColor } from "@/lib/categoryColors";
import { getCategoryIcon } from "@/lib/categoryIcons";
import { ArrowUpRight, Clock, Brain, Cpu, Network, Database, CircuitBoard, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function FeaturedNews() {
    const { data: trendingNews, isLoading, isError } = useGetTrendingNews();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

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
                        <Brain className="h-5 w-5 text-primary animate-pulse" />
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
        <section className='space-y-6 relative'>
            {/* AI Neural Network Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {/* Neural Network Nodes */}
                <div className="absolute top-10 left-10 w-3 h-3 bg-primary rounded-full animate-ping" style={{animationDelay: '0s'}} />
                <div className="absolute top-20 right-20 w-2 h-2 bg-secondary rounded-full animate-ping" style={{animationDelay: '1s'}} />
                <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping" style={{animationDelay: '2s'}} />
                <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-secondary rounded-full animate-ping" style={{animationDelay: '3s'}} />
                <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-primary rounded-full animate-ping" style={{animationDelay: '4s'}} />
                
                {/* Neural Network Connections */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                    <defs>
                        <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                            <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                        </linearGradient>
                    </defs>
                    <path d="M 50 50 Q 200 100 350 50" stroke="url(#neuralGradient)" strokeWidth="1" fill="none" className="animate-pulse" />
                    <path d="M 350 50 Q 500 100 650 50" stroke="url(#neuralGradient)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '0.5s'}} />
                    <path d="M 50 150 Q 200 200 350 150" stroke="url(#neuralGradient)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '1s'}} />
                    <path d="M 350 150 Q 500 200 650 150" stroke="url(#neuralGradient)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '1.5s'}} />
                </svg>

                {/* Data Flow Particles */}
                <div className="absolute inset-0">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.5}s`,
                                animationDuration: '3s'
                            }}
                        />
                    ))}
                </div>

                {/* AI Circuit Patterns */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5">
                    <div className="absolute top-10 left-10 w-20 h-20 border border-primary/30 rounded-lg animate-spin" style={{animationDuration: '20s'}} />
                    <div className="absolute bottom-10 right-10 w-16 h-16 border border-secondary/30 rounded-lg animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}} />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-primary/20 rounded-full animate-spin" style={{animationDuration: '25s'}} />
                </div>
            </div>

            <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-foreground flex items-center gap-2 group'>
                    <div className="relative">
                        <Brain className="h-5 w-5 text-primary animate-pulse" />
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm animate-ping" />
                        {/* AI Processing Dots */}
                        <div className="absolute -top-1 -right-1 flex gap-0.5">
                            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0s'}} />
                            <div className="w-1 h-1 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}} />
                            <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}} />
                        </div>
                    </div>
                    <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent animate-pulse">
                        AI-Powered Top Stories
                    </span>
                    <div className="flex gap-1">
                        <Cpu className="h-3 w-3 text-blue-500 animate-bounce" style={{animationDelay: '0s'}} />
                        <Network className="h-3 w-3 text-green-500 animate-bounce" style={{animationDelay: '0.2s'}} />
                        <Database className="h-3 w-3 text-purple-500 animate-bounce" style={{animationDelay: '0.4s'}} />
                    </div>
                </h2>
                <Link
                    href='/news'
                    className='text-sm font-medium text-primary hover:underline flex items-center gap-1 group relative overflow-hidden px-4 py-2 rounded-lg hover:bg-primary/10 transition-all duration-300'
                >
                    <span className="relative z-10">View all news</span>
                    <ArrowUpRight className='h-3 w-3 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110' />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Main Story Card with Sophisticated AI Effects */}
                <Card 
                    ref={cardRef}
                    className='col-span-1 lg:col-span-2 overflow-hidden group border-0 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-700 relative'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        transform: isHovered ? `perspective(1200px) rotateX(${(mousePosition.y - (cardRef.current?.getBoundingClientRect().top || 0)) * 0.005}deg) rotateY(${(mousePosition.x - (cardRef.current?.getBoundingClientRect().left || 0)) * 0.005}deg) scale(1.01)` : 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)',
                        transition: isHovered ? 'none' : 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    {/* Sophisticated Gradient Border */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Elegant Corner Accents */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/30 opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-1 -translate-y-1" />
                    <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-secondary/30 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-x-1 -translate-y-1" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-secondary/30 opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-1 translate-y-1" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/30 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-x-1 translate-y-1" />

                    {/* Subtle Data Flow Lines */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                        <svg className="w-full h-full">
                            <defs>
                                <linearGradient id="sophisticatedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.6" />
                                </linearGradient>
                            </defs>
                            <path d="M 0 30 L 100 30" stroke="url(#sophisticatedGradient)" strokeWidth="0.5" fill="none" className="animate-pulse" style={{animationDuration: '4s'}} />
                            <path d="M 0 70 L 100 70" stroke="url(#sophisticatedGradient)" strokeWidth="0.5" fill="none" className="animate-pulse" style={{animationDuration: '4s', animationDelay: '1s'}} />
                            <path d="M 0 110 L 100 110" stroke="url(#sophisticatedGradient)" strokeWidth="0.5" fill="none" className="animate-pulse" style={{animationDuration: '4s', animationDelay: '2s'}} />
                        </svg>
                    </div>

                    <a href={"news/" + mainStory.id} className='block relative z-10'>
                        <div className='p-6 space-y-4'>
                            <div className='flex items-center gap-3'>
                                <div
                                    className='flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm relative overflow-hidden group/category'
                                    style={{
                                        backgroundColor: getCategoryColor(mainStory.category.name),
                                        color: "#fff",
                                    }}
                                >
                                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/category:translate-x-full transition-transform duration-700" />
                                    <div className="relative z-10 flex items-center gap-1">
                                        {(() => {
                                            const IconComponent = getCategoryIcon(mainStory.category.name);
                                            return <IconComponent className="h-3 w-3 animate-pulse" />;
                                        })()}
                                        {mainStory.category.name}
                                    </div>
                                </div>
                                <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                                    <Clock className='h-3 w-3 animate-pulse' />
                                    {formatDate(mainStory.postDate)}
                                </div>
                                <div className="flex items-center gap-1 ml-auto">
                                    <CircuitBoard className="h-3 w-3 text-cyan-500 animate-pulse" />
                                    <span className="text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">AI ANALYZED</span>
                                </div>
                            </div>
                            
                            <div className='space-y-3'>
                                <h3 className='text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-all duration-300 group-hover:scale-105 transform origin-left'>
                                    {mainStory.title}
                                </h3>
                                <p className='text-sm text-muted-foreground line-clamp-3 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300'>
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
                                    className='text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1 w-fit group/link relative overflow-hidden px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-all duration-300'
                                >
                                    <span className="relative z-10">Read full story</span>
                                    <ArrowUpRight className='h-3 w-3 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:scale-110' />
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/link:translate-x-full transition-transform duration-500" />
                                </Link>
                                <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                                    <TrendingUp className='h-3 w-3 text-green-500 animate-pulse' />
                                    <span className="font-semibold text-green-600">Trending</span>
                                </div>
                            </div>
                        </div>
                    </a>
                </Card>

                {/* Secondary Stories with AI Effects */}
                <div className='col-span-1 space-y-6'>
                    {secondaryStories.slice(0, 2).map((news, index) => (
                        <Card
                            key={index}
                            className='overflow-hidden group border-0 shadow-md bg-gradient-to-br from-muted/30 to-muted/10 hover:shadow-lg transition-all duration-500 hover:scale-[1.02] relative'
                            style={{
                                animationDelay: `${index * 0.2}s`
                            }}
                        >
                            {/* AI Data Flow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Processing Dots */}
                            <div className="absolute top-2 right-2 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0s'}} />
                                <div className="w-1 h-1 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}} />
                                <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}} />
                            </div>
                            
                            <div className='p-4 space-y-3 relative z-10'>
                                <div className='flex items-center justify-between'>
                                    <div
                                        className='flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shadow-sm relative overflow-hidden group/category'
                                        style={{
                                            backgroundColor: getCategoryColor(news.category.name),
                                            color: "#fff",
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/category:translate-x-full transition-transform duration-500" />
                                        <div className="relative z-10 flex items-center gap-1">
                                            {(() => {
                                                const IconComponent = getCategoryIcon(news.category.name);
                                                return <IconComponent className="h-3 w-3 animate-pulse" />;
                                            })()}
                                            {news.category.name}
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                                        <Clock className='h-3 w-3 animate-pulse' />
                                        {formatDate(news.postDate)}
                                    </div>
                                </div>
                                
                                <a href={"news/" + news.id} className='block'>
                                    <h3 className='text-base font-bold text-foreground group-hover:text-primary transition-all duration-300 group-hover:scale-105 transform origin-left mb-2'>
                                        {news.title}
                                    </h3>
                                    <p className='text-sm text-muted-foreground line-clamp-2 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300'>
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
                                        className='text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1 w-fit group/link relative overflow-hidden px-2 py-1 rounded-lg hover:bg-primary/10 transition-all duration-300'
                                    >
                                        <span className="relative z-10">Read full story</span>
                                        <ArrowUpRight className='h-3 w-3 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:scale-110' />
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/link:translate-x-full transition-transform duration-500" />
                                    </Link>
                                    <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                                        <TrendingUp className='h-3 w-3 text-orange-500 animate-pulse' />
                                        <span className="font-semibold text-orange-600">Hot</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* AI Floating Action Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                    <button className="relative bg-gradient-to-r from-primary to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-110 group-hover:rotate-12">
                        <Brain className="h-6 w-6" />
                        {/* AI Processing Ring */}
                        <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-spin" style={{animationDuration: '2s'}} />
                    </button>
                </div>
            </div>
        </section>
    );
}
