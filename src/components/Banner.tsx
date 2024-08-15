import React, { useEffect, useRef } from 'react';
import anime from 'animejs'
import Transition from './Transition';

const svg_url = 'src/assets/logo.svg';

const Banner: React.FC = () => {

  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch the SVG file and insert it into the DOM
    fetch(svg_url)
      .then(response => response.text())
      .then(svgText => {
        if (svgContainerRef.current) {
          svgContainerRef.current.innerHTML = svgText;
          anime({
            targets: svgContainerRef.current.querySelectorAll('path'),
            fill: ['transparent', '#E2E8F0'],
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 1500,
            delay: function (el, i) { return i * 50 },
            direction: 'alternate',
            loop: false,
          });
        }
      });

  }, []);

  return (
    <div className="flex items-center space-x-4 shadow-lg rounded-lg bg-slate-600 p-12 mb-6 max-w-screen">
      {/* <img src="src/assets/logo.svg" alt="Logo" className="brightness-0 invert h-96" id="logo"></img> */}

      <div className='h-auto'>

        <div className='max-h-full' ref={svgContainerRef}></div>
      </div>
      <div className="flex-1"></div>
      <div className="text-slate-200 text-8xl justify-self-end">
        <h1>Welcome!</h1>
      </div>
    </div>
  );
}

export default Banner;