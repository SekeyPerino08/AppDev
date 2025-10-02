import React from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ product, onClick, onAddToCart }) => {
  const { thumbnail, title, price, description } = product;

  return (
    <div className="product-card" onClick={onClick}>
      <img src={thumbnail} alt={title} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{title}</h3>
        <p className="product-price">${price}</p>
        <p className="product-description">{description}</p>
        <button className="buy-button" onClick={(e) => { e.stopPropagation(); onAddToCart(); }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
