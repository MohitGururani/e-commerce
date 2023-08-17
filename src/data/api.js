// services/api.js
import axios from 'axios';

const baseURL = 'https://fakestoreapi.com';

const api = axios.create({
  baseURL,
});

export const fetchProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// You can add more API functions here

export default api;
