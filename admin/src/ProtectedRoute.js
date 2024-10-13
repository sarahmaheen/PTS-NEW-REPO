import React from 'react';
import { Navigate } from 'react-router-dom';

// This component checks for an admin token and redirects if the user is not authenticated
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  
  return token ? element : <Navigate to="/admin-login" />; // If token exists, render the route; else redirect to login
};

export default ProtectedRoute;
