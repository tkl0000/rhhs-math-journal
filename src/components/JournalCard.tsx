import React, { useState } from 'react';

interface ArticleCardProps {
    year: number;
    setYearFilter: (newYear: string) => void;
}

const JournalCard: React.FC<ArticleCardProps> = ({ year, setYearFilter }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [highlight, setHighlight] = useState(false)

    const toggleDropdown = () => {
        // e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
        if (!isDropdownOpen) {
            setYearFilter(year.toString())
            setHighlight(true)
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
                onClick={toggleDropdown}
                className=" max-w-sm rounded overflow-hidden flex items-center justify-between relative cursor-pointer"
            >
                <div className="pr-6 py-4 flex-1 flex items-center font-bold text-3xl transition-all">
                    <div 
                        className={highlight ? "text-slate-200 transition-all" : "text-slate-400 transition-all"}
                        onMouseOver={() => {
                            setHighlight(true)
                        }}
                        onMouseLeave={() => {
                            if (!isDropdownOpen) {
                                setHighlight(false)
                            }
                        }}
                    >
                        {year}
                    </div>
                </div>

                <div>
                {/* {authenticated ? (<button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the onClick event for the card
                    onDelete();
                }}
                className="absolute bottom-2 right-2 bg-red-500 text-white text-xs rounded-full px-3 py-1 hover:bg-red-600"
            >
                Delete
                </button>) : (<></>)} */}
            </div>
                
                {/* <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="text-slate-200 focus:outline-none px-4"
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
                    
                </div> */}
            </div>
        </>
    )
};

export default JournalCard;
