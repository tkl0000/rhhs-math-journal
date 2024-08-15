import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import HomePage from './pages/HomePage';
import ArticlesPage from './pages/ArticlesPage';
import AckPage from './pages/AckPage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';

const pageTransition: Variants = {
  initial: { opacity: 0, x: -10, transition: { duration: 0.3, ease: 'easeInOut' } },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  exit: { opacity: 0, x: 10, transition: { duration: 0.3, ease: 'easeInOut' } },
  style: { overflowX: 'hidden' }
};

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className="">
      <Navbar />
      <main className="">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
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
              path="/articles"
              element={
                <ArticlesPage />
              }
            />
            <Route
              path="/acknowledgements"
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
              path="/login"
              element={
                <LoginPage />
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
