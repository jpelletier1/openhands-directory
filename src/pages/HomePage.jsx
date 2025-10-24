import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import { loadExamples, getCategorySlug } from '../utils/loadExamples';
import './HomePage.css';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [examples, setExamples] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('HomePage: Loading examples...');
    loadExamples().then((loadedExamples) => {
      console.log('HomePage: Examples loaded:', loadedExamples.length, loadedExamples);
      setExamples(loadedExamples);
    }).catch((error) => {
      console.error('HomePage: Error loading examples:', error);
    });
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = examples.filter(ex =>
        ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filtered.length > 0) {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
    }
  }, [searchQuery, examples, navigate]);

  const categories = [
    { name: 'Skills', slug: 'skills' },
    { name: 'MCP Servers', slug: 'mcp' },
    { name: 'SDK Examples', slug: 'sdk' }
  ];

  const getCategoryCount = (categorySlug) => {
    const count = examples.filter(ex => ex.category === categorySlug).length;
    console.log(`HomePage: Count for ${categorySlug}:`, count, 'from', examples.length, 'examples');
    return count;
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <h1 className="home-title">OpenHands Marketplace</h1>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        
        <div className="category-grid">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.slug}
              category={cat.name}
              slug={cat.slug}
              count={getCategoryCount(cat.slug)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
