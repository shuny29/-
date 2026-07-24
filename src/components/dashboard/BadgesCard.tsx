import type { Badge } from "../../types/gamification";

export function BadgesCard({ badges }: { badges: Badge[] }) {
  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-700">実績バッジ</h2>
        <span className="text-xs text-slate-500">
          {earnedCount} / {badges.length} 獲得
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-center ${
              badge.earned ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-slate-50 opacity-50"
            }`}
            title={badge.description}
          >
            <span className="text-2xl">{badge.icon}</span>
            <span className="text-xs font-medium text-slate-700">{badge.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
