import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Filter from '../components/Filter.tsx';
import JournalCard from '../components/JournalCard.tsx';
import ArticleCard from '../components/ArticleCard.tsx';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_API_URL;
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
  const [yearFilter, setYearFilter] = useState<string>("");

  const handleCardClick = (newPath: string) => {
    if (newPath === "") {
      return;
    }
    window.open(api_query + newPath);
  };

  const handleCardDelete = async (_id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this article? This action cannot be undone.");

    if (!isConfirmed) {
      return; // Exit the function if the user cancels the action
    }

    try {
      setArticles((prevArticles) => prevArticles.filter(article => article._id !== _id));
      const response = await axios.delete(apiUrl + 'articles/' + _id);
      console.log(response.data);
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
        console.log(response.data);
        setAuthenticated(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogin();
    fetchArticles();
  }, []);

  if (loading) {
    return <></>
  }

  const filtered_articles = articles.filter(article =>
    !article.isJournal &&
    (article.name.toLowerCase().includes(curFilter.toLowerCase()) ||
      article.author.toLowerCase().includes(curFilter.toLowerCase()) ||
      article.year.toString().includes(curFilter)) &&
    (yearFilter === "" || article.year.toString() === yearFilter)
  );

  const filtered_journals = articles.filter(article => article.isJournal);

  return (
    <motion.main
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <main className="px-4 py-6 md:px-8">
        <div className="flex flex-col w-full space-y-4">
          <div className="flex justify-center mb-4 w-full sm:w-3/4 md:w-2/3 lg:w-2/3 mx-auto">
            <Filter setFilter={setFilter} />
          </div>

          {/* Journals Row */}
          <div className="flex justify-center flex-row flex-wrap gap-2 text-slate-200">
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
                    authenticated={authenticated}
                    onClick={() => handleCardClick(article.path)}
                    onDelete={() => handleCardDelete(article._id)}
                    setYearFilter={setYearFilter}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Articles Section */}
          <div className="flex justify-center flex-wrap gap- text-slate-200 mt-4">
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
