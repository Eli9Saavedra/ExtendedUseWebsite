import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AdminModal = ({ show, onHide }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleAccess = () => {
        if (password === "admin") {  // Check if the password is correct
            onHide(true);  // Proceed to show admin features
        } else {
            setError('Incorrect password.');
        }
    };

    return (
        <Modal show={show} onHide={() => onHide(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Admin Access</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Enter Admin Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            isInvalid={!!error}
                        />
                        <Form.Control.Feedback type="invalid">
                            {error}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onHide(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAccess}>
                    Access Admin
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AdminModal;
