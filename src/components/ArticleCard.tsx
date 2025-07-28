import { motion } from 'framer-motion';
import React from 'react';

interface ArticleCardProps {
    title: string;
    content: string;
    year: number;
    id: number;
    authenticated: boolean;
    onClick: () => void;
    onDelete: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, content, year, authenticated, onClick, onDelete }) => {
    return (
        <motion.div 
            onClick={onClick} 
            className=" bg-slate-200 max-w-sm rounded overflow-hidden m-4 h-40 w-96 shadow-none transition-shadow duration-150 hover:shadow-white hover:shadow-lg"
        > 
            <div className="absolute top-2 right-2 bg-gray-700 text-white text-xs rounded-full px-2 py-1 invisible"> 
                {year}
            </div>
            <div className="px-6 py-4">
                <div className="text-gray-800 font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{content}</p>
            </div>
            {authenticated ? (<button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the onClick event for the card
                    onDelete();
                }}
                className="absolute bottom-2 right-2 bg-red-500 text-white text-xs rounded-full px-3 py-1"
            >
                Delete
            </button>) : (<></>)}

        </motion.div>
    );
};

export default ArticleCard;
