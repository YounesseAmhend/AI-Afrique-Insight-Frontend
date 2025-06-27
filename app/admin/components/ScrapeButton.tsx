"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useScrapeSources } from "@/hooks/useSourceQuery";
import { Check, Loader2, Scissors, X } from "lucide-react";

export function ScrapeButton() {
    const scrapeMutation = useScrapeSources();

    return (
        <div className='mb-6 w-full max-w-8xl'>
            <Button
                onClick={() => scrapeMutation.mutate()}
                disabled={scrapeMutation.isPending}
                className=' bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 text-base'
                variant={scrapeMutation.isPending ? "default" : "secondary"}
            >
                {scrapeMutation.isPending ? (
                    <Loader2 className='animate-spin mr-2' />
                ) : (
                    <Scissors className='mr-2' />
                )}
                {scrapeMutation.isPending ? "Trigger Scraping..." : "Scrape"}
            </Button>
            <div className='mt-4 space-y-2'>
                {scrapeMutation.isError && (
                    <Alert variant='destructive'>
                        <X className='w-5 h-5' />
                        <AlertDescription>
                            {(scrapeMutation.error as any)?.message ||
                                "Failed to scrape."}
                        </AlertDescription>
                    </Alert>
                )}
                {scrapeMutation.isSuccess && (
                    <Alert>
                        <Check className='w-5 h-5 text-green-600' />
                        <AlertDescription>
                            {scrapeMutation.data?.message ||
                                "Scraping triggered!"}
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    );
}
