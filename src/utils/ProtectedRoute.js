import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');  // Get token from local storage
    return token ? children : <Navigate to="/login" replace />;  // Redirect to login if no token
};

export default ProtectedRoute;
