"use client";
import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

interface LoadingWrapperProps {
  children: React.ReactNode;
}

export default function LoadingWrapper({ children }: LoadingWrapperProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Only show loading screen if not already shown in this session
    if (typeof window !== "undefined") {
      const alreadyLoaded = sessionStorage.getItem("siteLoadedOnce");
      if (!alreadyLoaded) {
        setIsLoading(true);
      }
      setHasChecked(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("siteLoadedOnce", "true");
    }
  };

  // Prevent flash of content during SSR
  if (!hasChecked) return null;

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <div
        className={`transition-opacity duration-1000 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
} 