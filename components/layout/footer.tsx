import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin, Facebook, Rss, Youtube, Instagram } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const categories = [
    { name: "News", href: "/news" },
    { name: "Research", href: "/research" },
    { name: "Companies", href: "/companies" },
    { name: "Topics", href: "/topics" },
    { name: "Podcasts", href: "/podcasts" },
  ]

  const about = [
    { name: "About Us", href: "/about" },
    { name: "Editorial Team", href: "/team" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
    { name: "Advertise", href: "/advertise" },
  ]

  const legal = [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" },
  ]

  const socialLinks = [
    { name: "Twitter", icon: <Twitter className="h-4 w-4" />, href: "https://twitter.com" },
    { name: "LinkedIn", icon: <Linkedin className="h-4 w-4" />, href: "https://linkedin.com" },
    { name: "Facebook", icon: <Facebook className="h-4 w-4" />, href: "https://facebook.com" },
    { name: "Instagram", icon: <Instagram className="h-4 w-4" />, href: "https://instagram.com" },
    { name: "YouTube", icon: <Youtube className="h-4 w-4" />, href: "https://youtube.com" },
    { name: "GitHub", icon: <Github className="h-4 w-4" />, href: "https://github.com" },
    { name: "RSS", icon: <Rss className="h-4 w-4" />, href: "/rss" },
  ]

  return (
    <footer className="bg-gray-950 text-gray-200 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold tracking-tighter text-white">AI NEWS</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted source for the latest artificial intelligence news, research, and industry developments.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  <Link href={link.href} aria-label={link.name}>
                    {link.icon}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link href={category.href} className="text-sm text-gray-400 hover:text-white">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">About</h3>
            <ul className="space-y-2">
              {about.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              {legal.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h3 className="font-semibold text-white mb-2">Admin Access</h3>
              <Button
                asChild
                className="bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Link href="/admin">
                  Admin Panel
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          <p>© {currentYear} AI News Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
