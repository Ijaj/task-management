/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/Auth';
import axios from 'axios';

export const ProtectedRoute = ({ children }) => {
  const { login, logout, getUser } = useAuth();
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const url = `${process.env.REACT_APP_HOST}/user/validate`;

  useEffect(() => {
    const validateUser = async () => {
      const activeUser = getUser();

      if (!activeUser) {
        setIsValidating(false);
        return;
      }

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${activeUser.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        }
        else if (response.status === 401) {
          console.log('User validation failed, redirecting to login');
          setIsAuthenticated(false);
          logout();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsValidating(false);
      }
    };

    validateUser();
  }, [url, login, logout, getUser]);

  if (process.env.NODE_ENV === 'development') {

  } else {
    if (isValidating) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return <Navigate to="/auth/login" replace />;
    }
  }

  return children;
};