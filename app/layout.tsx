// app/layout.tsx
"use client";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme-provider";
import LoadingWrapper from "@/components/LoadingWrapper";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";
import { Providers } from "./providers";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMapPage = pathname.startsWith("/map");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LoadingWrapper>
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
            {!isMapPage && <Header />}
            <main className="flex-1">
              <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                <Providers>
                  {children}
                </Providers>
              </ThemeProvider>
            </main>
            {!isMapPage && <Footer />}
          </div>
        </LoadingWrapper>
      </body>
    </html>
  );
}