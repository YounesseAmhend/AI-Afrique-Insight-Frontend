"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAddSource } from "@/hooks/useSourceQuery";
import { Check, HelpCircle, Loader2, Plus, X } from "lucide-react";
import { useState } from "react";

export function AddSourceForm() {
    const addSourceMutation = useAddSource();
    const [url, setUrl] = useState("");
    const [containsAiContent, setContainsAiContent] = useState(false);
    const [containsAfricaContent, setContainsAfricaContent] = useState(false);

    const handleAddSource = (e: React.FormEvent) => {
        e.preventDefault();
        addSourceMutation.mutate(
            { url, containsAiContent, containsAfricaContent },
            {
                onSuccess: () => {
                    setUrl("");
                    setContainsAiContent(false);
                    setContainsAfricaContent(false);
                },
            },
        );
    };

    return (
        <form
            onSubmit={handleAddSource}
            className="mb-6 p-8 rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-gray-800"
        >
            <div className="space-y-6">
                {/* URL Input */}
                <div className="space-y-2">
                    <label className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                        Source URL
                        <Tooltip delayDuration={200}>
                            <TooltipTrigger>
                                <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-500 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent side="right" align="start" className="max-w-[300px]">
                                Enter the RSS or news feed URL of the source.
                            </TooltipContent>
                        </Tooltip>
                    </label>
                    <Input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                        placeholder="https://example.com/rss"
                        className="w-full rounded-lg focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                {/* Checkboxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                        <input
                            type="checkbox"
                            checked={containsAiContent}
                            onChange={(e) => setContainsAiContent(e.target.checked)}
                            className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
                        />
                        <div className="flex-1">
                            <span className="text-gray-800 dark:text-gray-200 font-medium">
                                Contains AI Content
                            </span>
                            <Tooltip delayDuration={200}>
                                <TooltipTrigger>
                                    <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-500 cursor-pointer ml-1" />
                                </TooltipTrigger>
                                <TooltipContent side="right" align="start" className="max-w-[300px]">
                                    Check if the website is dedicated to AI events/news. All news from this source are about AI.
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                        <input
                            type="checkbox"
                            checked={containsAfricaContent}
                            onChange={(e) => setContainsAfricaContent(e.target.checked)}
                            className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
                        />
                        <div className="flex-1">
                            <span className="text-gray-800 dark:text-gray-200 font-medium">
                                Contains Africa Content
                            </span>
                            <Tooltip delayDuration={200}>
                                <TooltipTrigger>
                                    <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-500 cursor-pointer ml-1" />
                                </TooltipTrigger>
                                <TooltipContent side="right" align="start" className="max-w-[300px]">
                                    Check if the website contains news about Africa. Not all news may be about AI.
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </label>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={addSourceMutation.isPending}
                    className="w-full mt-4 h-12 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-medium transition-colors"
                >
                    {addSourceMutation.isPending ? (
                        <Loader2 className="animate-spin mr-2" />
                    ) : (
                        <Plus className="mr-2" />
                    )}
                    {addSourceMutation.isPending ? "Adding..." : "Add Source"}
                </Button>

                {/* Status Messages */}
                <div className="mt-4 space-y-2">
                    {addSourceMutation.isError && (
                        <Alert variant="destructive" className="rounded-lg">
                            <X className="w-5 h-5" />
                            <AlertDescription>
                                {(addSourceMutation.error as any)?.message || "Failed to add source."}
                            </AlertDescription>
                        </Alert>
                    )}
                    {addSourceMutation.isSuccess && (
                        <Alert className="rounded-lg">
                            <Check className="w-5 h-5 text-green-600" />
                            <AlertDescription>
                                Source added successfully!
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
        </form>
    );
}
