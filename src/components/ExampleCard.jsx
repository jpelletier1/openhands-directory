import React from 'react';
import { Link } from 'react-router-dom';
import './ExampleCard.css';

const ExampleCard = ({ example }) => {
  return (
    <Link to={`/example/${example.id}`} className="example-card">
      <div className="example-card-content">
        <h3 className="example-card-title">{example.title}</h3>
        <p className="example-card-author">{example.author}</p>
      </div>
    </Link>
  );
};

export default ExampleCard;
