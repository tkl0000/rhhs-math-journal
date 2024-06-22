// src/HomePage.js
// import React from 'react';

import Viewport from '../components/Viewport.tsx'
import Filter from '../components/Filter.tsx'
import ArticleCard from '../components/ArticleCard.tsx';


const ArticlesPage = () => {
  return (
    <main>
      <div className="flex text-slate-200 mx-4 space-x-4 h-fit">
        {/* <div className='flex-2 mb-4'>
          <Viewport />
        </div>
        <div className='flex-1'>
          <Filter />
        </div> */}
        <ArticleCard title="Hello" content="OESOHGUIOSHEOGHOSE LOREM IPSUM GAAAAAASHUOAHOUHAOHOHH" />
      </div>
    </main>
  );
};

export default ArticlesPage;
