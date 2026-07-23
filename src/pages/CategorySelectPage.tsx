import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES, type Category } from "../types/question";
import { ALL_QUESTIONS, getQuestionsByCategory } from "../data";
import { shuffle } from "../lib/shuffle";
import { Button } from "../components/common/Button";

const COUNT_OPTIONS = [5, 10, 20];

export function CategorySelectPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | "all">("all");
  const [count, setCount] = useState(10);

  const pool = category === "all" ? ALL_QUESTIONS : getQuestionsByCategory(category);
  const maxCount = pool.length;

  const startQuiz = () => {
    const selected = shuffle(pool).slice(0, Math.min(count, maxCount));
    const questionIds = selected.map((q) => q.id);
    navigate("/quiz/play", {
      state: { questionIds, label: category === "all" ? "全分野" : category },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="mb-1 text-xl font-bold text-slate-900">問題演習</h1>
        <p className="text-sm text-slate-600">分野と出題数を選んで演習を開始しましょう。</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold text-slate-700">分野を選択</h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`rounded-full border px-4 py-1.5 text-sm ${
              category === "all"
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-300 text-slate-700 hover:bg-slate-50"
            }`}
          >
            全分野（{ALL_QUESTIONS.length}問）
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-1.5 text-sm ${
                category === c
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {c}（{getQuestionsByCategory(c).length}問）
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold text-slate-700">出題数</h2>
        <div className="flex flex-wrap gap-2">
          {COUNT_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setCount(opt)}
              className={`rounded-full border px-4 py-1.5 text-sm ${
                count === opt
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {opt}問
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCount(maxCount)}
            className={`rounded-full border px-4 py-1.5 text-sm ${
              count === maxCount
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-300 text-slate-700 hover:bg-slate-50"
            }`}
          >
            すべて（{maxCount}問）
          </button>
        </div>
      </div>

      <Button onClick={startQuiz} disabled={maxCount === 0} className="self-start">
        演習を開始する
      </Button>
    </div>
  );
}
