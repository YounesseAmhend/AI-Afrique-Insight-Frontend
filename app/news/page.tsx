import { Metadata } from "next";
import { NewsPageGrid } from "./components/NewsPageGrid";

export const metadata: Metadata = {
    title: "Latest News | AI Industry News",
    description:
        "Stay updated with the latest news and developments in AI technology and industry.",
};

export default function NewsPage() {
    return (
        <div className='min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950'>
            {/* this is dumm */}
            <div className='container mx-auto px-4 py-6'>
                {/* <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Latest News</h1>
            <p className="text-muted-foreground">
              Stay updated with the latest developments in AI technology and industry
            </p>
          </div> */}
                <div className='space-y-16'>
                    <NewsPageGrid />
                </div>
            </div>
        </div>
    );
}
