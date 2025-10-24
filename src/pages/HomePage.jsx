import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import ExampleCard from '../components/ExampleCard';
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

  const filteredExamples = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    return examples.filter(ex =>
      ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, examples]);

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

  const showSearchResults = searchQuery.trim().length > 0;

  return (
    <div className="home-page">
      <div className="home-container">
        <img src="/OpenHandsLogo.png" alt="OpenHands Logo" className="home-logo" />
        <h1 className="home-title">OpenHands Blueprints</h1>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        
        {showSearchResults ? (
          <div>
            <h2 className="search-results-title">
              {filteredExamples.length} {filteredExamples.length === 1 ? 'result' : 'results'} for "{searchQuery}"
            </h2>
            <div className="examples-grid">
              {filteredExamples.map((example) => (
                <ExampleCard key={example.id} example={example} />
              ))}
            </div>
            {filteredExamples.length === 0 && (
              <p className="no-results">No examples found matching your search.</p>
            )}
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default HomePage;
