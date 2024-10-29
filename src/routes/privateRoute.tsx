import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    element: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const token = localStorage.getItem('access_token'); // Replace with your token key

    return token ? element : <Navigate to="/login" />;
};

// export default PrivateRoute;