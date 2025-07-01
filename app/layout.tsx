

import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import { ThemeProvider } from "@/components/theme-provider"
import LoadingWrapper from "@/components/LoadingWrapper"
import { Inter } from "next/font/google"
import type React from "react"
import "./globals.css"
import { Providers } from "./providers"


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AI News Hub - Latest Artificial Intelligence News and Updates",
  description: "Your trusted source for the latest AI news, research, and industry developments.",
}

export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LoadingWrapper>
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
            <Header />
            <main className="flex-1">
              <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                <Providers>
                  {children}
                </Providers>
              </ThemeProvider>
            </main>

            <Footer />
          </div>
        </LoadingWrapper>
      </body>
    </html>
  )
}
