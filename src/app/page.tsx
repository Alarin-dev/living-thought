"use client";

import { useState } from "react";
import { Session } from "@/lib/types";
import { initialSessions } from "@/lib/mock-data";
import Sidebar from "@/components/Sidebar";
import ThoughtInput from "@/components/ThoughtInput";
import ThoughtStream from "@/components/ThoughtStream";
import LivingDocumentPanel from "@/components/LivingDocumentPanel";

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(
    initialSessions[0]?.id ?? null
  );

  const activeSession = sessions.find((s) => s.id === activeSessionId) ?? null;

  const handleCreateSession = () => {
    const newSession: Session = {
      id: crypto.randomUUID(),
      title: `Untitled session ${sessions.length + 1}`,
      createdAt: new Date().toISOString(),
      rawThoughts: [],
      document: {
        mainIdeas: [],
        workingHypotheses: [],
        openQuestions: [],
        decisions: [],
        recentDevelopments: [],
      },
    };
    setSessions((prev) => [...prev, newSession]);
    setActiveSessionId(newSession.id);
  };

  const handleAddThought = (content: string) => {
    if (!activeSessionId) return;
    setSessions((prev) =>
      prev.map((session) =>
        session.id === activeSessionId
          ? {
              ...session,
              rawThoughts: [
                ...session.rawThoughts,
                {
                  id: crypto.randomUUID(),
                  content,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : session
      )
    );
  };

  return (
    <div className="flex h-screen w-screen flex-col lg:flex-row">
      <Sidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={setActiveSessionId}
        onCreateSession={handleCreateSession}
      />

      <main className="flex min-h-0 flex-1 flex-col">
        <header className="border-b border-slate-200 p-4">
          <h1 className="text-lg font-semibold text-slate-900">
            {activeSession ? activeSession.title : "No session selected"}
          </h1>
        </header>

        {activeSession ? (
          <>
            <ThoughtStream thoughts={activeSession.rawThoughts} />
            <ThoughtInput onSubmit={handleAddThought} />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center p-4 text-sm text-slate-400">
            Create a session to get started.
          </div>
        )}
      </main>

      {activeSession && <LivingDocumentPanel document={activeSession.document} />}
    </div>
  );
}
