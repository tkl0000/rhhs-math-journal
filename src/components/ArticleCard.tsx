import React from 'react';

interface ArticleCardProps {
    title: string;
    content: string;
    year: number;
    onClick: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, content, year, onClick }) => {
    return (
        <div onClick={onClick} className=" bg-slate-200 max-w-sm rounded overflow-hidden shadow-lg m-4 transform transition-transform hover:-translate-y-1 h-36 w-64">
            <div className="absolute top-2 right-2 bg-gray-700 text-white text-xs rounded-full px-2 py-1">
                {year}
            </div>
            <div className="px-6 py-4">
                <div className="text-gray-800 font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{content}</p>
            </div>
        </div>
    );
};

export default ArticleCard;
