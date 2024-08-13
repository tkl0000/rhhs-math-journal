// src/HomePage.js
// import React from 'react';

import Viewport from '../components/Viewport.tsx'
import Filter from '../components/Filter.tsx'
import ArticleCard from '../components/ArticleCard.tsx';
import { useState, useEffect } from 'react';

import axios from 'axios';

const test_url = "https://web.evanchen.cc/exams/sols-OTIS-Mock-AIME-2024.pdf";
const api_query = "http://localhost:3000/articles/pdf/"


interface Article {
  name: string;
  author: string;
  year: number;
  path: string;
}

const ArticlesPage = () => {

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [curFilter, setFilter] = useState<string>("");
  const [path, setPath] = useState<string>(test_url);
  const filtered: JSX.Element[] = [];

  const handleCardClick = (newPath: string) => {
    setPath(api_query + newPath);
    console.log(path)
  };

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/articles');
        console.log(response.data)
        setArticles(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load articles');
        setLoading(false);
      }
    };

    fetchArticles();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  articles.forEach(article => {
    if (article.name.toLowerCase().indexOf(curFilter) != -1 || article.author.toLowerCase().indexOf(curFilter) != -1 || article.year.toString().indexOf(curFilter) != -1) {
      filtered.push(<ArticleCard key={article.name} title={article.name} content={article.author} year={article.year} onClick={() => handleCardClick(article.path)} />)
    }
  })

  return (
    <main className="">
      <div className="flex-col justify-center w-auto m-4">
        <div className='flex justify-center text-slate-200 mb-9 text-6xl'>
          Search for awesome articles!
        </div>
        <div className="flex justify-center text-black mx-4 h-fit mb-4">
          <Filter setFilter={setFilter} />
        </div>
        <div className="flex justify-center flex-wrap gap-4 text-slate-200 mx-4 h-fit">
          {filtered}
        </div>
        <Viewport filename={path} />
      </div>
    </main>
  );
};

export default ArticlesPage;
