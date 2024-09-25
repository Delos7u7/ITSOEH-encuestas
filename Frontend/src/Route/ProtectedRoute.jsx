import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:8080/check-auth', {
                    method: 'GET',
                    credentials: 'include', 
                });
                const data = await response.json();
                console.log('Authentication response:', data);
                setIsAuthenticated(data.authenticated);
                
            } catch (error) {
                console.error('Error checking authentication:', error);
                setIsAuthenticated(false);
            }
        };
    
        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/iniciarSesion" replace />;
    }

    return element;
};

export default ProtectedRoute;