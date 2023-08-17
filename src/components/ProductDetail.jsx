// ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProducts } from '../data/api';
import './ProductDetail.css';

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Initialize quantity to 1
  const [addedToCart, setAddedToCart] = useState(false); // Track if product added to cart

  useEffect(() => {
    async function fetchProductDetail() {
      try {
        const productsData = await fetchProducts();
        const selectedProduct = productsData.find(p => p.id === parseInt(id));
        setProduct(selectedProduct);
      } catch (error) {
        // Handle error if needed
      }
    }

    fetchProductDetail();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    const parsedQuantity = parseInt(quantity);
    const itemToAdd = { ...product, quantity: parsedQuantity };
    addToCart(itemToAdd);
    setAddedToCart(true); // Set addedToCart to true when item is added
  };

  return (
    <div className="product-detail-container">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-details">
        <h2>{product.title}</h2>
        <p className="price">${product.price}</p>
        <div className="quantity-control">
          <button onClick={() => setQuantity(Math.max(1, parseInt(quantity) - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(parseInt(quantity) + 1)}>+</button>
        </div>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
        {addedToCart && <p className="added-to-cart-message">Product added to cart!</p>}
        <div className="button-container">
          <Link to="/cart" className="view-cart-button">
            View Cart
          </Link>
        </div>
        <p className="description">{product.description}</p>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default ProductDetail;
