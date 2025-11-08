import { Settings, Bell } from "lucide-react";

export default function Controls({ setDurations, openSettings, notify }) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={openSettings}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
        >
          <Settings className="w-4 h-4" />
          Settings
        </button>
        <button
          onClick={notify}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow"
        >
          <Bell className="w-4 h-4" />
          Test Alert
        </button>
      </div>
    </div>
  );
}
