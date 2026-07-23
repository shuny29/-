import { useLocation, useNavigate } from "react-router-dom";
import { getQuestionById } from "../data";
import { Button } from "../components/common/Button";
import { Badge } from "../components/common/Badge";

interface ResultLocationState {
  total: number;
  correct: number;
  missedIds: string[];
  label: string;
}

export function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultLocationState | null;

  if (!state) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
        <p className="mb-4 text-slate-600">結果データがありません。</p>
        <Button onClick={() => navigate("/quiz")}>分野選択に戻る</Button>
      </div>
    );
  }

  const { total, correct, missedIds, label } = state;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const missedQuestions = missedIds
    .map((id) => getQuestionById(id))
    .filter((q): q is NonNullable<typeof q> => q !== undefined);

  const retryMissed = () => {
    navigate("/quiz/play", { state: { questionIds: missedIds, label: `${label}（間違えた問題）` } });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
        <p className="mb-1 text-sm text-slate-500">{label}</p>
        <p className="mb-2 text-4xl font-bold text-slate-900">
          {correct} / {total}
        </p>
        <p className="text-lg font-semibold text-blue-600">正答率 {accuracy}%</p>
      </div>

      {missedQuestions.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold text-slate-700">間違えた問題</h2>
          <ul className="flex flex-col gap-3">
            {missedQuestions.map((q) => (
              <li key={q.id} className="rounded-lg border border-rose-200 bg-rose-50 p-3">
                <div className="mb-1 flex gap-2">
                  <Badge tone="danger">{q.category}</Badge>
                </div>
                <p className="text-sm text-slate-800">{q.question}</p>
                <p className="mt-1 text-sm text-slate-600">
                  正解：{q.choices[q.correctIndex]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {missedQuestions.length > 0 && (
          <Button variant="secondary" onClick={retryMissed}>
            間違えた問題だけ再演習
          </Button>
        )}
        <Button variant="outline" onClick={() => navigate("/quiz")}>
          分野選択に戻る
        </Button>
        <Button variant="outline" onClick={() => navigate("/")}>
          ホームへ
        </Button>
      </div>
    </div>
  );
}
