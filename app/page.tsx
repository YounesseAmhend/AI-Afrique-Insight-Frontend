import Header from "@/components/header"
import FeaturedNews from "@/components/featured-news"
import TopCompanies from "@/components/top-companies"
import NewsGrid from "@/components/news-grid"
import TrendingTopics from "@/components/trending-topics"
import NewsletterSubscription from "@/components/newsletter-subscription"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 space-y-12">
          <FeaturedNews />
          <TrendingTopics />
          <TopCompanies />
          <NewsGrid />
          <NewsletterSubscription />
        </div>
      </main>
      <Footer />
    </div>
  )
}
