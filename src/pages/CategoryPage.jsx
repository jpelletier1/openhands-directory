import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ExampleCard from '../components/ExampleCard';
import { loadExamples, getCategoryFromSlug } from '../utils/loadExamples';
import './CategoryPage.css';

const CategoryPage = () => {
  const { slug } = useParams();
  const [examples, setExamples] = useState([]);
  const categoryName = getCategoryFromSlug(slug);

  useEffect(() => {
    console.log('CategoryPage: Loading examples for slug:', slug);
    loadExamples().then((allExamples) => {
      console.log('CategoryPage: Total examples loaded:', allExamples.length);
      console.log('CategoryPage: Sample example:', allExamples[0]);
      const filtered = allExamples.filter(ex => ex.category === slug);
      console.log('CategoryPage: Filtering by slug:', slug, 'found:', filtered.length);
      setExamples(filtered);
    });
  }, [slug]);

  return (
    <div className="category-page">
      <div className="category-container">
        <Link to="/" className="back-link">← Back</Link>
        <h1 className="category-title">{categoryName}</h1>
        
        <div className="examples-grid">
          {examples.map((example) => (
            <ExampleCard key={example.id} example={example} />
          ))}
        </div>
        
        {examples.length === 0 && (
          <p className="no-examples">No examples found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
