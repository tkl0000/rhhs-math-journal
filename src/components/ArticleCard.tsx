import React from 'react';

interface ArticleCardProps {
    title: string;
    content: string;
    imageUrl?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, content, imageUrl }) => {
    return (
        <div className=" bg-slate-200 max-w-sm rounded overflow-hidden shadow-lg m-4 transform transition-transform hover:-translate-y-1">
            <div className="px-6 py-4">
                <div className="text-gray-800 font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{content}</p>
            </div>
        </div>
    );
};

export default ArticleCard;
