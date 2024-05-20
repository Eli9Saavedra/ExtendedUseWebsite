import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { Button, Table, Form, Modal, Alert } from 'react-bootstrap';
import '../styles/AdminPage.css';
import { HubConnectionBuilder } from '@microsoft/signalr';

const AdminPage = () => {
    const { user } = useUser();
    const [products, setProducts] = useState([]);
    const [showProductModal, setShowProductModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', variant: 'success' });

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl("http://localhost:5000/orderhub")
            .build();

        connection.start()
            .then(() => console.log("Connected to the hub"))
            .catch(err => console.error('Error while connecting to hub ', err));

        connection.on("ReceiveOrderUpdate", (order) => {
            console.log("New order received:", order);
            // Update state or display notification
        });

        return () => {
            connection.stop();
        };
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5248/api/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products: ' + response.status);
            }
            const data = await response.json();
            if (Array.isArray(data)) {
                setProducts(data);
            } else {
                throw new Error("Received data is not an array");
            }
        } catch (error) {
            console.error('Fetch products error:', error);
            setProducts([]); // Reset to an array on error
        }
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', e.target.name.value);
        formData.append('price', e.target.price.value);
        formData.append('description', e.target.description.value);

        if (e.target.imageURL.value) {
            formData.append('imageURL', e.target.imageURL.value);
        } else if (e.target.image.files[0]) {
            formData.append('file', e.target.image.files[0]);
        }

        const isEditing = currentProduct && currentProduct.id;
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `http://localhost:5248/api/products/${currentProduct.id}` : `http://localhost:5248/api/products`;

        try {
            const response = await fetch(url, {
                method: method,
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                fetchProducts();  // Refetch products to update the list
                setShowProductModal(false);
                setAlertInfo({ show: true, message: 'Product has been successfully added!', variant: 'success' });
            } else {
                const errorResponse = await response.text();
                setAlertInfo({ show: true, message: "Failed to submit product: " + errorResponse, variant: 'danger' });
            }
        } catch (error) {
            console.error('Handle product submit error:', error);
            setAlertInfo({ show: true, message: "An error occurred while submitting the product.", variant: 'danger' });
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5248/api/products/${productId}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to delete product: ' + response.status);
            }
            fetchProducts();
        } catch (error) {
            console.error('Delete product error:', error);
            setAlertInfo({ show: true, message: "Failed to delete product.", variant: 'danger' });
        }
    };

    const openProductModal = (product = null) => {
        setCurrentProduct(product);
        setShowProductModal(true);
    };

    const closeModal = () => {
        setCurrentProduct(null);
        setShowProductModal(false);
    };

    return (
        <div>
            {user ? (
                <>
                    <h1>Welcome, {user.fullName}</h1>
                    {alertInfo.show && (
                        <Alert variant={alertInfo.variant} onClose={() => setAlertInfo({ ...alertInfo, show: false })} dismissible>
                            {alertInfo.message}
                        </Alert>
                    )}
                    <Button className="addButton" onClick={() => openProductModal()}>Add New Product</Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>
                                        <Button className="editButton" onClick={() => openProductModal(product)}>Edit</Button>
                                        <Button className="deleteButton" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                                    </td>
                                </tr>
                            )) : <tr><td colSpan="3">No products found or unable to load products.</td></tr>}
                        </tbody>
                    </Table>
                    <Modal show={showProductModal} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{currentProduct ? 'Edit Product' : 'Add Product'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleProductSubmit}>
                                <Form.Group>
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control type="text" name="name" defaultValue={currentProduct?.name || ''} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="number" name="price" defaultValue={currentProduct?.price || ''} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" name="description" defaultValue={currentProduct?.description || ''} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Product Image (JPEG only)</Form.Label>
                                    <Form.Control type="text" name="imageURL" placeholder="Or enter image URL" />
                                    <Form.Control type="file" name="image" accept=".jpg, .jpeg" />
                                </Form.Group>
                                <Button type="submit" className="addButton">Save</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
            ) : (
                <h1>Not authorized</h1>
            )}
        </div>
    );
};

export default AdminPage;
