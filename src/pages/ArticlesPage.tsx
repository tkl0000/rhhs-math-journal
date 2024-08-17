import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Filter from '../components/Filter.tsx';
import JournalCard from '../components/JournalCard.tsx';
import ArticleCard from '../components/ArticleCard.tsx';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_API_URL;
const test_url = "https://web.evanchen.cc/exams/sols-OTIS-Mock-AIME-2024.pdf";
const api_query = apiUrl + 'pdf/';

interface Article {
  name: string;
  author: string;
  year: number;
  path: string;
  isJournal: boolean;
  _id: string;
}

const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [_error, setError] = useState<string | null>(null);
  const [curFilter, setFilter] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<string>("")
  const [path, setPath] = useState<string>(test_url);

  const handleCardClick = (newPath: string) => {
    if (newPath === "") {
      return;
    }
    setPath(api_query + newPath);
    window.open(api_query + newPath);
  };

  const handleCardDelete = async (_id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this article? This action cannot be undone.");

    if (!isConfirmed) {
      return; // Exit the function if the user cancels the action
    }

    try {
      const response = await axios.delete(apiUrl + 'articles/' + _id);
      setArticles((prevArticles) => prevArticles.filter(article => article._id !== _id));
    } catch (err) {
      setError('Failed to Delete Article');
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(apiUrl + 'articles');
        setArticles(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load articles');
        setLoading(false);
      }
    };

    const fetchLogin = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(apiUrl + 'login', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        });
        setAuthenticated(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchLogin();
    fetchArticles();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <div></div>;
  }

  const filtered_articles = articles.filter(article =>
    !article.isJournal &&
    (article.name.toLowerCase().includes(curFilter.toLowerCase()) ||
      article.author.toLowerCase().includes(curFilter.toLowerCase()) ||
      article.year.toString().includes(curFilter)) &&
    (yearFilter == "" || article.year.toString() == yearFilter)
  );

  const filtered_journals = articles.filter(article => article.isJournal);

  return (
    <motion.main
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <main className="">
        <div className="flex-col justify-center w-auto m-4">
          <div className="flex justify-center text-black mx-4 h-fit mb-4">
            <Filter setFilter={setFilter} />
          </div>

          {/* Journals Row */}
          <div className="flex flex-row flex-wrap gap-4 text-slate-200 mx-4 h-fit">
            <AnimatePresence>
              {filtered_journals.map(article => (
                <motion.div
                  key={article._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <JournalCard
                    year={article.year}
                    onClick={() => handleCardClick(article.path)}
                    setYearFilter={setYearFilter}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Articles Section */}
          <div className="flex flex-wrap gap-4 text-slate-200 mx-4 mt-4 h-fit">
            <AnimatePresence>
              {filtered_articles.map(article => (
                <motion.div
                  key={article._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArticleCard
                    title={article.name}
                    content={article.author}
                    year={article.year}
                    _id={article._id}
                    authenticated={authenticated}
                    onClick={() => handleCardClick(article.path)}
                    onDelete={() => handleCardDelete(article._id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </motion.main>
  );
};

export default ArticlesPage;
