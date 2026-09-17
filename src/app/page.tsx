import { getSessionDetail, getSessionSummaries } from "@/lib/queries";
import Sidebar from "@/components/Sidebar";
import ThoughtInput from "@/components/ThoughtInput";
import ThoughtStream from "@/components/ThoughtStream";
import LivingDocumentPanel from "@/components/LivingDocumentPanel";

interface HomeProps {
  searchParams: Promise<{ session?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { session: sessionIdParam } = await searchParams;

  const sessions = await getSessionSummaries();
  const activeSessionId = sessionIdParam ?? sessions[0]?.id ?? null;
  const activeSession = activeSessionId
    ? await getSessionDetail(activeSessionId)
    : null;

  return (
    <div className="flex h-screen w-screen flex-col lg:flex-row">
      <Sidebar sessions={sessions} activeSessionId={activeSessionId} />

      <main className="flex min-h-0 flex-1 flex-col">
        <header className="border-b border-slate-200 p-4">
          <h1 className="text-lg font-semibold text-slate-900">
            {activeSession ? activeSession.title : "No session selected"}
          </h1>
        </header>

        {activeSession ? (
          <>
            <ThoughtStream thoughts={activeSession.rawThoughts} />
            <ThoughtInput sessionId={activeSession.id} />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center p-4 text-sm text-slate-400">
            Create a session to get started.
          </div>
        )}
      </main>

      {activeSession && (
        <LivingDocumentPanel document={activeSession.document} />
      )}
    </div>
  );
}
