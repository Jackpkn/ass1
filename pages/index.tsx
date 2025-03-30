// frontend/pages/index.tsx
import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '@/utils/axios'; // Import the configured axios instance

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get(`/api/products`); // Use 'api' instead of axios
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to the E-Commerce Store</h1>
      <p>Your one-stop shop for the best products available online. Explore our wide range of items and find what you love!</p>

      <h2>Featured Products</h2>
      <div className="product-list-container">
        <ul className="product-list">
          {products.map((product: any) => (
            <li key={product._id} className="product-card">
              <Link href={`/products/${product._id}`}>
                <h3>{product.name}</h3>
              </Link>
              <p>Price: ${product.price}</p>
              <button onClick={() => addToCart(product._id)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const addToCart = async (productId: string) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    alert("You need to log in to add items to the cart.");
    return;
  }

  try {
    await api.post(`/api/cart/add`, { productId, quantity: 1 }, { // Use 'api' instead of axios
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert("Product added to cart!");
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

export default HomePage;