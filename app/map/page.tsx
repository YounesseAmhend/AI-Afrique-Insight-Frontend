"use client"; // If this is an App Router page.tsx

import dynamic from 'next/dynamic';

// Dynamically import the map component with no SSR
const AIReadinessMapWithNoSSR = dynamic(
  () => import('@/components/AIReadinessMap'), // Adjust path to your component
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <AIReadinessMapWithNoSSR />
    </>
  );
}