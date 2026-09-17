"use client";

import { useState, useTransition, type KeyboardEvent } from "react";
import { addThought } from "@/lib/actions";

interface ThoughtInputProps {
  sessionId: string;
}

export default function ThoughtInput({ sessionId }: ThoughtInputProps) {
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    startTransition(async () => {
      await addThought(sessionId, trimmed);
      setValue("");
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-slate-200 bg-white p-4">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isPending}
        placeholder="Type a raw thought... (Ctrl/Cmd + Enter to save)"
        rows={3}
        className="w-full resize-none rounded-md border border-slate-300 p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
      <div className="mt-2 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isPending || !value.trim()}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isPending ? "Saving..." : "Save thought"}
        </button>
      </div>
    </div>
  );
}
