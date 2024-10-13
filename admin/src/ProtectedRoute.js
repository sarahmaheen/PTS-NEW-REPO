import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token'); // Get the token from local storage

  // If the token does not exist, redirect to the login page
  return token ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
