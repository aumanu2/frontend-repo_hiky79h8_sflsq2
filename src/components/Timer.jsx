import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FORMAT = (secs) => {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = Math.floor(secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

export default function Timer({
  durations = { work: 25 * 60, short: 5 * 60, long: 15 * 60 },
  mode,
  setMode,
  onCycleComplete,
}) {
  const [remaining, setRemaining] = useState(durations[mode]);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  // Reset when mode changes
  useEffect(() => {
    setRemaining(durations[mode]);
    setRunning(false);
    clearInterval(intervalRef.current);
  }, [mode, durations]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          onCycleComplete?.(mode);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, mode, onCycleComplete]);

  const progress = useMemo(() => {
    const total = durations[mode];
    return 1 - remaining / total;
  }, [remaining, durations, mode]);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-slate-800 p-8 shadow-xl">
        <div className="flex items-center justify-center gap-2 mb-6">
          {[
            { key: "work", label: "Focus" },
            { key: "short", label: "Short" },
            { key: "long", label: "Long" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setMode(t.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                mode === t.key
                  ? "bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white shadow"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="relative h-56 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-56 h-56 -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="45"
              className="fill-none stroke-slate-200 dark:stroke-slate-800"
              strokeWidth="10"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              className="fill-none stroke-rose-500"
              strokeWidth="10"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress }}
              transition={{ ease: "easeInOut" }}
            />
          </svg>

          <AnimatePresence mode="wait">
            <motion.div
              key={remaining}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute text-6xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              {FORMAT(remaining)}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => setRunning((r) => !r)}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white font-semibold shadow hover:shadow-lg active:scale-[.98]"
          >
            {running ? "Pause" : "Start"}
          </button>
          <button
            onClick={() => setRemaining(durations[mode])}
            className="px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
