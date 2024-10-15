// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        // Retourner un spinner ou un composant de chargement pendant l'état de chargement
        return <div>Chargement...</div>;
    }

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
