import React from 'react';

interface FilterProps {
  setFilter: (e: string) => void;
}

const Filter: React.FC<FilterProps> = ({ setFilter }) => {
  return (
    <div className="flex-grow flex flex-col justify-center items-end ">
      <input type="text"
        className="w-full flex-grow py-3 pl-10 pr-4 text-slate-200 bg-slate-800 border-2 rounded-2xl focus:outline-none hover:shadow-2xl focus:shadow-2xl transition-all"
        placeholder="Search title, author, year..."
        onChange={(e) => setFilter(e.target.value)}></input>
    </div>
  )
}

{/* <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> */ }


export default Filter;