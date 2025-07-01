"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTrendingNews } from "@/hooks/useNewsQuery";
import { getCategoryColor } from "@/lib/categoryColors";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
// We still use Framer Motion, but with a more refined approach
import { motion, Variants } from "framer-motion";

export default function FeaturedNews() {
    const { data: trendingNews, isLoading, isError } = useGetTrendingNews();

    function formatDate(dateString: string) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("en-GB", {
                year: "numeric", month: "long", day: "numeric"
            });
        } catch { return "Unknown date"; }
    }

    function getPlainText(htmlString: string) {
        if (typeof window !== "undefined") {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = htmlString;
            return tempDiv.textContent || tempDiv.innerText || "";
        }
        return "";
    }

    // --- Animation variants for a subtle, staggered entry ---
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1, y: 0,
            transition: { duration: 0.4, ease: "easeOut" },
        },
    };

    if (isLoading) {
        // Skeleton remains clean and simple
        return (
            <section className='space-y-6'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-2xl font-bold text-foreground'>Top Stories</h2>
                    <Skeleton className='h-5 w-24' />
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    <Card className='col-span-1 lg:col-span-2 p-8 h-[450px] border-2'>
                        <Skeleton className='h-10 w-3/4 mb-4' />
                        <Skeleton className='h-5 w-full mb-2' />
                        <Skeleton className='h-5 w-5/6' />
                    </Card>
                    <div className='col-span-1 space-y-6'>
                        {[1, 2].map((_, index) => <Card key={index} className='p-6 h-[213px] border' />)}
                    </div>
                </div>
            </section>
        );
    }

    if (isError || !trendingNews || trendingNews.length < 3) return null;

    const [mainStory, ...secondaryStories] = trendingNews;

    return (
        <motion.section
            className='space-y-6'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-foreground'>Top Stories</h2>
                <Link href='/news' className='text-sm font-medium text-primary hover:underline'>
                    View all news
                </Link>
            </motion.div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* ================================== */}
                {/* === The Professional Main Card === */}
                {/* ================================== */}
                <motion.div variants={itemVariants} className="col-span-1 lg:col-span-2">
                    <motion.div
                        whileHover={{ scale: 1.025, transition: { duration: 0.2, ease: "easeOut" } }}
                        className='h-full'
                    >
                        <Card className='group h-full flex flex-col justify-between p-6 md:p-8 border-2 dark:border-gray-800 hover:border-primary/50 transition-colors duration-300'>
                            <div>
                                <div className='flex items-center justify-between mb-4'>
                                    <span className='text-xs font-bold uppercase px-3 py-1 rounded-full text-white' style={{ backgroundColor: getCategoryColor(mainStory.category.name) }}>
                                        {mainStory.category.name}
                                    </span>
                                    <span className='text-xs text-foreground/70'>{formatDate(mainStory.postDate)}</span>
                                </div>
                                <h3 className='text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-4'>
                                    <a href={"news/" + mainStory.id} className='hover:underline decoration-primary/50 decoration-2 underline-offset-4'>
                                        {mainStory.title}
                                    </a>
                                </h3>
                                <p className='text-foreground/80 text-sm md:text-base line-clamp-3'>
                                    {getPlainText(mainStory.body)}
                                </p>
                            </div>
                            <div className='mt-6'>
                                <a href={mainStory.url} target='_blank' rel='noopener noreferrer' className='text-sm font-bold text-primary hover:text-primary/80 flex items-center gap-1.5 w-fit group/link'>
                                    Read Full Story
                                    <motion.div className="overflow-hidden">
                                        <motion.div className="transition-transform group-hover/link:translate-x-1">
                                            <ArrowUpRight className='h-4 w-4' />
                                        </motion.div>
                                    </motion.div>
                                </a>
                            </div>
                        </Card>
                    </motion.div>
                </motion.div>

                {/* ======================================= */}
                {/* === The Professional Secondary Cards === */}
                {/* ======================================= */}
                <motion.div variants={containerVariants} className='col-span-1 space-y-6'>
                    {secondaryStories.slice(0, 2).map((news) => (
                        <motion.div
                            key={news.id}
                            variants={itemVariants}
                            whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
                        >
                            <Card className='group p-6 h-full flex flex-col justify-between border dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-900/40 transition-colors duration-300'>
                                <div>
                                    <div className='flex items-center justify-between mb-3'>
                                        <span className='text-xs font-semibold px-2 py-0.5 rounded-full text-white' style={{ backgroundColor: getCategoryColor(news.category.name) }}>
                                            {news.category.name}
                                        </span>
                                        <span className='text-xs text-foreground/60'>{formatDate(news.postDate)}</span>
                                    </div>
                                    <a href={"news/" + news.id}>
                                        <h3 className='text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200'>
                                            {news.title}
                                        </h3>
                                    </a>
                                </div>
                                <div className='mt-4'>
                                    <a href={news.url} target='_blank' rel='noopener noreferrer' className='text-xs font-semibold text-primary/80 hover:text-primary flex items-center gap-1 w-fit group/link'>
                                        Read Story
                                        <div className="transition-transform group-hover/link:translate-x-0.5">
                                            <ArrowUpRight className='h-3 w-3' />
                                        </div>
                                    </a>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}