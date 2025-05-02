import React from "react";
import { Link } from "react-router-dom";
import { NewsResponseDto } from "../../types/news.types";

interface NewsItemProps {
    news: NewsResponseDto;
}

export const NewsItem: React.FC<NewsItemProps> = ({ news }) => {
    const { id, title, author, publishDate, category, content } = news;

    // Format date for display
    const formattedDate = new Date(publishDate).toLocaleDateString();

    // Create a truncated preview of the content
    const contentPreview =
        content.length > 150 ? `${content.substring(0, 150)}...` : content;

    return (
        <div className='news-item'>
            <h3 className='news-title'>
                <Link to={`/news/${id}`}>{title}</Link>
            </h3>
            <div className='news-meta'>
                <span className='news-author'>By {author}</span>
                <span className='news-date'>Published on {formattedDate}</span>
                {category && (
                    <span className='news-category'>Category: {category}</span>
                )}
            </div>
            <p className='news-preview'>{contentPreview}</p>
            <Link to={`/news/${id}`} className='read-more'>
                Read more
            </Link>
        </div>
    );
};
