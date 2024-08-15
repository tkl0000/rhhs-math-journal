import React, { useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface TransitionProps {
    children: ReactNode;
    enter: string;
    exit: string;
}

const Transition: React.FC<TransitionProps> = ({ children, enter, exit }) => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [currentChildren, setCurrentChildren] = useState(children);
    const location = useLocation();

    useEffect(() => {
        setIsTransitioning(true);
        const timeout = setTimeout(() => {
            setCurrentChildren(children);
            setIsTransitioning(false);
        }, 0); // Adjust this duration if necessary

        return () => clearTimeout(timeout);
    }, [children, location]);

    return (
        <div>
            {currentChildren}
        </div>
    )

    return (
        <div className={`${isTransitioning ? exit : enter}`}>
            {currentChildren}
        </div>
    );
};

export default Transition;
