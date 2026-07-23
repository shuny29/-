import { describe, expect, it } from "vitest";
import { getCategoryStats, getMissedQuestions, getOverallStats } from "../src/lib/stats";
import type { Question } from "../src/types/question";
import { EMPTY_PROGRESS, type ProgressStore } from "../src/types/progress";

const questions: Question[] = [
  {
    id: "q1",
    examPart: "written",
    category: "電気理論",
    difficulty: 1,
    question: "Q1",
    choices: ["a", "b", "c", "d"],
    correctIndex: 0,
    explanation: "exp1",
  },
  {
    id: "q2",
    examPart: "written",
    category: "電気理論",
    difficulty: 1,
    question: "Q2",
    choices: ["a", "b", "c", "d"],
    correctIndex: 1,
    explanation: "exp2",
  },
  {
    id: "q3",
    examPart: "written",
    category: "法令",
    difficulty: 1,
    question: "Q3",
    choices: ["a", "b", "c", "d"],
    correctIndex: 2,
    explanation: "exp3",
  },
];

function buildProgress(): ProgressStore {
  return {
    ...EMPTY_PROGRESS,
    attempts: {
      q1: {
        questionId: "q1",
        timesAnswered: 2,
        timesCorrect: 1,
        lastAnsweredAt: "2026-01-01T00:00:00.000Z",
        lastCorrect: false,
      },
      q2: {
        questionId: "q2",
        timesAnswered: 1,
        timesCorrect: 1,
        lastAnsweredAt: "2026-01-02T00:00:00.000Z",
        lastCorrect: true,
      },
    },
  };
}

describe("getOverallStats", () => {
  it("集計対象が無い場合は正答率0を返す", () => {
    const result = getOverallStats(EMPTY_PROGRESS);
    expect(result).toEqual({ totalAnswered: 0, totalCorrect: 0, accuracy: 0 });
  });

  it("解答履歴から正しく総解答数・正答率を集計する", () => {
    const result = getOverallStats(buildProgress());
    expect(result.totalAnswered).toBe(3);
    expect(result.totalCorrect).toBe(2);
    expect(result.accuracy).toBeCloseTo(2 / 3);
  });
});

describe("getCategoryStats", () => {
  it("分野ごとの正答率と未回答分野を正しく算出する", () => {
    const result = getCategoryStats(buildProgress(), questions);
    const theory = result.find((r) => r.category === "電気理論");
    const law = result.find((r) => r.category === "法令");

    expect(theory).toBeDefined();
    expect(theory?.total).toBe(2);
    expect(theory?.answered).toBe(3);
    expect(theory?.correct).toBe(2);
    expect(theory?.accuracy).toBeCloseTo(2 / 3);

    expect(law).toBeDefined();
    expect(law?.answered).toBe(0);
    expect(law?.accuracy).toBe(0);
  });
});

describe("getMissedQuestions", () => {
  it("直近の解答が不正解だった問題のみを正答率の低い順に返す", () => {
    const result = getMissedQuestions(buildProgress(), questions);
    expect(result.map((q) => q.id)).toEqual(["q1"]);
  });

  it("解答履歴が無い問題は復習キューに含めない", () => {
    const result = getMissedQuestions(EMPTY_PROGRESS, questions);
    expect(result).toEqual([]);
  });
});
