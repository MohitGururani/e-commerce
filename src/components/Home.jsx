import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../data/api';
import { Link } from 'react-router-dom';
import Header from './Header';
import './Home.css';

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProductData() {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData.map(product => ({ ...product, addedToCart: false })));
      } catch (error) {
        // Handle error if needed
      }
    }

    fetchProductData();
  }, []);

  const handleAddToCart = product => {
    addToCart({ ...product, quantity: 1 });
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === product.id ? { ...p, addedToCart: true } : p
      )
    );
    setTimeout(() => {
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === product.id ? { ...p, addedToCart: false } : p
        )
      );
    }, 2000);
  };

  return (
    <div>
      <Header />
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <Link to={`/products/${product.id}`}>
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p className="price">${product.price}</p>
            </Link>
            <button onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
            {product.addedToCart && (
              <p className="added-to-cart-message">Product added to cart!</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;