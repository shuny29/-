import type { Question, Category } from "../types/question";
import type { ProgressStore } from "../types/progress";

export interface CategoryStat {
  category: Category;
  total: number;
  answered: number;
  correct: number;
  accuracy: number; // 0-1, 未回答の場合は0
}

export function getCategoryStats(
  progress: ProgressStore,
  questions: Question[],
): CategoryStat[] {
  const categories = Array.from(new Set(questions.map((q) => q.category)));

  return categories.map((category) => {
    const categoryQuestions = questions.filter((q) => q.category === category);
    let answered = 0;
    let correct = 0;

    for (const q of categoryQuestions) {
      const attempt = progress.attempts[q.id];
      if (attempt && attempt.timesAnswered > 0) {
        answered += attempt.timesAnswered;
        correct += attempt.timesCorrect;
      }
    }

    return {
      category,
      total: categoryQuestions.length,
      answered,
      correct,
      accuracy: answered > 0 ? correct / answered : 0,
    };
  });
}

export interface OverallStat {
  totalAnswered: number;
  totalCorrect: number;
  accuracy: number;
}

export function getOverallStats(progress: ProgressStore): OverallStat {
  let totalAnswered = 0;
  let totalCorrect = 0;
  for (const attempt of Object.values(progress.attempts)) {
    totalAnswered += attempt.timesAnswered;
    totalCorrect += attempt.timesCorrect;
  }
  return {
    totalAnswered,
    totalCorrect,
    accuracy: totalAnswered > 0 ? totalCorrect / totalAnswered : 0,
  };
}

export function getMissedQuestions(
  progress: ProgressStore,
  questions: Question[],
): Question[] {
  const missed = questions.filter((q) => {
    const attempt = progress.attempts[q.id];
    return attempt && attempt.lastCorrect === false;
  });

  return missed.sort((a, b) => {
    const attemptA = progress.attempts[a.id];
    const attemptB = progress.attempts[b.id];
    const accuracyA = attemptA.timesAnswered > 0 ? attemptA.timesCorrect / attemptA.timesAnswered : 0;
    const accuracyB = attemptB.timesAnswered > 0 ? attemptB.timesCorrect / attemptB.timesAnswered : 0;
    if (accuracyA !== accuracyB) return accuracyA - accuracyB;
    return attemptB.lastAnsweredAt.localeCompare(attemptA.lastAnsweredAt);
  });
}
