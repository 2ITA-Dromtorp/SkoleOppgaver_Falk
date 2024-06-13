import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('There was an error fetching the products!', error));
  }, []);

  useEffect(() => {
    // This function will run on every state change
    console.log('State changed:', products);
  }, [products]); // The array inside useEffect is the dependency list. If any of the values in this array change, the effect will run.

  const orderProduct = (productId) => {
    axios.post('http://localhost:5000/api/order', { product_id: productId })
      .then(() => {
        setProducts(products.map(product =>
          product.product_id === productId ? { ...product, quantity: product.quantity - 1 } : product
        ));
      })
      .catch(error => console.error('There was an error ordering the product!', error));
  };

  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cols = {};

  for (const item of filteredProducts) {
    if (item.product_name in cols) {
      cols[item.product_name].push(item);
    } else {
      cols[item.product_name] = [
        item
      ]
    }
  }

  return (
    <div className="products-container">
      <div>
        <input
          type="text"
          placeholder="Søk etter produkter..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {Object.entries(cols).map(([key, list]) => {
          return (
            <div>
              <h2>{key}</h2>
              <div className="product-list">
                {list.map(product => (
                  <div key={product.product_id} className="product-item">
                    <div className="product-details">
                      <p className="item-name">{product.description}</p>
                      <p className="item-quantity">Antall: {product.quantity}</p>
                      <p className="item-price">Pris: {product.price}kr</p>
                    </div>
                    <button onClick={() => orderProduct(product.product_id)} className="order-button">Bestill</button>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Products;
