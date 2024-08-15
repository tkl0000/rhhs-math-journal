// src/HomePage.js
// import React from 'react';

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import UploadForm from '../components/UploadForm.tsx';
import LoginForm from '../components/LoginForm.tsx';
import axios from 'axios';

const LoginPage = () => {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [authenticated, setAuthentication] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/articles/login', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });
      setAuthentication(true)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  if (authenticated) {
    return (<main className="container mx-auto">
      <div className="m-6">
        <UploadForm />
      </div>
    </main>)
  }
  else {
    return (
      <main className="container mx-auto">
        <div className="m-6">
          <LoginForm setToken={setToken} />
        </div>
      </main>
    )
  }
};

export default LoginPage;
