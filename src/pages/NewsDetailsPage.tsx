import React from 'react';
import { NewsDetails } from '../components/news/NewsDetails';

export const NewsDetailPage: React.FC = () => {
  return (
    <div className="news-detail-page">
      <main>
        <NewsDetails />
      </main>
    </div>
  );
};