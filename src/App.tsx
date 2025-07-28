import React from 'react';
import { BrowserRouter as _Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import HomePage from './pages/HomePage';
// import ArticlesPage from './pages/ArticlesPage';
import ArticlesPage2 from './pages/ArticlesPage2';
import AckPage from './pages/AckPage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import JournalPage from './pages/JournalPage';
import './input.css'

const pageTransition: Variants = {
  initial: { opacity: 0, x: -10, transition: { duration: 0.3, ease: 'easeInOut' } },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  exit: { opacity: 0, x: 10, transition: { duration: 0.3, ease: 'easeInOut' } },
  style: { overflowX: 'hidden' },
};

const base_url = import.meta.env.VITE_BASE_URL;

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className="">
      <Navbar />
      <main className="">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path={`${import.meta.env.BASE_URL}`}
              element={
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageTransition}
                >
                  <HomePage />
                </motion.div>
              }
            />
            <Route
              path={`${base_url}articles`}
              element={<ArticlesPage2 />}
            />
            <Route
              path={`${base_url}acknowledgements`}
              element={
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageTransition}
                >
                  <AckPage />
                </motion.div>
              }
            />
            <Route
              path={`${base_url}journal`}
              element={
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageTransition}
                >
                  <JournalPage />
                </motion.div>
              }
            />
            <Route
              path={`${base_url}login`}
              element={<LoginPage />}
            />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
