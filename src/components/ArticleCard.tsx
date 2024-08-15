import React from 'react';

interface ArticleCardProps {
    title: string;
    content: string;
    year: number;
    _id: string;
    onClick: () => void;
    onDelete: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, content, year, onClick, onDelete }) => {
    return (
        <div onClick={onClick} className=" bg-slate-200 max-w-sm rounded overflow-hidden shadow-lg m-4 transform transition-transform hover:-translate-y-1 h-36 w-64">
            <div className="absolute top-2 right-2 bg-gray-700 text-white text-xs rounded-full px-2 py-1">
                {year}
            </div>
            <div className="px-6 py-4">
                <div className="text-gray-800 font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{content}</p>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the onClick event for the card
                    onDelete();
                }}
                className="absolute bottom-2 right-2 bg-red-500 text-white text-xs rounded-full px-3 py-1 hover:bg-red-600"
            >
                Delete
            </button>
        </div>
    );
};

export default ArticleCard;
