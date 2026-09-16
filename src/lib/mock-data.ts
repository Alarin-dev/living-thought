import { Session } from "./types";

export const initialSessions: Session[] = [
  {
    id: "session-1",
    title: "Untitled session",
    createdAt: "2026-01-01T09:00:00.000Z",
    rawThoughts: [
      {
        id: "thought-1",
        content: "This is where your raw, unedited thoughts will appear.",
        createdAt: "2026-01-01T09:00:00.000Z",
      },
    ],
    document: {
      mainIdeas: [
        "This panel is a placeholder. It is not generated automatically yet.",
      ],
      workingHypotheses: [],
      openQuestions: [],
      decisions: [],
      recentDevelopments: [],
    },
  },
];
