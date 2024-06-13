import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddProduct() {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/add-product', {
                product_name: productName,
                description,
                price,
                quantity
            });
            console.log(response.data);
            // Reset form after successful submission
            setProductName('');
            setDescription('');
            setPrice('');
            setQuantity('');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div>
            <h2>Legg til matvare</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Produktnavn:
                    <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                </label>
                <br />
                <label>
                    Beskrivelse:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <br />
                <label>
                    Pris:
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} step="0.01" required />
                </label>
                <br />
                <label>
                    Antall:
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Legg til matvare</button>
            </form>
        </div>
    );
}

function Restock() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortCriteria, setSortCriteria] = useState({ key: '', order: '' });

    useEffect(() => {
        axios.get('http://localhost:5000/api/all-products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('There was an error fetching the products!', error));
    }, []);

    const orderProduct = (productId) => {
        axios.post('http://localhost:5000/api/order', { product_id: productId })
            .then(() => {
                // Update product list after ordering
                setProducts(products.map(product =>
                    product.product_id === productId ? { ...product, quantity: product.quantity - 1 } : product
                ));
            })
            .catch(error => console.error('There was an error ordering the product!', error));
    };

    const restockProduct = (productId) => {
        axios.post('http://localhost:5000/api/restock', { product_id: productId })
            .then(() => {
                // Update product list after restocking
                setProducts(products.map(product =>
                    product.product_id === productId ? { ...product, quantity: product.quantity + 1 } : product
                ));
            })
            .catch(error => console.error('There was an error restocking the product!', error));
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (key) => {
        let order = 'asc';
        if (sortCriteria.key === key && sortCriteria.order === 'asc') {
            order = 'desc';
        }
        setSortCriteria({ key, order });
    };

    const filteredProducts = products.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortCriteria.key) {
            if (sortCriteria.order === 'asc') {
                return a[sortCriteria.key] > b[sortCriteria.key] ? 1 : -1;
            } else {
                return a[sortCriteria.key] < b[sortCriteria.key] ? 1 : -1;
            }
        }
        return 0;
    });

    return (
        <div>
            <h2>Restock</h2>
            <input
                type="text"
                placeholder="Søk etter produkter..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <button onClick={() => handleSort('price')}>Sorter etter pris</button>
            <button onClick={() => handleSort('quantity')}>Sorter etter antall</button>
            <table>
                <thead>
                    <tr>
                        <th>Produktnavn</th>
                        <th>Beskrivelse</th>
                        <th>Pris</th>
                        <th>Antall</th>
                        <th>Bestill</th>
                        <th>Restock</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProducts.map(product => (
                        <tr key={product.product_id}>
                            <td>{product.product_name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td><button onClick={() => orderProduct(product.product_id)}>-</button></td>
                            <td><button onClick={() => restockProduct(product.product_id)}>+</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Page() {
    return (
        <>
            <AddProduct />
            <Restock />
        </>
    );
}

export default Page;
