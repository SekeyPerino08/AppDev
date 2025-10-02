import React from 'react';

const ProductDetails = ({ product, onAddToCart, onBack }) => {
  if (!product) return null;

  const { title, description, price, discountPercentage, rating, stock, brand, category, images } = product;

  const discountedPrice = price - (price * discountPercentage / 100);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={onBack}>Back</button>
      <h2>{title}</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          {images.map((img, index) => (
            <img key={index} src={img} alt={title} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
          ))}
        </div>
        <div>
          <p><strong>Brand:</strong> {brand}</p>
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Description:</strong> {description}</p>
          <p><strong>Rating:</strong> {rating} ⭐</p>
          <p><strong>Stock:</strong> {stock}</p>
          <p><strong>Original Price:</strong> ${price}</p>
          {discountPercentage > 0 && (
            <>
              <p><strong>Discount:</strong> {discountPercentage}%</p>
              <p><strong>Discounted Price:</strong> ${discountedPrice.toFixed(2)}</p>
            </>
          )}
          <button onClick={onAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
