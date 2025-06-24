import FeaturedNews from "@/components/featured-news";
import NewsletterSubscription from "@/components/newsletter-subscription";
import TopCompanies from "@/components/top-companies";
import TrendingTopics from "@/components/trending-topics";
import { HomeNewsGrid } from "./news/components/HomeNewsGrid";

export default function Home() {
    return (
        <div className='container mx-auto px-4 py-6 space-y-12'>
            <FeaturedNews />
            <TrendingTopics />
            <TopCompanies />
            <HomeNewsGrid />
            <NewsletterSubscription />
        </div>
    );
}
