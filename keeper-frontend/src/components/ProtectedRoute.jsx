import React from 'react';
import {Navigate} from "react-router-dom";
import {useAuth} from "../AuthContext.jsx";
import { CircularProgress } from '@mui/material';
import '../CSS/ProtectedRoute.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <CircularProgress size={60} />
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;