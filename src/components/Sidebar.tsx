"use client";

import { Session } from "@/lib/types";

interface SidebarProps {
  sessions: Session[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onCreateSession: () => void;
}

export default function Sidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onCreateSession,
}: SidebarProps) {
  return (
    <aside className="flex h-64 w-full flex-col border-b border-slate-200 bg-slate-50 lg:h-full lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Sessions
        </h2>
      </div>

      <button
        onClick={onCreateSession}
        className="mx-4 mb-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
      >
        + New session
      </button>

      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        {sessions.length === 0 && (
          <p className="px-2 text-sm text-slate-400">No sessions yet.</p>
        )}
        <ul className="space-y-1">
          {sessions.map((session) => (
            <li key={session.id}>
              <button
                onClick={() => onSelectSession(session.id)}
                className={`w-full truncate rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  session.id === activeSessionId
                    ? "bg-indigo-100 font-medium text-indigo-900"
                    : "text-slate-700 hover:bg-slate-200"
                }`}
              >
                {session.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
