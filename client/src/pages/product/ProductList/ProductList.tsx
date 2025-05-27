import { useEffect, useState } from 'react';
import './ProductList.css';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price: number;
  quantity: number;
  image: string;
}

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  return (
    <div className="products-wrapper">
      <h2>All Products</h2>
      {products.length === 0 && <p>No products found</p>}
      <div className="products-grid">
        {products.map(product => (
            <Link to={`/products/${product.id}`} key={product.id} className="product-card">
                    <img 
                        src={`http://localhost:3001/uploads/${product.image}`}
                        alt={product.name} 
                        className="product-card__image"
                        width="150"
                    />
                    <div className="product-card__title">{product.name}</div>
                    <div className="product-card__price">
                    ${product.discount_price < product.price ? product.discount_price : product.price}
                    {product.discount_price < product.price && (
                        <span className="discount">${product.price}</span>
                    )}
                    </div>
                    <p>{product.description}</p>
                    <p>In stock: {product.quantity}</p>
            </Link>
        ))}
      </div>
    </div>
  );
};
