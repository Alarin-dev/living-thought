"use client";

import { LivingDocument } from "@/lib/types";

interface LivingDocumentPanelProps {
  document: LivingDocument;
}

interface SectionConfig {
  key: keyof LivingDocument;
  title: string;
}

const sections: SectionConfig[] = [
  { key: "mainIdeas", title: "Main ideas" },
  { key: "workingHypotheses", title: "Working hypotheses" },
  { key: "openQuestions", title: "Open questions" },
  { key: "decisions", title: "Decisions" },
  { key: "recentDevelopments", title: "Recent developments" },
];

export default function LivingDocumentPanel({ document }: LivingDocumentPanelProps) {
  return (
    <aside className="flex h-64 w-full flex-col border-t border-slate-200 bg-white lg:h-full lg:w-96 lg:border-t-0 lg:border-l">
      <div className="border-b border-slate-200 p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Living document
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Placeholder content. Not generated automatically yet.
        </p>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-4">
        {sections.map((section) => {
          const items = document[section.key];
          return (
            <section key={section.key}>
              <h3 className="mb-2 text-sm font-semibold text-slate-700">
                {section.title}
              </h3>
              {items.length === 0 ? (
                <p className="text-sm italic text-slate-400">Nothing here yet.</p>
              ) : (
                <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </aside>
  );
}
