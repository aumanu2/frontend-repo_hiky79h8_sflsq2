import { useState } from "react";
import { Plus, CheckCircle2, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    const title = input.trim();
    if (!title) return;
    setTasks((t) => [
      ...t,
      { id: Date.now(), title, done: false },
    ]);
    setInput("");
  };

  const toggle = (id) => {
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  };

  const remove = (id) => {
    setTasks((t) => t.filter((x) => x.id !== id));
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-slate-800 p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="Add a task to focus on"
              className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <button
            onClick={addTask}
            className="p-3 rounded-2xl bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white shadow hover:shadow-lg"
            aria-label="Add task"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <ul className="space-y-2">
          <AnimatePresence initial={false}>
            {tasks.map((task) => (
              <motion.li
                key={task.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="group flex items-center gap-3 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
              >
                <button
                  onClick={() => toggle(task.id)}
                  className={`transition ${
                    task.done ? "text-emerald-500" : "text-slate-400"
                  }`}
                  aria-label="Toggle task"
                >
                  <CheckCircle2 className="w-6 h-6" />
                </button>
                <span
                  className={`flex-1 text-slate-800 dark:text-slate-200 ${
                    task.done ? "line-through opacity-60" : ""
                  }`}
                >
                  {task.title}
                </span>
                <button
                  onClick={() => remove(task.id)}
                  className="opacity-0 group-hover:opacity-100 transition text-slate-400 hover:text-rose-500"
                  aria-label="Delete task"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
