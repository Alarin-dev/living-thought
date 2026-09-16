"use client";

import { RawThought } from "@/lib/types";

interface ThoughtStreamProps {
  thoughts: RawThought[];
}

function formatTimestamp(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function ThoughtStream({ thoughts }: ThoughtStreamProps) {
  if (thoughts.length === 0) {
    return (
      <p className="flex-1 p-4 text-sm text-slate-400">
        No raw thoughts saved yet. Write your first one below.
      </p>
    );
  }

  return (
    <div className="flex-1 space-y-3 overflow-y-auto p-4">
      {thoughts.map((thought) => (
        <div
          key={thought.id}
          className="rounded-md border-l-4 border-amber-400 bg-amber-50 p-3 shadow-sm"
        >
          <p className="whitespace-pre-wrap font-mono text-sm text-slate-800">
            {thought.content}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            {formatTimestamp(thought.createdAt)}
          </p>
        </div>
      ))}
    </div>
  );
}
