import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ category, slug, count }) => {
  return (
    <Link to={`/category/${slug}`} className="category-card">
      <div className="category-card-content">
        <h2 className="category-card-title">{category}</h2>
        <p className="category-card-count">{count} examples</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
