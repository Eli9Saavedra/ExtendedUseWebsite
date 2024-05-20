import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useUser } from '../../context/UserContext';  // Ensure this is correctly set up
import { useNavigate } from 'react-router-dom';
import AdminModal from '../AdminModal/AdminModal';

const NavigationBar = () => {
    const { user, logout } = useUser();  // Use the user context
    const [showAdminModal, setShowAdminModal] = useState(false);
    const navigate = useNavigate();

    const handleAdminAccess = (hasAccess) => {
        setShowAdminModal(false);
        if (hasAccess) {
            navigate('/admin');  // Redirect to the Admin page
        }
    };

    return (
        <>
            <Navbar bg="light" expand="lg" sticky="top">
                <Navbar.Brand href="/">ExtendedUse</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/products">
                            <Nav.Link>Products</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/cart">
                            <Nav.Link>Cart</Nav.Link>
                        </LinkContainer>
                        {user ? (
                            <NavDropdown title={`Welcome ${user.fullName}`} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={logout}>Sign Out</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => setShowAdminModal(true)}>Admin</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <NavDropdown title="Account" id="basic-nav-dropdown">
                                <LinkContainer to="/login">
                                    <NavDropdown.Item>Login</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/register">
                                    <NavDropdown.Item>Register</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <AdminModal show={showAdminModal} onHide={handleAdminAccess} />
        </>
    );
};

export default NavigationBar;
