// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticlesPage from './pages/ArticlesPage';
import AckPage from './pages/AckPage';
import Navbar from './components/Navbar'
import Transition from './components/Transition'
import { MathJaxContext } from 'better-react-mathjax';

// framer motion\

const mathJaxConfig = {
  loader: { load: ['input/tex', 'output/svg'] }
};

const App = () => {
  return (
    <MathJaxContext config={mathJaxConfig}>
      <div className="">
        <Navbar />
        <main className="">
          <Routes>
            <Route path="/" element={<Transition children={<HomePage />} enter='fade-in' exit='fade-out' />} />
            <Route path="/articles" element={<Transition children={<ArticlesPage />} enter='fade-in' exit='fade-out' />} />
            <Route path="/acknowledgements" element={<Transition children={<AckPage />} enter='fade-in' exit='fade-out' />} />
          </Routes>
        </main>
      </div>
    </MathJaxContext>
  );
}

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded shadow-md">
//         <h1 className="text-2xl font-bold mb-4">Hello, Tailwind CSS!</h1>
//         <p className="text-gray-700">This is a simple example of using Tailwind CSS with React.</p>
//       </div>
//     </div>
//   );
// }


export default App;
