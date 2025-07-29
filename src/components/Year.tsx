import { AnimatePresence, easeOut, motion } from "framer-motion";
import { useState } from "react";
import {Article} from "../types/Article"

interface YearProps {
    year: number,
    articles: Array<Article>,
}

const Year: React.FC<YearProps> = ({ year, articles}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-left">
        <button
          onClick={() => setOpen(prev => !prev)}
          className="px-4 py-2  text-slate-300 hover:text-slate-50 transition-all cursor-pointer text-5xl font-bold rounded-md"
        >
          {year}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0, translateX: -20 }}
            animate={{ height: "auto", opacity: 1, translateX: 0 }}
            exit={{ height: 0, opacity: 0, translateX: -20 }}
            // transition={{ type: "spring", stiffness: 300, damping: 30 }}
            transition={{duration: 0.5, ease: easeOut }}
            className="overflow-hidden rounded-md"
          >
            <div className="p-4 space-y-2 font-bold  ml-10 text-slate-300 hover:text-slate-50 transition-all cursor-pointer">
                {articles.map(article =>
                    <a href={article.link} target="_blank">
                        {article.name + " (" + article.author + ")"}
                    </a>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Year