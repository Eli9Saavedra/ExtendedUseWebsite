import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Use the useNavigate hook for redirection

const StripeCheckoutForm = ({ calculateTotal }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();  // Initialize navigate function for later use

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            console.error('Stripe has not loaded yet!');
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error('[error]', error.message);
            alert('Payment failed: ' + error.message);
            return;
        }

        try {
            const paymentDetails = {
                Amount: calculateTotal() * 100,  // Convert dollars to cents
                Currency: 'usd',
                PaymentMethodId: paymentMethod.id
            };

            const response = await axios.post('http://localhost:5248/api/payment/charge', paymentDetails, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data) {
                alert('Payment successful! Redirecting to home page...');  // Show a success message
                setTimeout(() => {
                    navigate('/');  // Redirect to home page after 2 seconds
                }, 2000);
            }
        } catch (chargeError) {
            console.error('Charge API Error:', chargeError);
            alert('Failed to process payment: ' + (chargeError.response?.data?.error?.message || 'Unknown error occurred'));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>Pay</button>
        </form>
    );
};

export default StripeCheckoutForm;
