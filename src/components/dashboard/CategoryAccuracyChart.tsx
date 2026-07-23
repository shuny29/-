import type { CategoryStat } from "../../lib/stats";
import { ProgressBar } from "../common/ProgressBar";

export function CategoryAccuracyChart({ stats }: { stats: CategoryStat[] }) {
  return (
    <div className="flex flex-col gap-4">
      {stats.map((stat) => (
        <div key={stat.category}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">{stat.category}</span>
            <span className="text-slate-500">
              {stat.answered > 0 ? `${Math.round(stat.accuracy * 100)}%（${stat.correct}/${stat.answered}回答）` : "未回答"}
            </span>
          </div>
          <ProgressBar ratio={stat.accuracy} />
        </div>
      ))}
    </div>
  );
}
