import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ExampleCard from '../components/ExampleCard';
import { loadExamples } from '../utils/loadExamples';
import './SearchPage.css';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [examples, setExamples] = useState([]);
  const [filteredExamples, setFilteredExamples] = useState([]);

  useEffect(() => {
    loadExamples().then(setExamples);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = examples.filter(ex =>
        ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredExamples(filtered);
      setSearchParams({ q: searchQuery });
    } else {
      setFilteredExamples([]);
    }
  }, [searchQuery, examples, setSearchParams]);

  return (
    <div className="search-page">
      <div className="search-container">
        <Link to="/" className="back-link">← Back</Link>
        <h1 className="search-title">Search</h1>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        
        {searchQuery && (
          <div className="search-results">
            <p className="results-count">
              {filteredExamples.length} result{filteredExamples.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
            <div className="examples-grid">
              {filteredExamples.map((example) => (
                <ExampleCard key={example.id} example={example} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
