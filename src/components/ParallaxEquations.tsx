import React, { useEffect, useRef } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const equations = [
    'E = mc^2',
    'a^2 + b^2 = c^2',
    '\\frac{d}{dx}',
    '\\int f(x) \\, dx',
    '\\sum_{n=1}^{\\infty}',
    '\\vec{F} = m \\vec{a}',
    'e^{i\\pi} + 1 = 0',
    '\\nabla \\cdot \\vec{E} = \\frac{\\rho}{\\epsilon_0}',
];

const ParallaxEquations: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const xPos = (clientX / innerWidth) * 2 - 1;
            const yPos = (clientY / innerHeight) * 2 - 1;

            const layers = containerRef.current?.querySelectorAll('.equation');
            layers?.forEach((layer, index) => {
                const depth = index / 10;
                const xOffset = xPos * depth * 50;
                const yOffset = yPos * depth * 50;
                (layer as HTMLDivElement).style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <MathJaxContext>
            <div ref={containerRef} className="relative w-full h-screen bg-slate-200 rounded-lg p-4 overflow-hidden">
                {equations.map((equation, index) => (
                    <div
                        key={index}
                        className={`equation absolute text-xl text-black`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    >
                        <MathJax inline dynamic>{`\\(${equation}\\)`}</MathJax>
                    </div>
                ))}
            </div>
        </MathJaxContext>
    );
};

export default ParallaxEquations;
