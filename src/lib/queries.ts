import { prisma } from "./prisma";
import { LivingDocument, Session, SessionSummary } from "./types";

const emptyDocument: LivingDocument = {
  mainIdeas: [],
  workingHypotheses: [],
  openQuestions: [],
  decisions: [],
  recentDevelopments: [],
};

export async function getSessionSummaries(): Promise<SessionSummary[]> {
  return prisma.session.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, title: true },
  });
}

export async function getSessionDetail(
  sessionId: string
): Promise<Session | null> {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      thoughts: { orderBy: { sequenceNumber: "asc" } },
      document: true,
    },
  });

  if (!session) return null;

  let document: LivingDocument = emptyDocument;
  if (session.document) {
    try {
      document = JSON.parse(session.document.currentContent) as LivingDocument;
    } catch {
      document = emptyDocument;
    }
  }

  return {
    id: session.id,
    title: session.title,
    createdAt: session.createdAt.toISOString(),
    rawThoughts: session.thoughts.map((t) => ({
      id: t.id,
      content: t.rawText,
      createdAt: t.createdAt.toISOString(),
    })),
    document,
  };
}
