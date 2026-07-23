import { createContext, useContext, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { PROGRESS_KEY } from "../lib/storage";
import { EMPTY_PROGRESS, type ProgressStore, type SessionRecord } from "../types/progress";

const MAX_SESSIONS = 50;

interface ProgressContextValue {
  progress: ProgressStore;
  recordAnswer: (questionId: string, correct: boolean) => void;
  recordSession: (session: Omit<SessionRecord, "id" | "date">) => void;
  toggleChecklistItem: (diagramId: string, itemId: string) => void;
  isChecklistItemChecked: (diagramId: string, itemId: string) => boolean;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useLocalStorage<ProgressStore>(PROGRESS_KEY, EMPTY_PROGRESS);

  const recordAnswer = (questionId: string, correct: boolean) => {
    setProgress((prev) => {
      const existing = prev.attempts[questionId];
      const nextAttempt = {
        questionId,
        timesAnswered: (existing?.timesAnswered ?? 0) + 1,
        timesCorrect: (existing?.timesCorrect ?? 0) + (correct ? 1 : 0),
        lastAnsweredAt: new Date().toISOString(),
        lastCorrect: correct,
      };
      return {
        ...prev,
        attempts: { ...prev.attempts, [questionId]: nextAttempt },
      };
    });
  };

  const recordSession = (session: Omit<SessionRecord, "id" | "date">) => {
    setProgress((prev) => {
      const record: SessionRecord = {
        ...session,
        id: `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        date: new Date().toISOString(),
      };
      const sessions = [record, ...prev.sessions].slice(0, MAX_SESSIONS);
      return { ...prev, sessions };
    });
  };

  const toggleChecklistItem = (diagramId: string, itemId: string) => {
    setProgress((prev) => {
      const current = prev.wiringChecklist[diagramId] ?? [];
      const next = current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId];
      return {
        ...prev,
        wiringChecklist: { ...prev.wiringChecklist, [diagramId]: next },
      };
    });
  };

  const isChecklistItemChecked = (diagramId: string, itemId: string) => {
    return (progress.wiringChecklist[diagramId] ?? []).includes(itemId);
  };

  const resetProgress = () => setProgress(EMPTY_PROGRESS);

  const value: ProgressContextValue = {
    progress,
    recordAnswer,
    recordSession,
    toggleChecklistItem,
    isChecklistItemChecked,
    resetProgress,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within a ProgressProvider");
  return ctx;
}
