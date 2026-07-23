export interface AttemptRecord {
  questionId: string;
  timesAnswered: number;
  timesCorrect: number;
  lastAnsweredAt: string;
  lastCorrect: boolean;
}

export interface SessionRecord {
  id: string;
  date: string;
  category: string;
  total: number;
  correct: number;
}

export interface ProgressStore {
  version: 1;
  attempts: Record<string, AttemptRecord>;
  wiringChecklist: Record<string, string[]>;
  sessions: SessionRecord[];
}

export const EMPTY_PROGRESS: ProgressStore = {
  version: 1,
  attempts: {},
  wiringChecklist: {},
  sessions: [],
};
