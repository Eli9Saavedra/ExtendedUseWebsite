import axios from 'axios';

const API_BASE_URL = 'http://localhost:5248/api';

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
};

export const fetchProduct = async (productId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch product:', error);
        throw error;
    }
};

export const processPayment = async (paymentDetails) => {
    try {
        const response = await axios.post('http://localhost:5248/api/payment/charge', paymentDetails);
        return response.data;
    } catch (error) {
        console.error('Failed to process payment:', error);
        throw error;
    }
};


