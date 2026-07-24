import { Link } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";
import { ALL_QUESTIONS } from "../data";
import { getCategoryStats, getMissedQuestions, getOverallStats } from "../lib/stats";
import { StatCard } from "../components/dashboard/StatCard";
import { CategoryAccuracyChart } from "../components/dashboard/CategoryAccuracyChart";
import { Button } from "../components/common/Button";

export function AnalyticsPage() {
  const { progress } = useProgress();

  const overall = getOverallStats(progress);
  const categoryStats = getCategoryStats(progress, ALL_QUESTIONS);
  const missedQuestions = getMissedQuestions(progress, ALL_QUESTIONS);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="mb-1 text-xl font-bold text-slate-900">苦手分野の分析</h1>
        <p className="text-sm text-slate-600">解答履歴から分野別の正答率と苦手な問題を確認できます。</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard label="総解答数" value={`${overall.totalAnswered}問`} />
        <StatCard label="正答数" value={`${overall.totalCorrect}問`} />
        <StatCard label="全体正答率" value={`${Math.round(overall.accuracy * 100)}%`} />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-slate-700">分野別正答率</h2>
        <CategoryAccuracyChart stats={categoryStats} />
      </div>

      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5">
        <div>
          <h2 className="text-sm font-semibold text-slate-700">
            復習が必要な問題（{missedQuestions.length}問）
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            間違えた問題は解説つきの「復習ノート」でいつでも見返せます。
          </p>
        </div>
        <Link to="/review">
          <Button>復習ノートを開く</Button>
        </Link>
      </div>
    </div>
  );
}
