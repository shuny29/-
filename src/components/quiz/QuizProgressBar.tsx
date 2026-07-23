import { ProgressBar } from "../common/ProgressBar";

export function QuizProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-4">
      <div className="mb-1 flex justify-between text-sm text-slate-500">
        <span>
          {current} / {total} 問
        </span>
      </div>
      <ProgressBar ratio={total > 0 ? (current - 1) / total : 0} />
    </div>
  );
}
