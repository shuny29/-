import { describe, expect, it } from "vitest";
import { getBadges, getLevelInfo, getTotalXp, xpForDifficulty } from "../src/lib/gamification";
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
    difficulty: 3,
    question: "Q2",
    choices: ["a", "b", "c", "d"],
    correctIndex: 1,
    explanation: "exp2",
  },
];

function progressWith(attempts: ProgressStore["attempts"], overrides: Partial<ProgressStore> = {}): ProgressStore {
  return { ...EMPTY_PROGRESS, attempts, ...overrides };
}

describe("xpForDifficulty", () => {
  it("難易度に応じたXPを返す", () => {
    expect(xpForDifficulty(1)).toBe(10);
    expect(xpForDifficulty(2)).toBe(20);
    expect(xpForDifficulty(3)).toBe(30);
  });
});

describe("getTotalXp", () => {
  it("正解回数と難易度からXPを合計する", () => {
    const progress = progressWith({
      q1: { questionId: "q1", timesAnswered: 2, timesCorrect: 2, lastAnsweredAt: "2026-01-01", lastCorrect: true },
      q2: { questionId: "q2", timesAnswered: 1, timesCorrect: 1, lastAnsweredAt: "2026-01-01", lastCorrect: true },
    });
    // q1: difficulty1 x 2回正解 = 20XP, q2: difficulty3 x 1回正解 = 30XP
    expect(getTotalXp(progress, questions)).toBe(50);
  });

  it("解答履歴が無ければ0を返す", () => {
    expect(getTotalXp(EMPTY_PROGRESS, questions)).toBe(0);
  });
});

describe("getLevelInfo", () => {
  it("0XPはレベル1", () => {
    const info = getLevelInfo(0);
    expect(info.level).toBe(1);
    expect(info.xpForNextLevel).toBe(100);
    expect(info.xpIntoLevel).toBe(0);
  });

  it("レベルアップの閾値を正しく跨ぐ", () => {
    // レベル1->2に必要な100XPちょうど
    const info = getLevelInfo(100);
    expect(info.level).toBe(2);
    expect(info.xpIntoLevel).toBe(0);
    expect(info.xpForNextLevel).toBe(200);
  });

  it("複数レベル分のXPを正しく計算する", () => {
    // Lv1->2:100, Lv2->3:200 必要。350XPならLv3の途中(350-100-200=50)
    const info = getLevelInfo(350);
    expect(info.level).toBe(3);
    expect(info.xpIntoLevel).toBe(50);
  });
});

describe("getBadges", () => {
  it("正解履歴が無ければ「はじめの一歩」は未獲得", () => {
    const badges = getBadges(EMPTY_PROGRESS, questions);
    const firstCorrect = badges.find((b) => b.id === "first-correct");
    expect(firstCorrect?.earned).toBe(false);
  });

  it("1問正解すると「はじめの一歩」が獲得済みになる", () => {
    const progress = progressWith({
      q1: { questionId: "q1", timesAnswered: 1, timesCorrect: 1, lastAnsweredAt: "2026-01-01", lastCorrect: true },
    });
    const badges = getBadges(progress, questions);
    expect(badges.find((b) => b.id === "first-correct")?.earned).toBe(true);
    expect(badges.find((b) => b.id === "master-theory")?.earned).toBe(false);
  });

  it("分野内の全問に一度でも正解するとマスターバッジが獲得済みになる", () => {
    const progress = progressWith({
      q1: { questionId: "q1", timesAnswered: 1, timesCorrect: 1, lastAnsweredAt: "2026-01-01", lastCorrect: true },
      q2: { questionId: "q2", timesAnswered: 1, timesCorrect: 1, lastAnsweredAt: "2026-01-01", lastCorrect: true },
    });
    const badges = getBadges(progress, questions);
    expect(badges.find((b) => b.id === "master-theory")?.earned).toBe(true);
    expect(badges.find((b) => b.id === "all-conquered")?.earned).toBe(true);
  });

  it("10問以上のセッションで全問正解するとパーフェクト演習バッジが獲得済みになる", () => {
    const progress = progressWith(
      {},
      { sessions: [{ id: "s1", date: "2026-01-01", category: "全分野", total: 10, correct: 10 }] },
    );
    const badges = getBadges(progress, questions);
    expect(badges.find((b) => b.id === "perfect-session")?.earned).toBe(true);
  });

  it("複線図のチェックリストにチェックがあれば技能試験バッジが獲得済みになる", () => {
    const progress = progressWith({}, { wiringChecklist: { "s-diagram-001": ["c1"] } });
    const badges = getBadges(progress, questions);
    expect(badges.find((b) => b.id === "skills-challenger")?.earned).toBe(true);
  });
});
