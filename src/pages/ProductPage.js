import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap'; // Import necessary components
import { fetchProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import '../styles/ProductsPage.css';

function ProductPage() {
    const [products, setProducts] = useState([]);
    const { dispatch } = useCart();
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        fetchProducts().then(setProducts);
    }, []);

    const addToCart = (product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
        }, 3000);
    };

    return (
        <div className="product-page-container">
            <h1 className="product-page-header">Products</h1>
            {showConfirmation && <div className="confirmation-message">Product added to cart!</div>}
            <Row xs={1} md={2} lg={3} className="g-4">
                {products.map((product) => (
                    <Col key={product.id}>
                        <Card>
                            <Card.Img variant="top" src={product.imageUrl} />
                            <Card.Body>
                                <Card.Title>${product.price}</Card.Title>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Button variant="primary" onClick={() => addToCart(product)}>
                                    Add to Cart
                                </Button>
                                <Link to={`/products/${product.id}`} className="btn btn-secondary">
                                    View Details
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default ProductPage;
