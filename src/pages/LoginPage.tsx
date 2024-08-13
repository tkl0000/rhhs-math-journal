// src/HomePage.js
// import React from 'react';

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import UploadForm from '../components/UploadForm.tsx';

const LoginPage = () => {

  return (
    <main className="container mx-auto">
      <div className="w-1/2 content-center text-slate-200 text-xl">
        Login type zoink
        <UploadForm />
      </div>
    </main>
  );
};

export default LoginPage;
