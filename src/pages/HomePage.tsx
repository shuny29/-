import { Link } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";
import { ALL_QUESTIONS, ALL_WIRING_DIAGRAMS } from "../data";
import { getOverallStats, getMissedQuestions } from "../lib/stats";
import { getTotalXp, getLevelInfo, getBadges } from "../lib/gamification";
import { StatCard } from "../components/dashboard/StatCard";
import { ExamCountdownCard } from "../components/dashboard/ExamCountdownCard";
import { LevelCard } from "../components/dashboard/LevelCard";
import { BadgesCard } from "../components/dashboard/BadgesCard";
import { Button } from "../components/common/Button";

export function HomePage() {
  const { progress } = useProgress();
  const overall = getOverallStats(progress);
  const missedCount = getMissedQuestions(progress, ALL_QUESTIONS).length;
  const levelInfo = getLevelInfo(getTotalXp(progress, ALL_QUESTIONS));
  const badges = getBadges(progress, ALL_QUESTIONS);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="mb-1 text-xl font-bold text-slate-900">第二種電気工事士 試験対策</h1>
        <p className="text-sm text-slate-600">
          筆記試験の問題演習と、技能試験の複線図練習で合格を目指しましょう。
        </p>
      </div>

      <ExamCountdownCard />

      <LevelCard levelInfo={levelInfo} />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard label="総解答数" value={`${overall.totalAnswered}問`} />
        <StatCard label="全体正答率" value={`${Math.round(overall.accuracy * 100)}%`} />
        <StatCard label="要復習" value={`${missedCount}問`} />
      </div>

      <BadgesCard badges={badges} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          to="/quiz"
          className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-400 hover:shadow-sm"
        >
          <h2 className="mb-1 font-semibold text-slate-900">一問一答・過去問演習</h2>
          <p className="text-sm text-slate-600">
            {ALL_QUESTIONS.length}問のオリジナル問題を分野別に演習できます。
          </p>
        </Link>
        <Link
          to="/analytics"
          className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-400 hover:shadow-sm"
        >
          <h2 className="mb-1 font-semibold text-slate-900">苦手分野の分析</h2>
          <p className="text-sm text-slate-600">分野別正答率を確認し、苦手な問題を復習できます。</p>
        </Link>
        <Link
          to="/review"
          className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-400 hover:shadow-sm"
        >
          <h2 className="mb-1 font-semibold text-slate-900">復習ノート</h2>
          <p className="text-sm text-slate-600">間違えた問題を解説付きでいつでも見返せます。</p>
        </Link>
        <Link
          to="/wiring"
          className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-400 hover:shadow-sm"
        >
          <h2 className="mb-1 font-semibold text-slate-900">配線図・複線図の練習</h2>
          <p className="text-sm text-slate-600">
            {ALL_WIRING_DIAGRAMS.length}件の複線図練習で技能試験に備えます。
          </p>
        </Link>
      </div>

      <div className="flex justify-start">
        <Link to="/quiz">
          <Button>今すぐ演習を始める</Button>
        </Link>
      </div>
    </div>
  );
}
