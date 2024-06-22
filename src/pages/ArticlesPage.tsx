// src/HomePage.js
// import React from 'react';

import Viewport from '../components/Viewport.tsx'
import Filter from '../components/Filter.tsx'
import ArticleCard from '../components/ArticleCard.tsx';
import { useState } from 'react';

// TODO : integrate with backend
const data = [
  { title: 'article1', author: 'alex michos' },
  { title: 'article2', author: 'advik rai' },
  { title: 'article3', author: 'clark hu' },
  { title: 'article4', author: 'thomas li' },
  { title: 'article5', author: 'donald zhu' },
  { title: 'article6', author: 'athena devavish' },
]



const ArticlesPage = () => {

  const [curFilter, setFilter] = useState<string>("");
  const filtered: JSX.Element[] = [];

  data.forEach(article => {
    if (article.title.toLowerCase().indexOf(curFilter) != -1 || article.author.toLowerCase().indexOf(curFilter) != -1) {
      filtered.push(<ArticleCard key={article.title} title={article.title} content={article.author} />)
    }
  })

  return (
    <main className="">
      <div className="flex-col justify-center w-auto m-4">
        <div className="flex justify-center text-black mx-4 h-fit mb-4">
          <Filter setFilter={setFilter} />
        </div>
        <div className="flex justify-center flex-wrap gap-4 text-slate-200 mx-4 h-fit">
          {filtered}
        </div>
      </div>
    </main>
  );
};

export default ArticlesPage;
