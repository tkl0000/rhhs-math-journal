import React, { useState } from 'react';

interface ArticleCardProps {
    year: number;
    onClick: () => void;
    setYearFilter: (newYear: string) => void;
    authenticated: boolean;
    onDelete: () => void;
}

const JournalCard: React.FC<ArticleCardProps> = ({ year, onClick, setYearFilter, onDelete, authenticated }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
        if (!isDropdownOpen) {
            setYearFilter(year.toString())
            console.log("changed year to ", { year })
        }
        else {
            setYearFilter("");
        }
        // add filters type meep
    };


    return (
        <>
            <div
                onClick={onClick}
                className="bg-slate-200 max-w-sm rounded overflow-hidden shadow-lg m-4 h-16 w-80 flex items-center justify-between relative transform transition-transform hover:-translate-y-1"
            >
                <div className="px-6 py-4 flex-1">
                    <div className="flex items-center text-gray-800 font-bold text-xl">
                        {year}
                        <svg className="h-5 w-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                        </svg>
                    </div>
                </div>

                <div>
                {authenticated ? (<button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the onClick event for the card
                    onDelete();
                }}
                className="absolute bottom-2 right-2 bg-red-500 text-white text-xs rounded-full px-3 py-1 hover:bg-red-600"
            >
                Delete
            </button>) : (<></>)}
                </div>
                
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="text-gray-800 focus:outline-none px-4"
                    >
                        <svg
                            className={`w-5 h-5 transform transition-transform duration-300 ${!isDropdownOpen ? 'rotate-180' : ''}`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />

                        </svg>
                    </button>
                    
                </div>
            </div>
        </>
    )
};

export default JournalCard;
