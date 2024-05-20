import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/CartPage.css';

function CartPage() {
    const navigate = useNavigate();
    const { cart, dispatch } = useCart();

    const goToCheckout = () => {
        if (cart.items.length > 0) {
            navigate('/checkout');
        } else {
            alert('Your cart is empty.');
        }
    };

    const handleRemoveItem = (itemId) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { id: itemId } });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Your Cart</h2>
            {cart.items.length > 0 ? (
                <ul className="list-group mb-3">
                    {cart.items.map((item) => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {item.name} ({item.qty})
                            <button className="btn btn-danger btn-sm" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
            <button className="btn btn-primary" onClick={goToCheckout} disabled={cart.items.length === 0}>Checkout</button>
        </div>
    );
}

export default CartPage;
