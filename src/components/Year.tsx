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
    <div className="relative w-48 bg-fuchsia-400">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="w-full px-4 py-2 bg-blue-600 text-white text-5xl rounded-md"
      >
        {year}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0, translateX: -10 }}
            animate={{ height: "auto", opacity: 1, translateX: 0 }}
            exit={{ height: 0, opacity: 0 }}
            // transition={{ type: "spring", stiffness: 300, damping: 30 }}
            transition={{duration: 0.5, ease: easeOut }}
            className="overflow-hidden text-white rounded-md mt-2"
          >
            <div className="p-4 space-y-2">
                {articles.map(article =>
                    <p>
                        {article.name}
                    </p>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Year