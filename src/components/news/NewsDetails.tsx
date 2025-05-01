import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGetNewsById } from '../../hooks/useNewsQuery';
import { Loading } from '../common/Loading';
import { ErrorMessage } from '../common/ErrorMessage';

export const NewsDetails: React.FC = () => {
  // Get the news ID from the URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Convert ID to number and fetch news details
  const newsId = id ? parseInt(id, 10) : 0;
  const { data: news, error, isLoading } = useGetNewsById(newsId);

  if (isLoading) return <Loading />;
  
  if (error || !news) return (
    <div className="news-detail-error">
      <ErrorMessage message="Failed to load news article" />
      <Link to="/" className="back-link">Back to News List</Link>
    </div>
  );

  // Format date for display
  const formattedDate = new Date(news.publishDate).toLocaleDateString();

  return (
    <article className="news-details">
      <header>
        <h1 className="news-title">{news.title}</h1>
        <div className="news-meta">
          <span className="news-author">By {news.author}</span>
          <span className="news-date">Published on {formattedDate}</span>
          {news.category && <span className="news-category">Category: {news.category}</span>}
        </div>
      </header>
      
      {news.imageUrl && (
        <div className="news-image">
          <img src={news.imageUrl} alt={news.title} />
        </div>
      )}
      
      <div className="news-content">
        {/* Split content by paragraphs for better display */}
        {news.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      
      {news.tags && news.tags.length > 0 && (
        <div className="news-tags">
          <h3>Tags:</h3>
          <ul>
            {news.tags.map((tag, index) => (
              <li key={index} className="news-tag">{tag}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="news-actions">
        <button onClick={() => navigate(-1)} className="back-button">
          Back
        </button>
      </div>
    </article>
  );
};