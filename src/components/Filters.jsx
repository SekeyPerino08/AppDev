import React from 'react';
import '../styles/App.css';

const Filters = ({ filters, onFilterChange, categories }) => {
  const { category, minPrice, maxPrice, sortBy } = filters;

  return (
    <div className="filters">
      <select value={category} onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}>
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => onFilterChange({ ...filters, minPrice: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
      />
      <select value={sortBy} onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}>
        <option value="title">Sort by Title</option>
        <option value="price">Sort by Price</option>
        <option value="rating">Sort by Rating</option>
      </select>
    </div>
  );
};

export default Filters;
