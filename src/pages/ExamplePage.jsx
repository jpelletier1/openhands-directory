import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import { loadExamples, getCategorySlug } from '../utils/loadExamples';
import './ExamplePage.css';

const ExamplePage = () => {
  const { id } = useParams();
  const [example, setExample] = useState(null);

  useEffect(() => {
    loadExamples().then((allExamples) => {
      const found = allExamples.find(ex => ex.id === id);
      setExample(found);
    });
  }, [id]);

  if (!example) {
    return (
      <div className="example-page">
        <div className="example-container">
          <p className="loading">Loading...</p>
        </div>
      </div>
    );
  }

  const categorySlug = getCategorySlug(example.category);

  return (
    <div className="example-page">
      <div className="example-container">
        <Link to={`/category/${categorySlug}`} className="back-link">← Back to {example.category}</Link>
        
        <div className="example-content">
          <div className="example-left">
            <h1 className="example-title">{example.title}</h1>
            <div className="example-meta">
              <span className="example-author">{example.author}</span>
              <span className="example-badge">{example.category}</span>
            </div>
          </div>
          
          <div className="example-right">
            <CodeBlock code={example.code} />
            {example.description && (
              <div className="example-description">
                <h2 className="description-title">Description</h2>
                <p className="description-text">{example.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamplePage;
