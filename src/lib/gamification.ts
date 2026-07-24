import type { Category, Question } from "../types/question";
import type { ProgressStore } from "../types/progress";
import type { Badge, LevelInfo } from "../types/gamification";

export function xpForDifficulty(difficulty: 1 | 2 | 3): number {
  return difficulty * 10;
}

export function getTotalXp(progress: ProgressStore, questions: Question[]): number {
  let xp = 0;
  for (const q of questions) {
    const attempt = progress.attempts[q.id];
    if (attempt) {
      xp += attempt.timesCorrect * xpForDifficulty(q.difficulty);
    }
  }
  return xp;
}

export function getLevelInfo(xp: number): LevelInfo {
  let level = 1;
  let remaining = xp;
  let threshold = level * 100;

  while (remaining >= threshold) {
    remaining -= threshold;
    level += 1;
    threshold = level * 100;
  }

  return {
    level,
    xp,
    xpIntoLevel: remaining,
    xpForNextLevel: threshold,
    progress: remaining / threshold,
  };
}

const CATEGORY_BADGE_META: Record<Category, { id: string; label: string; icon: string }> = {
  電気理論: { id: "master-theory", label: "電気理論マスター", icon: "⚡" },
  配線図記号: { id: "master-symbol", label: "配線図記号マスター", icon: "🔌" },
  施工方法: { id: "master-construction", label: "施工方法マスター", icon: "🛠️" },
  法令: { id: "master-law", label: "法令マスター", icon: "📜" },
  "器具・材料": { id: "master-tools", label: "器具・材料マスター", icon: "🧰" },
};

function isCategoryMastered(progress: ProgressStore, categoryQuestions: Question[]): boolean {
  if (categoryQuestions.length === 0) return false;
  return categoryQuestions.every((q) => (progress.attempts[q.id]?.timesCorrect ?? 0) > 0);
}

export function getBadges(progress: ProgressStore, questions: Question[]): Badge[] {
  const categories = Array.from(new Set(questions.map((q) => q.category)));
  const categoryMastery = new Map<Category, boolean>();

  const badges: Badge[] = [];

  const totalCorrect = Object.values(progress.attempts).reduce((sum, a) => sum + a.timesCorrect, 0);

  badges.push({
    id: "first-correct",
    label: "はじめの一歩",
    icon: "🌱",
    description: "はじめて問題に正解する",
    earned: totalCorrect >= 1,
  });

  badges.push({
    id: "hundred-correct",
    label: "百戦錬磨",
    icon: "💯",
    description: "累計で100問正解する",
    earned: totalCorrect >= 100,
  });

  const hasPerfectSession = progress.sessions.some((s) => s.total >= 10 && s.correct === s.total);
  badges.push({
    id: "perfect-session",
    label: "パーフェクト演習",
    icon: "🏆",
    description: "10問以上の演習で全問正解する",
    earned: hasPerfectSession,
  });

  for (const category of categories) {
    const meta = CATEGORY_BADGE_META[category];
    const categoryQuestions = questions.filter((q) => q.category === category);
    const mastered = isCategoryMastered(progress, categoryQuestions);
    categoryMastery.set(category, mastered);
    badges.push({
      id: meta.id,
      label: meta.label,
      icon: meta.icon,
      description: `${category}の全${categoryQuestions.length}問を一度は正解する`,
      earned: mastered,
    });
  }

  const allMastered = categories.length > 0 && categories.every((c) => categoryMastery.get(c));
  badges.push({
    id: "all-conquered",
    label: "全分野制覇",
    icon: "🎯",
    description: "すべての分野をマスターする",
    earned: allMastered,
  });

  const hasWiringProgress = Object.values(progress.wiringChecklist).some((items) => items.length > 0);
  badges.push({
    id: "skills-challenger",
    label: "技能試験に挑戦",
    icon: "🔧",
    description: "複線図練習のチェックリストを1つ以上チェックする",
    earned: hasWiringProgress,
  });

  return badges;
}
