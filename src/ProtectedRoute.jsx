
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, token, ...rest }) => {
  // Check if a token is present; render the component if true, otherwise redirect to the login page
  return token ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
