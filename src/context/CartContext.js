import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

// Initial state with an empty items array
const initialState = {
    items: []
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            // Check if item already exists
            const existing = state.items.find(item => item.id === action.payload.id);
            if (existing) {
                // Increase the quantity
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
                    )
                };
            } else {
                // Add new item
                return {
                    ...state,
                    items: [...state.items, { ...action.payload, qty: 1 }]
                };
            }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id)
            };
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
