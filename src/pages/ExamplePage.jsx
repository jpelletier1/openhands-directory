import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import { loadExamples, getCategorySlug } from '../utils/loadExamples';
import './ExamplePage.css';

const ExamplePage = () => {
  const { category, id } = useParams();
  const [example, setExample] = useState(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);

  const loadCodeFromFile = async (example) => {
    try {
      // Construct the file path based on the example data
      const filePath = `/examples/${example.category}/${example.file}`;
      const response = await fetch(filePath);
      
      if (response.ok) {
        const fileContent = await response.text();
        setCode(fileContent);
      } else {
        console.error(`Failed to load file: ${filePath}`);
        setCode('// Error: Could not load file content');
      }
    } catch (error) {
      console.error('Error loading file:', error);
      setCode('// Error: Could not load file content');
    }
  };

  useEffect(() => {
    loadExamples().then((allExamples) => {
      const found = allExamples.find(ex => ex.id === id);
      if (found) {
        setExample(found);
        loadCodeFromFile(found).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });
  }, [id]);

  if (!example || loading) {
    return (
      <div className="example-page">
        <div className="example-container">
          <p className="loading">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="example-page">
      <div className="example-container">
        <Link to={`/category/${category}`} className="back-link">← Back to {example.category}</Link>
        
        <div className="example-content">
          <div className="example-left">
            <h1 className="example-title">{example.title}</h1>
            <div className="example-meta">
              <span className="example-author">{example.author}</span>
              <span className="example-badge">{example.category}</span>
            </div>
            {example.description && (
              <div className="example-description">
                <h2 className="description-title">Description</h2>
                <p className="description-text">{example.description}</p>
              </div>
            )}
          </div>
          
          <div className="example-right">
            <CodeBlock code={code} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamplePage;
