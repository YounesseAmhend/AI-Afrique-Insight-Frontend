import React from "react";
import { Link } from "react-router-dom";
import { NewsResponseDto } from "../../types/news.types";

interface NewsItemProps {
    news: NewsResponseDto;
}

export const NewsItem: React.FC<NewsItemProps> = ({ news }) => {
    const { id, title, author, postDate, body } = news;

    // Format date for display
    const formattedDate = new Date(postDate).toLocaleDateString();

    // Create a truncated preview of the body
    const bodyPreview =
        body.length > 150 ? `${body.substring(0, 150)}...` : body;

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2 text-blue-600 hover:text-blue-800">
                <Link to={`/news/${id}`}>{title}</Link>
            </h3>
            <div className="text-sm text-gray-600 mb-4 space-x-4">
                <span className="news-author">By {author}</span>
                <span className="news-date">Published on {formattedDate}</span>
                {/* {category && (
                    <span className="news-category">Category: {category}</span>
                )} */}
            </div>
            <p className="text-gray-700 mb-4">{bodyPreview}</p>
            <Link 
                to={`/news/${id}`} 
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
                Read more
            </Link>
        </div>
    );
};
