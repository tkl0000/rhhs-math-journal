import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import UploadForm from '../components/UploadForm.tsx';
import LoginForm from '../components/LoginForm.tsx';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_API_URL;

const LoginPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl + 'login', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });
      setAuthenticated(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="m-6">
        {authenticated ? (
          <UploadForm />
        ) : (
          <LoginForm setToken={setToken} />
        )}
      </div>
    </motion.main>
  );
};

export default LoginPage;
