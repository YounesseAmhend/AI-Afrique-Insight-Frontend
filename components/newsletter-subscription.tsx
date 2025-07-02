"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, AlertCircle, Download } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { newsApi } from "@/apis/newsApi"

export default function DatasetDownloadCard() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleDownload = async () => {
    setStatus("loading")
    try {
      await newsApi.downloadNewsAsCsv()
      setStatus("success")
      setTimeout(() => setStatus("idle"), 2000)
    } catch (error: unknown) {
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Could not download the file. Please try again.")
    }
  }

  return (
    <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" />
          Download AI News Dataset
        </CardTitle>
        <CardDescription>
          Access the latest AI news dataset in CSV format, curated from top sources across Africa. Perfect for research, analytics, and more.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleDownload}
          disabled={status === "loading"}
          className="w-full flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          {status === "loading" ? "Preparing Download..." : "Download CSV"}
        </Button>
        {status === "success" && (
          <Alert className="mt-4 bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-900">
            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription>
              Download started! Check your downloads folder.
            </AlertDescription>
          </Alert>
        )}
        {status === "error" && (
          <Alert variant="destructive" className="mt-4 py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <p className="text-xs text-muted-foreground mt-4">
          By downloading, you agree to our {" "}
          <Link href="/privacy-policy" className="underline hover:text-primary">
            Privacy Policy
          </Link>{" "}
          and {" "}
          <Link href="/terms" className="underline hover:text-primary">
            Terms of Service
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  )
}
