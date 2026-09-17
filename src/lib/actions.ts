"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { LivingDocument } from "./types";

const emptyDocument: LivingDocument = {
  mainIdeas: [],
  workingHypotheses: [],
  openQuestions: [],
  decisions: [],
  recentDevelopments: [],
};

export async function createSession() {
  const session = await prisma.session.create({
    data: { title: "Untitled session" },
  });

  const content = JSON.stringify(emptyDocument);

  await prisma.document.create({
    data: {
      sessionId: session.id,
      currentContent: content,
      versionNumber: 1,
    },
  });

  await prisma.documentVersion.create({
    data: {
      sessionId: session.id,
      versionNumber: 1,
      content,
      reason: "Initial empty document",
    },
  });

  redirect(`/?session=${session.id}`);
}

export async function addThought(sessionId: string, content: string) {
  const trimmed = content.trim();
  if (!trimmed) return;

  const lastThought = await prisma.thought.findFirst({
    where: { sessionId },
    orderBy: { sequenceNumber: "desc" },
    select: { sequenceNumber: true },
  });

  const nextSequence = (lastThought?.sequenceNumber ?? 0) + 1;

  await prisma.thought.create({
    data: {
      sessionId,
      rawText: trimmed,
      sequenceNumber: nextSequence,
    },
  });

  await prisma.session.update({
    where: { id: sessionId },
    data: { updatedAt: new Date() },
  });

  revalidatePath("/");
}
