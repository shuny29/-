import { ProgressBar } from "../common/ProgressBar";
import type { LevelInfo } from "../../types/gamification";

export function LevelCard({ levelInfo }: { levelInfo: LevelInfo }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-amber-700">Lv.{levelInfo.level}</span>
          <span className="text-sm text-amber-800">合計 {levelInfo.xp} XP</span>
        </div>
        <span className="text-xs text-amber-700">
          次のレベルまで {levelInfo.xpForNextLevel - levelInfo.xpIntoLevel} XP
        </span>
      </div>
      <ProgressBar ratio={levelInfo.progress} />
    </div>
  );
}
