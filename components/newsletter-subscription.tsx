"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function NewsletterSubscription() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error")
      setErrorMessage("Please enter a valid email address")
      return
    }

    setStatus("loading")

    // Simulate API call
    setTimeout(() => {
      // Success simulation (in a real app, this would be an API call)
      if (Math.random() > 0.2) {
        setStatus("success")
      } else {
        setStatus("error")
        setErrorMessage("There was an error subscribing. Please try again.")
      }
    }, 1000)
  }

  return (
    <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          Stay Updated on AI Advancements
        </CardTitle>
        <CardDescription>
          Get the latest AI news, research papers, and industry updates delivered to your inbox.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status === "success" ? (
          <Alert className="bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-900">
            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription>
              Thanks for subscribing! Please check your email to confirm your subscription.
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === "error") setStatus("idle")
                  }}
                  className="w-full"
                  disabled={status === "loading"}
                />
              </div>
              <Button type="submit" disabled={status === "loading"} className="min-w-[120px]">
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>

            {status === "error" && (
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to our{" "}
              <Link href="/privacy-policy" className="underline hover:text-primary">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="underline hover:text-primary">
                Terms of Service
              </Link>
              . You can unsubscribe at any time.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
