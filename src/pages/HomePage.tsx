import React, { useState, useEffect } from 'react';
import { NewsList } from '../components/news/NewList';
import { useNewsStore } from '../store/newsStore';
import { useGetAllNews } from '../hooks/useNewsQuery';

export const HomePage: React.FC = () => {
  // Get state and actions from store
  const { 
    searchTerm, 
    setSearchTerm, 
    selectedCategory, 
    setSelectedCategory, 
    resetFilters 
  } = useNewsStore();
  
  // Local state for search input
  const [searchInput, setSearchInput] = useState(searchTerm);
  
  // Fetch all news to get available categories
  const { data: news } = useGetAllNews();
  
  // Extract unique categories from news data
  const categories = React.useMemo(() => {
    if (!news) return [];
    
    const allCategories = news
      .map(item => item.category)
      .filter((category): category is string => Boolean(category));
      
    return Array.from(new Set(allCategories));
  }, [news]);
  
  // Update local searchInput when store searchTerm changes
  useEffect(() => {
    setSearchInput(searchTerm);
  }, [searchTerm]);
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
  };
  
  return (
    <div className="home-page">
      <header className="page-header">
        <h1>Latest News</h1>
      </header>
      
      <div className="filters-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search news..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        
        {categories.length > 0 && (
          <div className="category-filter">
            <label htmlFor="category-select">Filter by category:</label>
            <select
              id="category-select"
              value={selectedCategory || ''}
              onChange={(e) => {
                const value = e.target.value || null;
                setSelectedCategory(value);
              }}
              className="category-select"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {(searchTerm || selectedCategory) && (
          <button 
            onClick={resetFilters} 
            className="reset-filters-button"
          >
            Clear Filters
          </button>
        )}
      </div>
      
      <main className="news-content">
        <NewsList />
      </main>
    </div>
  );
};