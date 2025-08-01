import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Filter from '../components/Filter.tsx';
import JournalCard from '../components/JournalCard.tsx';
import ArticleCard from '../components/ArticleCard.tsx';
import { Article } from '../types/Article.tsx'
import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_API_URL;
// const api_query = apiUrl + 'pdf/';

const ArticlesPage2 = () => {
  const token = localStorage.getItem('token');
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
    (article.name.toLowerCase().includes(curFilter.toLowerCase()) ||
      article.author.toLowerCase().includes(curFilter.toLowerCase()) ||
      article.year.toString().includes(curFilter)) &&
    (yearFilter === "" || article.year.toString() === yearFilter)
  );

  // const filtered_journals = articles.filter(article => article.isJournal);

  const years = [...new Set(articles.map(article => article.year))].sort((a, b) => b - a)

  return (
    <motion.main
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <main className="px-4 py-6 md:px-8">
        <div className="flex flex-col w-full space-y-4">
          {/* <div className="flex justify-center mb-4 w-full mx-auto">
            <Filter setFilter={setFilter} />
          </div> */}

          {/* Journals Row */}
          <div className="mx-0 lg:mx-20 flex flex-row justify-between">
            <div className="flex-1 flex flex-row items-center overflow-x-scroll mr-12 lg:mr-12">
              <AnimatePresence>
                {years.map(year => (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 1, 0.5, 1], // Cubic-bezier for smooth deceleration
                    }}
                  >
                    <JournalCard
                      year={year}
                      setYearFilter={setYearFilter}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="flex-1 flex flex-row items-center">
              <Filter setFilter={setFilter} />
            </div>
          </div>

          {/* Articles Section */}
          <div className="flex justify-center flex-wrap text-slate-200 mt-4">
            <AnimatePresence>
              {filtered_articles.map(article => (
                <motion.div
                key={article.id}
                layout // ✨ enables automatic reflow animations
                initial={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 1, 0.5, 1], // Cubic-bezier for smooth deceleration
                }}
              >
                  <ArticleCard
                    title={
                      article.name
                    }
                    content={article.author}
                    year={article.year}
                    id={article.id}
                    authenticated={authenticated}
                    onClick={() => handleCardClick(article.link)}
                    onDelete={() => handleCardDelete(article.id)}
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

export default ArticlesPage2;
