import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
// import logo from '/src/assets/logo.svg';
import logo from '../assets/logo.svg';
const svg_url = logo;

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
            delay: function (_el, i) { return i * 50 },
            direction: 'alternate',
            loop: false,
          });
        }
      });

  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center md:space-x-4 shadow-lg rounded-lg bg-slate-600 p-6 md:p-12 mb-6 max-w-full mx-4 md:mx-0">
      {/* SVG Container - Hidden on Mobile */}
      <div className='hidden md:block h-auto w-full md:w-auto'>
        <div className='max-h-full' ref={svgContainerRef}></div>
      </div>
      <div className="flex-1"></div>
      <div className="text-slate-200 text-4xl md:text-8xl text-center md:text-right">
        <h1>Welcome!</h1>
      </div>
    </div>
  );
}

export default Banner;
