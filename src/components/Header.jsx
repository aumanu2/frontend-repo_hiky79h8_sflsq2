import { Clock, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function Header({ mode, streak }) {
  const pretty = {
    work: "Focus",
    short: "Short Break",
    long: "Long Break",
  }[mode];

  return (
    <header className="w-full py-6">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <div className="p-2 rounded-xl bg-gradient-to-br from-rose-500 to-fuchsia-600 text-white shadow-lg">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white">
              Podomoro
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Mode: {pretty}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-300"
        >
          <Target className="w-5 h-5" />
          <span className="text-sm">Streak: {streak}</span>
        </motion.div>
      </div>
    </header>
  );
}
