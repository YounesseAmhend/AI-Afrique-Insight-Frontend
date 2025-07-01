"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Adjustable loading duration in milliseconds
const LOADING_DURATION = 8000; // 8 seconds, change this value to adjust

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [morphToCircle, setMorphToCircle] = useState(false);
  const [expandCircle, setExpandCircle] = useState(false);

  useEffect(() => {
    // Simulate loading progress over LOADING_DURATION ms with smoother increments
    const steps = 100;
    const intervalTime = LOADING_DURATION / steps;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Use easing function for smoother progress
        const easeOutQuart = 1 - Math.pow(1 - (prev / 100), 4);
        return Math.min(prev + (1 + easeOutQuart * 0.5), 100);
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Morph the bar into a circle
      setTimeout(() => {
        setMorphToCircle(true);
        // After morph, expand the circle
        setTimeout(() => {
          setExpandCircle(true);
          // After expansion, reveal the site
          setTimeout(() => {
            setIsLoading(false);
            onLoadingComplete();
          }, 700);
        }, 600);
      }, 300);
    }
  }, [progress, onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-white flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          {/* Geometric Patterns */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-300 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-purple-300 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-blue-300 rounded-full animate-spin" style={{ animationDuration: '25s' }} />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-300"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 right-20 w-4 h-4 bg-blue-400 rounded-full opacity-30"
            animate={{ 
              y: [0, -30, 0], 
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1]
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-3 h-3 bg-purple-400 rounded-full opacity-30"
            animate={{ 
              y: [0, 30, 0], 
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 3.5, 
              repeat: Infinity, 
              delay: 1,
              ease: [0.4, 0, 0.6, 1]
            }}
          />
        </div>

        {/* Main Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center space-y-8"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94],
            staggerChildren: 0.1
          }}
        >
          {/* Logo/Brand */}
          <motion.div
            className="text-center"
            initial={{ y: 30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ 
              delay: 0.1, 
              duration: 0.9, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <motion.div
              className="mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.2, 
                duration: 0.8, 
                ease: [0.34, 1.56, 0.64, 1],
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
            >
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Africa Insights
            </h1>
            <p className="text-gray-600 text-sm">Loading your AI-powered news experience</p>
          </motion.div>

          {/* Morphing Bar/Circle Animation */}
          <motion.div
            className="flex items-center justify-center"
            style={{ minHeight: 48 }}
          >
            <motion.div
              initial={false}
              animate={
                morphToCircle
                  ? {
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      background: "linear-gradient(90deg, #0ea5e9 0%, #1e40af 100%)",
                      boxShadow: "0 4px 32px 0 rgba(30,64,175,0.15)",
                    }
                  : {
                      width: 320,
                      height: 12,
                      borderRadius: 6,
                      background: "linear-gradient(90deg, #0ea5e9 0%, #1e40af 100%)",
                      boxShadow: "0 2px 16px 0 rgba(30,64,175,0.10)",
                    }
              }
              transition={{
                duration: morphToCircle ? 0.6 : 0.8,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                position: "relative",
              }}
            >
              {/* Progress fill only when not morphing */}
              {!morphToCircle && (
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #0ea5e9 0%, #1e40af 100%)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{
                    duration: 0.15,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />
              )}
            </motion.div>
          </motion.div>

          {/* Loading Dots */}
          <motion.div
            className="flex space-x-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.7, 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full"
                animate={{ 
                  scale: [1, 1.8, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity, 
                  delay: i * 0.15,
                  ease: [0.4, 0, 0.6, 1]
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Expanding Circle Overlay */}
        <AnimatePresence>
          {expandCircle && (
            <motion.div
              className="fixed left-1/2 top-1/2"
              style={{ 
                zIndex: 60, 
                borderRadius: "50%", 
                width: 48, 
                height: 48, 
                translateX: "-50%", 
                translateY: "-50%", 
                background: "linear-gradient(90deg, #0ea5e9 0%, #1e40af 100%)"
              }}
              initial={{ scale: 1 }}
              animate={{ scale: 40 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            />
          )}
        </AnimatePresence>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-500 rounded-full"
              style={{
                left: `${15 + i * 12}%`,
                top: `${25 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -25, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
                x: [0, Math.sin(i) * 10, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: [0.4, 0, 0.6, 1]
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 