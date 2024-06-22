// src/HomePage.js
// import React from 'react';

import Viewport from '../components/Viewport.tsx'
import Filter from '../components/Filter.tsx'
import ArticleCard from '../components/ArticleCard.tsx';
import { useState } from 'react';


const ArticlesPage = () => {

  const [curFilter, setFilter] = useState("")

  return (
    <main className="">
      <div className="flex-col justify-center w-auto m-4">
        <div className='flex justify-center text-slate-200 mb-9 text-6xl'>
          Search for awesome articles!
        </div>
        <div className="flex justify-center text-black mx-4 h-fit mb-4">
          <Filter setFilter={setFilter} />
        </div>
        <div className="flex justify-center text-slate-200 mx-4 space-x-4 h-fit">
          <ArticleCard title={curFilter} content="Type Meep <3" />
          <ArticleCard title="Hello" content="OESOHGUIOSHEOGHOSE LOREM IPSUM GAAAAAASHUOAHOUHAOHOHH" />
        </div>
      </div>
    </main>
  );
};

export default ArticlesPage;
