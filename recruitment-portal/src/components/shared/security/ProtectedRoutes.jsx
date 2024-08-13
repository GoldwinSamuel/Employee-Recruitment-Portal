import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, Logged, allowedRoles, ...rest }) => {
  const isAuthenticated = Logged?.authenticated; 
  const hasAccess = allowedRoles.includes(Logged?.role); 

  return isAuthenticated && hasAccess ? (
    <Component {...rest} /> 
  ) : (
    <Navigate to="/home" replace /> 
  );
};

export default ProtectedRoute;
