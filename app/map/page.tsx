"use client"

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Header from "@/components/header"


export default function Home() {
  // Dynamically import the map component with no SSR
  // This is necessary because Leaflet requires window/document objects
  const Map = dynamic(() => import('../../components/AIReadinessMap'), {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-96">Loading map...</div>
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Head>
        <title>Global AI Readiness Map</title>
        <meta name="description" content="Interactive map showing AI readiness scores by country" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
          <h2 className="text-xl font-semibold mb-4">About AI Readiness Scores</h2>
          <p className="mb-4">
            This map visualizes AI readiness scores for countries around the world. 
            Higher scores (shown with brighter colors) indicate better preparedness 
            for AI adoption and implementation.
          </p>
          <p>
            Hover over any country to see its specific AI readiness score.
            Countries with no available data are shown in gray.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-96 md:h-screen">
          {isClient && <Map />}
        </div>
      </main>

      <footer className="bg-gray-100 p-4 mt-8">
        <div className="container mx-auto text-center text-gray-600">
          <p>© {new Date().getFullYear()} AI Readiness Project</p>
        </div>
      </footer>
    </div>
  );
}
