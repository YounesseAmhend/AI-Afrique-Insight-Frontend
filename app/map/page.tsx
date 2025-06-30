// In your pages/index.js or app/page.js
"use client";

import dynamic from 'next/dynamic';

const AIReadinessMapWithNoSSR = dynamic(
  () => import('@/components/mapComponents/AIReadinessMap'), // Make sure this path is correct
  { 
    ssr: false,
    // Optional: add a loading component
  }
);

export default function Home() {
  return (
    <main>
      <AIReadinessMapWithNoSSR />
    </main>
  );
}