import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface LivingDocument {
  mainIdeas: string[];
  workingHypotheses: string[];
  openQuestions: string[];
  decisions: string[];
  recentDevelopments: string[];
}

async function main() {
  const existing = await prisma.session.findFirst();
  if (existing) {
    console.log("Database already has data. Skipping seed.");
    return;
  }

  const session = await prisma.session.create({
    data: { title: "Untitled session" },
  });

  await prisma.thought.create({
    data: {
      sessionId: session.id,
      rawText: "This is where your raw, unedited thoughts will appear.",
      sequenceNumber: 1,
    },
  });

  const document: LivingDocument = {
    mainIdeas: [
      "This panel is a placeholder. It is not generated automatically yet.",
    ],
    workingHypotheses: [],
    openQuestions: [],
    decisions: [],
    recentDevelopments: [],
  };
  const content = JSON.stringify(document);

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

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
