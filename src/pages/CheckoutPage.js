import React from 'react';
import { useCart } from '../context/CartContext';
import StripeCheckoutForm from '../components/StripeCheckout/StripeCheckoutForm'; // Import the StripeCheckoutForm
import '../styles/CheckoutPage.css';  // Ensure the CSS path is correct

function CheckoutPage() {
    const { cart } = useCart();

    const calculateTotal = () => {
        return cart.items.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2);
    };

    if (cart.items.length === 0) {
        return <div className="checkout-message"><p>Your cart is empty</p></div>;
    }

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <div className="checkout-form">
                <div className="shipping-details">
                    <h2>Shipping Details</h2>
                    <input type="text" placeholder="Full Name" required />
                    <input type="text" placeholder="Address" required />
                    <input type="text" placeholder="City" required />
                    <input type="text" placeholder="Postal Code" required />
                    <input type="text" placeholder="Country" required />
                </div>
                <div className="cart-summary">
                    <h2>Order Summary</h2>
                    {cart.items.map(item => (
                        <div key={item.id} className="cart-item">
                            <span>{item.name} - ${item.price} x {item.qty}</span>
                            <span>${(item.price * item.qty).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="total">
                        <strong>Total: ${calculateTotal()}</strong>
                    </div>
                </div>
                <div className="payment-section">
                    <h2>Payment Information</h2>
                    <StripeCheckoutForm calculateTotal={calculateTotal} />
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;

