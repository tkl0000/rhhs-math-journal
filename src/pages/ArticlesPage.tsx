import { useState, useEffect } from 'react';
import { motion, AnimatePresence, easeOut } from 'framer-motion';
import Filter from '../components/Filter.tsx';
import JournalCard from '../components/JournalCard.tsx';
import ArticleCard from '../components/ArticleCard.tsx';
import {Article} from '../types/Article.tsx'
import Year from '../components/Year.tsx'
import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_API_URL;
// const api_query = apiUrl + 'pdf/';

const ArticlesPage = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [articles, setArticles] = useState<Article[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [_error, setError] = useState<string | null>(null);
  const [curFilter, setFilter] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<string>("");

  const handleCardClick = (link: string) => {
    if (link === "") {
      return;
    }
    window.open(link);
  };

  const handleCardDelete = async (id: number) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this article? This action cannot be undone.");

    if (!isConfirmed) {
      return; // Exit the function if the user cancels the action
    }

    try {
      setArticles((prevArticles) => prevArticles.filter(article => article.id !== id));
      const response = await axios.delete(apiUrl + 'articles/' + id.toString(), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        }
      });
      console.log(response.data);
    } catch (err) {
      setError('Failed to Delete Article');
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(apiUrl + 'articles');
        console.log(response.data)
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

  const years = [...new Set(filtered_articles.map(article => article.year))]

  const filtered_journals = articles.filter(article => article.isJournal);

  return (
    <motion.main
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <main className="px-4 py-6 md:px-8">
        <div className="flex flex-col w-full space-y-4 bg-fuchsia-300">
          <Year year={234234} articles={articles}/>
        </div>
      </main>
    </motion.main>
  );
};

export default ArticlesPage;
