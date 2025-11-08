import { useEffect, useState } from "react";
import Header from "./components/Header";
import Timer from "./components/Timer";
import TaskList from "./components/TaskList";
import Controls from "./components/Controls";
import { motion } from "framer-motion";

export default function App() {
  const [mode, setMode] = useState("work");
  const [streak, setStreak] = useState(0);
  const [durations, setDurations] = useState({
    work: 25 * 60,
    short: 5 * 60,
    long: 15 * 60,
  });

  useEffect(() => {
    if (!("Notification" in window)) return;
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const notify = (title = "Waktu selesai!", body = "Istirahat dulu, yuk.") => {
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    }
  };

  const onCycleComplete = (m) => {
    if (m === "work") setStreak((s) => s + 1);
    notify(
      m === "work" ? "Sesi fokus selesai" : "Waktu istirahat selesai",
      m === "work" ? "Ambil jeda sejenak." : "Saatnya kembali fokus."
    );
    setMode(m === "work" ? "short" : "work");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-fuchsia-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 text-slate-900 dark:text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[40rem] h-[40rem] bg-rose-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-[40rem] h-[40rem] bg-fuchsia-500/20 blur-3xl rounded-full" />
      </div>

      <Header mode={mode} streak={streak} />

      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-20 space-y-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Timer
            durations={durations}
            mode={mode}
            setMode={setMode}
            onCycleComplete={onCycleComplete}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
          <Controls setDurations={setDurations} openSettings={() => alert("Pengaturan sederhana untuk demo.")} notify={() => notify("Ini notifikasi", "Hanya tes aja")} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <TaskList />
        </motion.div>
      </main>

      <footer className="relative z-10 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        Dibuat untuk membantu fokus. Selamat produktif!
      </footer>
    </div>
  );
}
