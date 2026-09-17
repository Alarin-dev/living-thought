export interface RawThought {
  id: string;
  content: string;
  createdAt: string; // ISO timestamp
}

export interface LivingDocument {
  mainIdeas: string[];
  workingHypotheses: string[];
  openQuestions: string[];
  decisions: string[];
  recentDevelopments: string[];
}

export interface SessionSummary {
  id: string;
  title: string;
}

export interface Session {
  id: string;
  title: string;
  createdAt: string;
  rawThoughts: RawThought[];
  document: LivingDocument;
}
