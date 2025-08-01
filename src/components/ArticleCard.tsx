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
        <div
            onClick={onClick} 
            className=" bg-slate-200 max-w-sm rounded-xl overflow-hidden m-4 h-40 w-96 shadow-none transition-shadow duration-150 hover:shadow-black hover:shadow-lg cursor-pointer"
        > 
            <div className="top-2 right-2 bg-gray-700 text-white text-xs rounded-full px-2 py-1 invisible"> 
                {year}
            </div>
            <div className="px-6 py-4 flex flex-col">
                <div className="flex flex-row w-full">
                    <div className="text-gray-800 font-bold text-xl mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                        {title}
                    </div>
                    <div className="ml-auto">
                        {authenticated ? (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering the onClick event for the card
                                    onDelete();
                                }}
                                className="bottom-2 right-2 bg-red-500 text-white text-xs rounded-full px-3 py-1 justify-self-end" 
                            >
                            Delete
                        </button>) : (<></>)}
                    </div>
                </div>
                <p className="text-gray-700 text-base">{content}</p>
            </div>
        </div>
    );
};

export default ArticleCard;
