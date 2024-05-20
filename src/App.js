import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import NavigationBar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// It's important to ensure that the Stripe key here is kept secure and used only in a safe manner
const stripePromise = loadStripe('pk_test_51NtEdPIHt1D97lqHDbfyZkPTREhM98Z9VLBi8Q3zNrVLRBffxPgZ9huo4SEkuI7QPAYAvbROyu8bq7f6PqyKHsKX00FbfNksI4');

function App() {
    return (
        <UserProvider>
            <CartProvider>
                <Router>
                    <NavigationBar />
                    <Elements stripe={stripePromise}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/products" element={<ProductPage />} />
                            <Route path="/products/:productId" element={<ProductDetailPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/admin" element={<AdminPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                        </Routes>
                    </Elements>
                </Router>
            </CartProvider>
        </UserProvider>
    );
}

export default App;
