// src/HomePage.js
// import React from 'react';

import Banner from '../components/Banner.tsx';
import { MathJax } from 'better-react-mathjax';
import ParallaxEquations from '../components/ParallaxEquations.tsx';
import anime from 'animejs'
import React, { useState, useEffect, useRef, ReactNode } from 'react';

const HomePage = () => {

  return (
    <main className="container mx-auto">
      <Banner />
      <div className="text-slate-200 text-xl">
        Lorem Ipsum
        {/* <p>Jajjajjajajajjajja</p>
            <MathJax>{"\\(\\frac{1x}{2x} \\neq 4 \\)"}</MathJax> */}
        {/* <ParallaxEquations /> */}
      </div>
    </main>
  );
};

export default HomePage;
