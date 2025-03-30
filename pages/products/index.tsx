// frontend/pages/products/index.tsx
import { useEffect, useState } from 'react';
import api from '@/utils/axios'; // Import the configured axios instance
import Link from 'next/link';
import { Product } from '@/types/product';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get<Product[]>(`/api/products`, { // Use 'api' instead of axios
          params: { search },
        });
        setProducts(response.data);
        setError(null);
      } catch (error: any) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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

  return (
    <div className="product-list-container">
      <h1>Products</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

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
  );
};



export default ProductsPage;